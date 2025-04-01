import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useParams, useLoaderData, useActionData } from 'react-router-dom'
import MediumHeadline from './../components/text/MediumHeadline.jsx'
import Photo from './../components/photo/Photo.jsx'
import Left from './../components/Left.jsx'
import Right from './../components/Right.jsx'
import Box from './../components/Box.jsx'
import SimpleLabel from './../components/text/SimpleLabel.jsx'

const ProjectAdd = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { images, projects, isAdmin } = useLoaderData()
  const actionData = useActionData()
  
  const [state, setState] = useState({
    chosenImages: new Map(),
    description: '',
    title: '',
    id: null,
    error: ''
  })

  useEffect(() => {
    if (id && projects.find(p => p.id === id)) {
      const project = projects.find(p => p.id === id)
      setState(prev => ({
        ...prev,
        description: project.description,
        title: project.title,
        id: project.id,
        chosenImages: new Map(project.images.map(i => [i.src, i]))
      }))
    }
  }, [id, projects])

  const handleTitleChange = (event) => {
    setState(prev => ({ ...prev, title: event.target.value }))
  }

  const handleDescriptionChange = (event) => {
    setState(prev => ({ ...prev, description: event.target.value }))
  }

  const onSelect = (src) => {
    setState(prev => {
      const chosenImages = new Map(prev.chosenImages)
      if (chosenImages.has(src)) {
        chosenImages.delete(src)
      } else {
        const image = images.find(i => i.src === src)
        chosenImages.set(src, image)
      }
      return { ...prev, chosenImages }
    })
  }

  const isValid = () => {
    return state.chosenImages.size > 0 && state.title.length > 0 && state.description.length > 0
  }

  const onSave = async () => {
    if (isValid()) {
      try {
        const project = {
          id: state.id || projects.map(p => parseInt(p.id)).reduce((a, b) => Math.max(a, b)) + 1,
          title: state.title,
          description: state.description,
          images: Array.from(state.chosenImages.values())
        }

        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(project),
        })
        
        if (!response.ok) throw new Error('Failed to save project')
        navigate('/referanser')
      } catch (error) {
        setState(prev => ({ ...prev, error: error.message }))
      }
    } else {
      setState(prev => ({ ...prev, error: 'Fyll ut alle felt og velg noen bilder!' }))
    }
  }

  const onRemove = async () => {
    try {
      const response = await fetch(`/api/projects/${state.id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('Failed to delete project')
      navigate('/referanser')
    } catch (error) {
      setState(prev => ({ ...prev, error: error.message }))
    }
  }

  const { chosenImages, error, title, description, id: stateId } = state

  const chosenLabels = Array.from(chosenImages.values()).map(i => (
    <SimpleLabel key={i.src} text={i.title}/>
  ))

  const usedImages = projects.length > 0 
    ? [...new Set(projects
        .filter(p => p.id !== stateId)
        .map(p => p.images)
        .reduce((a, b) => a.concat(b))
        .map(i => i.src))]
    : []

  const filteredImages = images.length > 0 
    ? [...new Set(images.filter(i => !usedImages.includes(i.src)))] 
    : []

  const photos = filteredImages.map(i => (
    <div key={i.src} className="col-sm-3 col-xs-6" style={{padding: 0, margin: 0}}>
      <div className={'photo'} style={{marginBottom: 15, marginLeft: 15}}>
        <Photo 
          size={'low'}
          height={100}
          onClick={() => onSelect(i.src)}
          selected={chosenImages.has(i.src)}
          src={i.src}
        />
      </div>
    </div>
  ))

  return (
    <div>
      <Left>
        <Box>
          <form className="form">
            <div className="form-group">
              <label>Valgte bilder</label>
              {chosenLabels}
            </div>
          </form>
        </Box>
      </Left>
      <Right>
        <Box>
          <MediumHeadline big={stateId ? 'Endre referanse' : 'Ny referanse'}/>

          <form className="form">
            <div className="form-group">
              <label>Tittel</label>
              <input 
                className="form-control" 
                onChange={handleTitleChange} 
                placeholder="Prosjekttittel" 
                type="text"
                value={title}
              />
            </div>
            <div className="form-group">
              <label>Beskrivelse</label>
              <textarea 
                className="form-control" 
                onChange={handleDescriptionChange}
                placeholder="Skriv en prosjektbeskrivelse her." 
                rows="5" 
                value={description}
              />
            </div>
          </form>
          <div>{error}</div>
          <MediumHeadline big="Velg bilder"/>
          <div className="row" style={{marginRight: 0}}>
            {photos}
          </div>
          <div className="row">
            <div className={`col-xs-${stateId ? 4 : 6}`}>
              <button className="btn btn-primary btn-block" onClick={() => navigate(-1)}>Tilbake</button>
            </div>
            {stateId ? (
              <div className={`col-xs-${stateId ? 4 : 6}`}>
                <button className="btn btn-primary btn-block" onClick={onRemove}>Slett</button>
              </div>
            ) : null}
            <div className={`col-xs-${stateId ? 4 : 6}`}>
              <button className="btn btn-primary btn-block" onClick={onSave}>Lagre</button>
            </div>
          </div>
        </Box>
      </Right>
    </div>
  )
}

ProjectAdd.propTypes = {}

export default ProjectAdd