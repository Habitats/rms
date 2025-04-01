import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import MenuItem from './MenuItem.jsx'
import Box from './../Box.jsx'
import Radium from 'radium'
import * as V from '../../vars'

const Menu = () => {
  const [state, setState] = useState({
    transform: 0,
    menuHeight: 0,
    expanded: false,
    filter: ''
  })

  const handleSearch = (e) => setState(prev => ({ ...prev, filter: e.target.value.toLowerCase() }))

  const matches = (categories, filter) => {
    const flat = (p) => p.sub.length === 0 ? [p] : [p].concat(p.sub.flatMap(s => flat(s)))
    const all = flat(categories)
    const matching = all.filter(p => p.title.toLowerCase().includes(filter.toLowerCase()))

    const pushParent = (matching) => {
      const newMatches = new Set()
      for (let m of matching) {
        const parent = all.find(c => c.id === m.category)
        if (parent) {
          newMatches.add(parent)
        }
      }
      matching = new Set(matching)
      const allMatches = new Set([...newMatches, ...matching])
      if (allMatches.size > matching.size) {
        return pushParent(allMatches)
      } else {
        return allMatches
      }
    }
    return new Set([...pushParent(matching)].map(c => c.id))
  }

  return (
    <Box>
      <div className="form-group">
        <input
          className="form-control"
          onChange={handleSearch}
          placeholder="Søk i produkter"
          type="text"
          value={state.filter}
        />
      </div>
      <MenuItem
        active={state.active}
        filter={state.filter}
        isRoot={true}
        matches={matches}
        product={state.products}
      />
    </Box>
  )
}

Menu.propTypes = {
  categories: PropTypes.object.isRequired,
  linkTo: PropTypes.string.isRequired,
  active: PropTypes.string
}

export default Radium(Menu)
