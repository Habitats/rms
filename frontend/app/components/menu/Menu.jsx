import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import MenuItem from './MenuItem.jsx'
import Box from './../Box.jsx'
import {TEXT, HOVER} from '../../colors'
import Radium from 'radium'
import * as V from '../../vars'

class Menu extends Component {

  constructor(props) {
    super(props)
    this.state = {transform: 0, menuHeight: 0, expanded: false, filter: ''}
    this.mounted = false
    this.handleSearch = (e) => this.setState({filter: e.target.value.toLowerCase()})
  }

  //componentDidMount() {
  //  this.footerHeight = document.getElementById('footer').clientHeight
  //  this.menuHeight = ReactDOM.findDOMNode(this).clientHeight
  //}
  //
  //componentWillMount() {
  //  window.addEventListener('scroll', this.handleScroll.bind(this))
  //  this.mounted = true
  //}
  //
  //componentWillUnmount() {
  //  this.mounted = false
  //  window.removeEventListener('scroll', this.handleScroll.bind(this))
  //}

  handleScroll(event) {
    if (!event || !this.mounted) {
      return
    }
    let scrollTop = event.srcElement.body.scrollTop
    let scrollHeight = event.srcElement.body.scrollHeight
    let scrollBottom = scrollHeight - scrollTop - window.innerHeight
    let margin = this.menuHeight - (this.footerHeight)
    let threshold = window.innerHeight - margin + scrollBottom - 131
    let transform = threshold <= margin ? threshold - margin : 0
    if (transform !== 0) {
      this.setState({transform: transform})
    }
  }

  render() {
    let {categories, active, linkTo} = this.props
    let {filter} = this.state
    let style = {
      menu: {
        transform: `translateY(${this.state.transform}px)`
      },
      menuContent: {marginRight: -V.MARGIN_SM, marginLeft: -V.MARGIN_SM + 5},
      input: {marginRight: -9, marginLeft: -9}
    }
    let cats = categories.sub
      //.filter(p => filter.length === 0 || p.title.toLowerCase().includes(filter))
      .map(c =>
        <MenuItem key={c.id} linkTo={`${linkTo}/${c.id}`} product={c} active={active} isRoot={true} style={style} filter={filter}/>
      )
    return (
      <div style={style.menu}>
        <Box className="rms-menu" shouldPad={false}>
          <div style={style.input}>
            <input className="form-control" onChange={this.handleSearch} placeholder="Søk" type="text"/>
          </div>
          <div style={style.menuContent}>
            {cats}
          </div>
        </Box>
      </div>
    )
  }
}

Menu.defaultProps = {
  active: ''
}

Menu.propTypes = {
  categories: PropTypes.object.isRequired,
  linkTo: PropTypes.string.isRequired,
  active: PropTypes.string
}

export default Radium(Menu)
