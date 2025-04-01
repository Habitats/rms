import React, { useState, useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import Link from './../Link.jsx'
import Radium from 'radium'
import {TEXT, HOVER, FILTER} from '../../colors'

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

  const style = {
    link: {
      color: TEXT,
      ':hover': {
        color: HOVER
      }
    },
    filter: {
      color: FILTER
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
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Link
          to={`/produkter/${id}`}
          style={style.link}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {titleElement}
        </Link>
        {sub.length > 0 && !isRoot && (
          <i
            className={`fa fa-chevron-${expanded ? 'down' : 'right'}`}
            style={{marginLeft: 10, cursor: 'pointer'}}
            onClick={onExpand}
          />
        )}
      </div>
      {expanded && subItems}
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

export default Radium(MenuItem)
