import React, {Component, PropTypes} from 'react'
import Link from './../Link.jsx'
import Radium from 'radium'
import {TEXT, HOVER, BACKGROUND_HOVER, BACKGROUND_LIGHT} from '../../colors'

class MenuItem extends Component {

  constructor(props) {
    super(props)
    this.state = {hover: false, expanded: this.shouldExpand(props.product, props.active)}
    this.onExpand = () => {
      if (!props.isRoot) {
        this.setState({expanded: !this.state.expanded});
      }
    }
  }

  shouldExpand(node, id, root = node) {
    return root.sub.length === 0 ? false : node.id === id || node.sub.map(n => this.shouldExpand(n, id, root)).reduce((a, b) => a
                                           || b, false)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.expanded) {
      this.setState({expanded: this.shouldExpand(nextProps.product, nextProps.active)})
    }
  }

  render() {
    let {product: {title, id, sub}, linkTo, active, isRoot} = this.props
    let {expanded} = this.state
    let a = id === active
    let isParent = sub.length > 0;
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
    }
    let subItems = sub.map(p => <MenuItem key={p.id} product={p} active={active} linkTo={`${linkTo}/${p.id}`}/>)
    return (
      <div style={style.box}>
        <div onClick={(isParent && !isRoot)  ? this.onExpand : null}>
          {isParent ? <i key={id + '1'} style={style.icon} className={expanderClass}/> : null}
          <Link key={id+'2'} to={linkTo} style={style.item}>
            {title}
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
  isRoot: false,
}

MenuItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }),
  active: PropTypes.string,
  linkTo: PropTypes.string.isRequired,
  margin: PropTypes.number
}

export default Radium(MenuItem)
