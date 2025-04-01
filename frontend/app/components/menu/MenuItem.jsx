import React, { useState, useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import Link from './../Link.jsx'
import useMediaQuery from '../../hooks/useMediaQuery'
import {TEXT, HOVER, FILTER} from '../../colors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons'

const MenuItem = ({ product, active, filter, isRoot }) => {
  const [hover, setHover] = useState(false)
  const [expanded, setExpanded] = useState(false)

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

  const isSmall = useMediaQuery('only screen and (max-width: 767px)');
  const isMedium = useMediaQuery('only screen and (max-width: 991px)');

  const style = {
    padding: isSmall ? '8px 12px' : isMedium ? '10px 15px' : '12px 20px',
    display: 'block',
    color: active ? '#007bff' : 'inherit',
    backgroundColor: active ? 'rgba(0, 123, 255, 0.1)' : 'transparent',
    transition: 'all 0.2s ease-in-out',
    item: {
      padding: isSmall ? '8px 15px' : isMedium ? '10px 20px' : '12px 25px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      textDecoration: 'none',
      cursor: 'pointer'
    },
    subItems: {
      paddingLeft: isSmall ? 15 : isMedium ? 20 : 25,
      display: expanded ? 'block' : 'none'
    },
    subItem: {
      padding: isSmall ? '6px 12px' : isMedium ? '8px 16px' : '10px 20px',
      display: 'block',
      color: '#666',
      textDecoration: 'none',
      transition: 'background-color 0.3s ease'
    },
    icon: {
      width: 16,
      marginLeft: 10,
      transition: 'transform 0.3s ease'
    }
  }

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
        <span key={`filter-${index}`} style={style.filter}>
          {title.slice(index, index + filter.length)}
        </span>
      )
      lastIndex = index + filter.length
    })

    if (lastIndex < title.length) {
      parts.push(<span key={`text-${lastIndex}`}>{title.slice(lastIndex)}</span>)
    }

    return parts
  }, [filter, title, substringIndex, style.filter])

  return (
    <div>
      <Link 
        to={`/produkter/${id}`} 
        style={style.item}
        className="menu-item"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onExpand}
      >
        {titleElement}
        {sub.length > 0 && !isRoot && (
          <FontAwesomeIcon
            icon={expanded ? faChevronDown : faChevronRight}
            style={{
              ...style.icon,
              transform: expanded ? 'rotate(0deg)' : 'rotate(0deg)'
            }}
          />
        )}
      </Link>
      {expanded && (
        <div style={style.subItems}>
          {subItems}
        </div>
      )}
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
