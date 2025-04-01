import React, { useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useLoaderData } from 'react-router-dom'
import MenuItem from './MenuItem.jsx'
import Box from './../Box.jsx'
import useMediaQuery from '../../hooks/useMediaQuery'
import * as V from '../../vars'

const Menu = () => {
  const [filter, setFilter] = useState('')
  const { categories, loading } = useLoaderData()
  const isSmall = useMediaQuery('only screen and (max-width: 767px)');
  const isMedium = useMediaQuery('only screen and (max-width: 991px)');

  const handleSearch = useCallback((e) => {
    setFilter(e.target.value.toLowerCase())
  }, [])

  const matches = useCallback((categories, filter) => {
    if (!categories || !categories.sub) return new Set()

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
  }, [])

  const menuContent = useMemo(() => {
    if (loading || !categories?.sub) {
      return (
        <div className="text-center">
          <i className="fa fa-spinner fa-spin fa-2x"></i>
        </div>
      )
    }

    const searchStyle = {
      marginBottom: isSmall ? '10px' : isMedium ? '15px' : '20px',
      width: '100%'
    }

    return (
      <>
        <div className="form-group" style={searchStyle}>
          <input
            className="form-control"
            onChange={handleSearch}
            placeholder="Søk i produkter"
            type="text"
            value={filter}
          />
        </div>
        <MenuItem
          active={null}
          filter={filter}
          isRoot={true}
          product={categories}
        />
      </>
    )
  }, [categories, filter, handleSearch, loading, isSmall, isMedium])

  return <Box>{menuContent}</Box>
}

Menu.propTypes = {}

export default Menu
