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
      common: this.longestCommonSubstring(props.product.title.toLowerCase(), props.filter.toLowerCase())
    }
    this.onExpand = () => {
      if (!props.isRoot) {
        this.setState({expanded: !this.state.expanded})
      }
    }
  }

  expandParent() {
    console.log(this.props.product.id + ' matching child')
    this.props.expandParent()
    this.setState({matchingChild: true})
  }

  shouldExpand(node, id, callback = (n) => n.id === id, root = node) {
    return root.sub.length === 0 ? false : callback(node) ||
                                           node.sub.map(n => this.shouldExpand(n, id, callback, root)).reduce((a, b) => a || b, false)
  }

  longestCommonSubstring(str1, str2) {
    if (!str1 || !str2) {
      return {
        length: 0,
        sequence: "",
        offset: 0
      }
    }

    var sequence = "",
      str1Length = str1.length,
      str2Length = str2.length,
      num = new Array(str1Length),
      maxlen = 0,
      lastSubsBegin = 0;

    for (var i = 0; i < str1Length; i++) {
      var subArray = new Array(str2Length);
      for (var j = 0; j < str2Length; j++) {
        subArray[j] = 0;
      }
      num[i] = subArray;
    }
    var thisSubsBegin = null;
    for (var i = 0; i < str1Length; i++) {
      for (var j = 0; j < str2Length; j++) {
        if (str1[i] !== str2[j]) {
          num[i][j] = 0;
        } else {
          if ((i === 0) || (j === 0)) {
            num[i][j] = 1;
          } else {
            num[i][j] = 1 + num[i - 1][j - 1]
          }

          if (num[i][j] > maxlen) {
            maxlen = num[i][j];
            thisSubsBegin = i - num[i][j] + 1;
            if (lastSubsBegin === thisSubsBegin) {//if the current LCS is the same as the last time this block ran
              sequence += str1[i];
            }
            else //this block resets the string builder if a different LCS is found
            {
              lastSubsBegin = thisSubsBegin;
              sequence = ""; //clear it
              sequence += str1.substr(lastSubsBegin, (i + 1) - lastSubsBegin);
            }
          }
        }
      }
    }
    return {
      length: maxlen,
      sequence: sequence,
      offset: thisSubsBegin
    };
  }

  componentWillReceiveProps(nextProps) {
    //if (nextProps.filter.length > 0 && nextProps.product.title.includes(nextProps.filter)) {
    //  nextProps.expandParent()
    //}
    let common = this.longestCommonSubstring(nextProps.product.title.toLowerCase(), nextProps.filter.toLowerCase())
    let matching = nextProps.filter.length > 0 && common.length === nextProps.filter.length
    this.setState({
      common: common,
      expanded: this.shouldExpand(nextProps.product, nextProps.active),
      matchingChild: matching
    })
    if (matching) {
      console.log(nextProps.product.id + ' ' + matching + ' ' + nextProps.filter)
      this.props.expandParent()
      this.setState({matchingChild: true})
    }
  }

  render() {
    let {product: {title, id, sub}, linkTo, active, isRoot, filter, expandParent} = this.props
    let isParent = sub.length > 0;
    let expanded = (isParent || isRoot) && (this.state.expanded || this.state.matchingChild)
    let {common} = this.state
    let a = id === active
    let expanderClass = (isParent && !isRoot) ? expanded ? 'fa fa-caret-down' : 'fa fa-caret-right' : 'fa fa-empty'
    let style = {
      box: {
        marginTop: isRoot ? 15 : 1,
        cursor: 'pointer',
        height: 'auto',
        marginLeft: isRoot ? 0 : isParent ? 21 : 25,
      },
      sub: {
        marginLeft: isRoot ? 0 : -8,
        paddingTop: 0,
        paddingBottom: expanded ? 5 : 3
      },
      item: {
        color: a ? HOVER : TEXT,
        fontSize: isRoot ? '1.5em' : '1em',
        fontWeight: a || expanded ? '800' : isRoot ? '600' : '400',
        fontFamily: 'Roboto',
        marginBottom: 0,
        ':hover': {
          color: HOVER,
          fontWeight: '800'
        }
      },
      icon: {
        color: a ? HOVER : TEXT,
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
      .map(p => <MenuItem key={p.id} product={p} active={active} linkTo={`${linkTo}/${p.id}`} filter={filter}
                          expandParent={() => {console.log('prop from ' + id); expandParent}}/>)
    let s = common.offset
    let l = common.length

    let matching = filter.length === l ? (
      <span>
        {s ? title.substring(0, s) : ''}
        <span style={style.marked}>{title.substring(s, s + l)}</span>
        {l < title.length ? title.substring(s + l, title.length) : ''}
      </span>) : title

    return (
      <div style={style.box}>
        <div onClick={(isParent && !isRoot)  ? this.onExpand : null}>
          {isParent ? <i key={id + '1'} style={style.icon} className={expanderClass}/> : null}
          <Link key={id+'2'} to={linkTo} style={style.item}>
            {matching}
          </Link>
        </div>
        {(isRoot || expanded) ? <div style={style.sub}>{subItems}</div> : null}
      </div>
    )
  }
}

MenuItem.defaultProps = {
  active: '',
  margin: 0,
  expandParent: () => {
  },
  isRoot: false,
  filter: '',
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
  expandParent: PropTypes.func,
  filter: PropTypes.string
}

export default Radium(MenuItem)
