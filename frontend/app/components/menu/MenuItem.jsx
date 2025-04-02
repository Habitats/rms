import React, { useState, useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import styled, { useTheme } from 'styled-components'
import Link from './../Link.jsx'
import useMediaQuery from '../../hooks/useMediaQuery'
import {TEXT, HOVER, FILTER} from '../../colors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons'

const MenuItemLink = styled(Link)`
  padding: ${props => 
    props.isSmall 
      ? '8px 15px' 
      : props.isMedium 
        ? '10px 20px' 
        : '12px 25px'
  };
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  cursor: pointer;
  color: ${props => props.active ? '#007bff' : 'inherit'};
  background-color: ${props => props.active ? 'rgba(0, 123, 255, 0.1)' : 'transparent'};
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background-color: rgba(0, 123, 255, 0.05);
  }
`

const SubItems = styled.div`
  padding-left: ${props => 
    props.isSmall 
      ? '15px' 
      : props.isMedium 
        ? '20px' 
        : '25px'
  };
  display: ${props => props.expanded ? 'block' : 'none'};
`

const FilterSpan = styled.span`
  font-weight: bold;
  background-color: rgba(0, 123, 255, 0.1);
  color: #007bff;
`

const MenuIcon = styled(FontAwesomeIcon)`
  width: 16px;
  margin-left: 10px;
  transition: transform 0.3s ease;
  transform: ${props => props.expanded ? 'rotate(0deg)' : 'rotate(0deg)'};
`

const MenuItem = ({ product, active, filter, isRoot }) => {
  const [hover, setHover] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const theme = useTheme();
  const isSmall = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.xs})`);
  const isMedium = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.md})`);

  const shouldExpand = useMemo(() => {
    const checkExpand = (node, id, callback = (n) => n.id === id, root = node) => {
      return root.sub.length === 0 ? false : callback(node) ||
        node.sub.map(n => checkExpand(n, id, callback, root)).reduce((a, b) => a || b, false)
    }
    return checkExpand(product, active)
  }, [product, active])

  useEffect(() => {
    if (filter.length === 0) {
      setExpanded(shouldExpand)
    } else {
      setExpanded(prev => prev ? true : shouldExpand)
    }
  }, [filter, shouldExpand])

  const onExpand = useCallback(() => {
    if (!isRoot) {
      setExpanded(prev => !prev)
    }
  }, [isRoot])

  const substringIndex = useCallback((seq, subseq) => {
    const subseqLen = subseq.length
    let i = -1
    const indexes = []
    if (!subseqLen) {
      return indexes
    }

    while ((i = seq.indexOf(subseq[0], i + 1)) >= 0) {
      let c
      for (c = 1; c < subseqLen && seq[i + c] === subseq[c]; c++) {
      }

      if (c >= subseqLen) {
        indexes.push(i)
      }
    }
    return indexes
  }, [])

  const { title, id, sub } = product
  const subItems = sub.map(p => (
    <MenuItem
      key={p.id}
      product={p}
      active={active}
      filter={filter}
      isRoot={false}
    />
  ))

  const titleElement = useMemo(() => {
    if (filter.length === 0) return title

    const filterLower = filter.toLowerCase()
    const titleLower = title.toLowerCase()
    const indexes = substringIndex(titleLower, filterLower)
    const parts = []
    let lastIndex = 0

    indexes.forEach(index => {
      if (index > lastIndex) {
        parts.push(<span key={`text-${lastIndex}`}>{title.slice(lastIndex, index)}</span>)
      }
      parts.push(
        <FilterSpan key={`filter-${index}`}>
          {title.slice(index, index + filter.length)}
        </FilterSpan>
      )
      lastIndex = index + filter.length
    })

    if (lastIndex < title.length) {
      parts.push(<span key={`text-${lastIndex}`}>{title.slice(lastIndex)}</span>)
    }

    return parts
  }, [filter, title, substringIndex])

  return (
    <div>
      <MenuItemLink 
        to={`/produkter/${id}`} 
        className="menu-item"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onExpand}
        isSmall={isSmall}
        isMedium={isMedium}
        active={active === id}
      >
        {titleElement}
        {sub.length > 0 && !isRoot && (
          <MenuIcon
            icon={expanded ? faChevronDown : faChevronRight}
            expanded={expanded}
          />
        )}
      </MenuItemLink>
      <SubItems expanded={expanded} isSmall={isSmall} isMedium={isMedium}>
        {subItems}
      </SubItems>
    </div>
  )
}

MenuItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    sub: PropTypes.array.isRequired
  }).isRequired,
  active: PropTypes.string,
  filter: PropTypes.string.isRequired,
  isRoot: PropTypes.bool.isRequired
}

MenuItem.defaultProps = {
  active: null
}

export default MenuItem
