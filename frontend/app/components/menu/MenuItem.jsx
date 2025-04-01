import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Link from './../Link.jsx'
import Radium from 'radium'
import {TEXT, HOVER, FILTER} from '../../colors'

const MenuItem = ({ product, active, filter, isRoot }) => {
  const [state, setState] = useState({
    hover: false,
    expanded: shouldExpand(product, active)
  })

  const shouldExpand = (node, id, callback = (n) => n.id === id, root = node) => {
    return root.sub.length === 0 ? false : callback(node) ||
      node.sub.map(n => shouldExpand(n, id, callback, root)).reduce((a, b) => a || b, false)
  }

  useEffect(() => {
    if (filter.length === 0) {
      setState(prev => ({
        ...prev,
        expanded: shouldExpand(product, active)
      }))
    } else {
      setState(prev => ({
        ...prev,
        expanded: prev.expanded ? true : shouldExpand(product, active)
      }))
    }
  }, [filter, active, product])

  const onExpand = () => {
    if (!isRoot) {
      setState(prev => ({ ...prev, expanded: !prev.expanded }))
    }
  }

  const substringIndex = (seq, subseq) => {
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
  }

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

  const filterLower = filter.toLowerCase()
  const titleLower = title.toLowerCase()
  const indexes = substringIndex(titleLower, filterLower)
  const parts = []
  let lastIndex = 0

  indexes.forEach(i => {
    if (i > lastIndex) {
      parts.push(<span key={lastIndex}>{title.substring(lastIndex, i)}</span>)
    }
    parts.push(
      <span key={i} style={style.filter}>
        {title.substr(i, filterLower.length)}
      </span>
    )
    lastIndex = i + filterLower.length
  })

  if (lastIndex < title.length) {
    parts.push(<span key={lastIndex}>{title.substring(lastIndex)}</span>)
  }

  return (
    <div>
      <Link style={style.link} to={`/produkter/${id}`}>
        {filter ? parts : title}
      </Link>
      {state.expanded && subItems}
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
  filter: PropTypes.string,
  isRoot: PropTypes.bool
}

export default Radium(MenuItem)
