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

  matches(categories, filter) {
    let flat = (p) => p.sub.length === 0 ? [p] : [p].concat(p.sub.flatMap(s => flat(s)))
    let all = flat(categories)
    let matching = all.filter(p => p.title.toLowerCase().includes(filter.toLowerCase()))

    let pushParent = (matching) => {
      let newMatches = new Set()
      for (let m of matching) {
        let parent = all.find(c => c.id === m.category)
        if (parent) {
          newMatches.add(parent)
        }
      }
      matching = new Set(matching)
      let allMatches = new Set([... newMatches, ...matching])
      //allMatches.forEach(c => console.log(c.title))
      if (allMatches.size > matching.size) {
        return pushParent(allMatches)
      } else {
        return allMatches
      }
    }
    return new Set([... pushParent(matching)].map(c => c.id))
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
    let allMatches = this.matches(categories, filter)

    let cats = categories.sub.map(c =>
      <MenuItem key={c.id} linkTo={`${linkTo}/${c.id}`} matching={allMatches} product={c} active={active} isRoot={true} style={style}
                filter={filter}/>
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
