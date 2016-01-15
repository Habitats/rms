import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import MenuCategory from './MenuCategory.jsx'
import Box from './../Box.jsx'

export default class Menu extends Component {

  constructor(props) {
    super(props)
    this.state = {transform: 0, menuHeight: 0}
  }

  componentWillMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this))
  }

  componentDidMount(){
    this.setState({ menuHeight: ReactDOM.findDOMNode(this).clientHeight})
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this))
  }

  componentDidUpdate(){
  }

  handleScroll() {
    let scrollTop = event.srcElement.body.scrollTop
    let scrollHeight = event.srcElement.body.scrollHeight
    let scrollBottom = scrollHeight - scrollTop - window.innerHeight
    let margin = this.state.menuHeight - 178
    let threshold = window.innerHeight - margin + scrollBottom
    console.log(`${scrollBottom} ${window.innerHeight - margin} ${window.innerHeight - margin + scrollBottom}`)
    this.setState({
      transform: threshold <= margin ? threshold -margin : 0
    })
    //console.log(scrollBottom <= 62 ? scrollBottom : 0)
  }

  render() {
    let {categories, active, linkTo} = this.props
    let cats = categories.sub.map(c => <MenuCategory key={c.short} linkTo={`${linkTo}/${c.short}`} category={c} active={active}/>)
    let {transform} = this.state

    return (
      <div style={{marginTop: transform}}>
        <Box className="rms-menu">
          <div style={{marginLeft: -31, marginRight: -21}}>
            {cats}
          </div>
        </Box>
      </div>
    )
  }
}

Menu.propTypes = {
  categories: PropTypes.object.isRequired,
  linkTo: PropTypes.string.isRequired,
  active: PropTypes.shape({
    product: PropTypes.string,
    category: PropTypes.string.isRequired
  }).isRequired
}
