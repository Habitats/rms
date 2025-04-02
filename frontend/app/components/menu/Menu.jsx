import React, { useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useLoaderData } from 'react-router-dom'
import styled, { useTheme } from 'styled-components'
import MenuItem from './MenuItem.jsx'
import Box from './../Box.jsx'
import useMediaQuery from '../../hooks/useMediaQuery'
import * as V from '../../vars'

const LoadingContainer = styled.div`
  text-align: center;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.PRIMARY || '#007bff'};
  }
`

const SearchFormGroup = styled.div`
  margin-bottom: ${props => 
    props.isSmall 
      ? '10px' 
      : props.isMedium 
        ? '15px' 
        : '20px'
  };
  width: 100%;
`

const Menu = () => {
  const [filter, setFilter] = useState('')
  const { categories, loading } = useLoaderData()
  const theme = useTheme();
  const isSmall = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.xs})`);
  const isMedium = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.md})`);

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
        <LoadingContainer>
          <i className="fa fa-spinner fa-spin fa-2x"></i>
        </LoadingContainer>
      )
    }

    return (
      <>
        <SearchFormGroup isSmall={isSmall} isMedium={isMedium}>
          <SearchInput
            className="form-control"
            onChange={handleSearch}
            placeholder="Søk i produkter"
            type="text"
            value={filter}
          />
        </SearchFormGroup>
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
