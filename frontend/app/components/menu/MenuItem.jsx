import React, {Component, PropTypes} from 'react'
import Link from './../Link.jsx'
import Radium from 'radium'
import {TEXT, HOVER, FILTER} from '../../colors'

class MenuItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hover: false,
      expanded: this.shouldExpand(props.product, props.active),
    }
    this.onExpand = () => {
      if (!props.isRoot) {
        this.setState({expanded: !this.state.expanded})
      }
    }
  }

  shouldExpand(node, id, callback = (n) => n.id === id, root = node) {
    return root.sub.length === 0 ? false : callback(node) ||
                                           node.sub.map(n => this.shouldExpand(n, id, callback, root)).reduce((a, b) => a || b, false)
  }

  componentWillReceiveProps(nextProps) {
    const {product, filter, active} = nextProps
    if (filter.length === 0) {
      this.setState({
        expanded: this.shouldExpand(product, active),
      })
    } else {
      this.setState({
        expanded: this.state.expanded ? true : this.shouldExpand(product, active),
      })
    }
  }

  substringIndex(seq, subseq) {
    const subseqLen = subseq.length
    let i = -1
    const indexes = []
    if (!subseqLen) {
      return indexes
    }

    // find the next occurance, in seq, of the first item in subseq:
    // i = index in seq, greater than i, of subseq's first item
    while ((i = seq.indexOf(subseq[0], i + 1)) >= 0) {

      // loop through subseq items starting with second:
      // Make sure that values equivalent to the ones following the first item in subseq,
      // appear in seq, following the found occurance, in sec, of subseq's first item.
      let c
      for (c = 1; c < subseqLen && seq[i + c] === subseq[c]; c++) {

      }

      // if they do, return the index, in seq, of the first item in subseq:
      if (c >= subseqLen) {
        indexes.push(i)
      }
    }
    return indexes
  }

  render() {
    const {product: {title, id, sub}, linkTo, active, isRoot, filter, parentExpanded, matching} = this.props
    const filterEnabled = filter.length > 0
    const isMatch = filterEnabled && matching.has(id)
    const isParent = sub.length > 0
    const expanded = isRoot || (isParent && (this.state.expanded || isMatch))
    const isActive = id === active

    const expanderClass = (isParent && !isRoot) ? expanded ? 'fa fa-caret-down' : 'fa fa-caret-right' : 'fa fa-empty'

    const showItem = filterEnabled ? isMatch : parentExpanded

    const style = {
      box: {
        marginTop: isRoot ? 15 : 1,
        cursor: 'pointer',
        height: 'auto',
        marginLeft: isRoot ? 0 : isParent ? 21 : 25,
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
    const subItems = sub
      .filter(c => filterEnabled ? matching.has(c.id) : true)
      .map(p => <MenuItem key={p.id} product={p} matching={matching} active={active} linkTo={`${linkTo}/${p.id}`} parentExpanded={expanded} filter={filter}
                          onChildMatch={this.onChildMatch}/>)

    const s = isMatch ? this.substringIndex(title.toLowerCase(), filter.toLowerCase())[0] : null
    const matched = isMatch && title.toLowerCase().includes(filter.toLowerCase()) ? (
      <span>
        {s ? title.substring(0, s) : ''}
        <span style={style.marked}>{title.substring(s, s + filter.length)}</span>
        {filter.length < title.length ? title.substring(s + filter.length, title.length) : ''}
      </span>) : title

    return (
      <div style={style.box}>
        <div onClick={this.onExpand}>
          {isParent ? <i key={id + '1'} style={style.icon} className={expanderClass}/> : null}
          <Link key={id + '2'} to={linkTo} style={style.item}>
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
  matching: PropTypes.object.isRequired,
  filter: PropTypes.string
}

export default Radium(MenuItem)
