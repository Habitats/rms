import React, {Component, PropTypes} from 'react'
import Link from './../Link.jsx'
import Radium from 'radium'
import {TEXT, HOVER, BACKGROUND_HOVER, BACKGROUND_LIGHT, FILTER} from '../../colors'

class MenuItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hover: false,
      expanded: this.shouldExpand(props.product, props.active),
      common: this.longestCommonSubstring(props.product.title.toLowerCase(), props.filter.toLowerCase()),
      //matchingChild: false,
    }
    this.didMatch = false
    this.onExpand = () => {
      if (!props.isRoot) {
        this.setState({expanded: !this.state.expanded})
      }
    }

    this.onChildMatch = (child, match) => {
      if (!this.state.matchingChild && match ) {
        this.didMatch = true
        //console.log(this.props.product.id + ' has matching child ' + child.id)
        this.setState({matchingChild: true})
      }
      else if (this.state.matchingChild && !this.didMatch && !match) {
        //this.didMatch = true
        this.didMatch = true
        //console.log(this.props.product.id + ' has unmatching child ' + child.id)
        this.setState({matchingChild: false})
      }
    }
  }

  shouldExpand(node, id, callback = (n) => n.id === id, root = node) {
    return root.sub.length === 0 ? false : callback(node) ||
                                           node.sub.map(n => this.shouldExpand(n, id, callback, root)).reduce((a, b) => a || b, false)
  }

  longestCommonSubstring(str1, str2) {
    if (!str1 || !str2) {
      return {
        length: 0,
        sequence: '',
        offset: 0
      }
    }

    let sequence = ''
    let str1Length = str1.length
    let str2Length = str2.length
    let num = new Array(str1Length)
    let maxlen = 0
    let lastSubsBegin = 0

    for (let i = 0; i < str1Length; i++) {
      let subArray = new Array(str2Length)
      for (let j = 0; j < str2Length; j++) {
        subArray[j] = 0
      }
      num[i] = subArray
    }
    let thisSubsBegin = null;
    for (let i = 0; i < str1Length; i++) {
      for (let j = 0; j < str2Length; j++) {
        if (str1[i] !== str2[j]) {
          num[i][j] = 0;
        } else {
          if ((i === 0) || (j === 0)) {
            num[i][j] = 1;
          } else {
            num[i][j] = 1 + num[i - 1][j - 1]
          }

          if (num[i][j] > maxlen) {
            maxlen = num[i][j]
            thisSubsBegin = i - num[i][j] + 1
            if (lastSubsBegin === thisSubsBegin) {
              //if the current LCS is the same as the last time this block ran
              sequence += str1[i]
            } else {
              //this block resets the string builder if a different LCS is found
              lastSubsBegin = thisSubsBegin;
              sequence = ''; //clear it
              sequence += str1.substr(lastSubsBegin, (i + 1) - lastSubsBegin)
            }
          }
        }
      }
    }
    return {
      length: maxlen,
      sequence: sequence,
      offset: thisSubsBegin
    }
  }

  componentWillReceiveProps(nextProps) {
    let {product, filter, active, onChildMatch} = nextProps
    if (filter.length === 0) {
      this.setState({
        expanded: this.shouldExpand(product, active),
        matchingChild: false
      })
    } else {
      let common = this.longestCommonSubstring(product.title.toLowerCase(), filter.toLowerCase())
      let matching = filter.length > 0 && common.length === filter.length
      this.setState({
        common: common,
        expanded: this.state.expanded ? true : this.shouldExpand(product, active),
      })
      if (matching || this.state.matchingChild) {
        //console.log(product.id + ' matching ' + filter + ', parent should expand')
        onChildMatch(product, true)
      } else if(!matching && !this.state.matchingChild) {
        //console.log(product.id + ' no longer matching ' + filter + ', parent should contract')
        onChildMatch(product, false)
      }
      this.didMatch = false
    }
  }

  render() {
    let {product: {title, id, sub}, linkTo, active, isRoot, filter, parentExpanded} = this.props
    if (parentExpanded) {
      //console.log(id + ' has parent expanded')
    }
    let isParent = sub.length > 0;
    let expanded = isRoot || (isParent && (this.state.expanded || this.state.matchingChild))
    let {common} = this.state
    let s = common.offset
    let l = common.length
    let matching = filter.length === l
    let isActive = id === active

    let expanderClass = (isParent && !isRoot) ? expanded ? 'fa fa-caret-down' : 'fa fa-caret-right' : 'fa fa-empty'

    let filterEnabled = filter.length > 0
    let showItem = filterEnabled ? (matching || this.state.matchingChild) : parentExpanded

    let style = {
      box: {
        marginTop: isRoot ? 15 : 1,
        cursor: 'pointer',
        height: 'auto',
        marginLeft: isRoot ? 0 : isParent ? 21 : 25,
        //opacity: showItem ? 1 :  0.5,
        display: showItem ? 'block' : 'none'
      },
      sub: {
        marginLeft: isRoot ? 0 : -8,
        paddingTop: 0,
        paddingBottom: expanded ? 5 : 3
      },
      item: {
        color: isActive ? HOVER : TEXT,
        fontSize: isRoot ? '1.5em' : '1em',
        fontWeight: isActive || expanded ? '800' : isRoot ? '600' : '400',
        fontFamily: 'Roboto',
        marginBottom: 0,
        ':hover': {
          color: HOVER,
          fontWeight: '800'
        }
      },
      icon: {
        color: isActive ? HOVER : TEXT,
        marginLeft: 0,
        marginRight: 0,
        textAlign: 'center',
        width: 14,
        verticalAlign: 'middle',
        cursor: 'pointer',
        lineHeight: 'inherit !important',
        ':hover': {
          color: HOVER
        },
      },
      marker: {
        fontSize: 7
      },
      marked: {
        backgroundColor: FILTER,
        borderRadius: 2,
      }
    }
    let subItems = sub
    //.filter(p => filter.length === 0 || p.title.toLowerCase().includes(filter))
      .map(p => <MenuItem key={p.id} product={p} active={active} linkTo={`${linkTo}/${p.id}`} parentExpanded={expanded} filter={filter}
                          onChildMatch={this.onChildMatch}/>)

    let matched = matching ? (
      <span>
        {s ? title.substring(0, s) : ''}
        <span style={style.marked}>{title.substring(s, s + l)}</span>
        {l < title.length ? title.substring(s + l, title.length) : ''}
      </span>) : title

    return (
      <div style={style.box}>
        <div onClick={this.onExpand}>
          {isParent ? <i key={id + '1'} style={style.icon} className={expanderClass}/> : null}
          <Link key={id+'2'} to={linkTo} style={style.item}>
            {matched}
          </Link>
        </div>
        <div style={style.sub}>{subItems}</div>
      </div>
    )
  }
}

MenuItem.defaultProps = {
  active: '',
  margin: 0,
  onChildMatch: () => {
    //console.log('root has not parent, no expansion')
  },
  isRoot: false,
  filter: '',
  parentExpanded: true,
  product: {title: '', id: null}
}

MenuItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }),
  active: PropTypes.string,
  linkTo: PropTypes.string.isRequired,
  margin: PropTypes.number,
  parentExpanded: PropTypes.bool,
  onChildMatch: PropTypes.func,
  filter: PropTypes.string
}

export default Radium(MenuItem)
