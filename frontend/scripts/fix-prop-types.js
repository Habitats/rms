const fs = require('fs')
const path = require('path')

// Function to update a single file
function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  
  // Check if file already has prop-types import
  if (content.includes('import PropTypes from \'prop-types\'')) {
    return
  }
  
  // Replace React import that includes PropTypes
  content = content.replace(
    /import React, {Component, PropTypes} from 'react'/g,
    "import React, {Component} from 'react'\nimport PropTypes from 'prop-types'"
  )
  
  // Replace React import that has PropTypes in different order
  content = content.replace(
    /import React, {PropTypes, Component} from 'react'/g,
    "import React, {Component} from 'react'\nimport PropTypes from 'prop-types'"
  )
  
  fs.writeFileSync(filePath, content)
  console.log(`Updated ${filePath}`)
}

// Function to process a directory
function processDirectory(dir) {
  const files = fs.readdirSync(dir)
  
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    
    if (stat.isDirectory()) {
      processDirectory(filePath)
    } else if (file.endsWith('.jsx')) {
      updateFile(filePath)
    }
  })
}

// Start processing from the app directory
const appDir = path.join(__dirname, '../app')
processDirectory(appDir)

console.log('Finished updating PropTypes imports') 