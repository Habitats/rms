import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import MenuCategory from './MenuCategory.jsx'
import Box from './../Box.jsx'

export default class Menu extends Component {

  constructor(props) {
    super(props)
    this.state = {transform: 0, menuHeight: 0}
    this.mounted = false
  }

  componentDidMount() {
    this.footerHeight = document.getElementById('footer').clientHeight
    this.menuHeight = ReactDOM.findDOMNode(this).clientHeight
  }

  componentWillMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this))
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
    window.removeEventListener('scroll', this.handleScroll.bind(this))
  }

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
    let cats = categories.sub.map(c => <MenuCategory key={c.id} linkTo={`${linkTo}/${c.id}`} category={c} active={active}/>)
    let style = {transform: `translateY(${this.state.transform}px)`}
    return (
      <div style={style}>
        <Box className="rms-menu">
          <div style={{marginLeft: -30, marginRight: -21}}>
            {cats}
          </div>
        </Box>
      </div>
    )
  }
}

Menu.defaultProps ={
  active: {product: '', category: ''}
}

Menu.propTypes = {
  categories: PropTypes.object.isRequired,
  linkTo: PropTypes.string.isRequired,
  active: PropTypes.shape({
    product: PropTypes.string,
    category: PropTypes.string,
  }).isRequired
}
