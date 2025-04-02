import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useParams, useLoaderData } from 'react-router-dom'
import styled from 'styled-components'
import MediumHeadline from './../components/text/MediumHeadline.jsx'
import Photo from './../components/photo/Photo.jsx'
import Left from './../components/Left.jsx'
import Right from './../components/Right.jsx'
import Box from './../components/Box.jsx'
import SimpleLabel from './../components/text/SimpleLabel.jsx'

const PhotosRow = styled.div`
  margin-right: 0;
`

const PhotoItem = styled.div`
  padding: 0;
  margin: 0;
`

const PhotoWrapper = styled.div`
  margin-bottom: 15px;
  margin-left: 15px;
`

const StyledForm = styled.form`
  margin-bottom: 20px;
`

const FormGroup = styled.div`
  margin-bottom: 15px;
`

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`

const FormInput = styled.input`
  display: block;
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  
  &:focus {
    border-color: #66afe9;
    outline: 0;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
  }
`

const FormTextArea = styled.textarea`
  display: block;
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  
  &:focus {
    border-color: #66afe9;
    outline: 0;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
  }
`

const ErrorText = styled.div`
  color: #dc3545;
  margin-bottom: 15px;
`

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
`

const ButtonContainer = styled.div`
  flex: ${props => props.flex || 1};
`

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
  
  &:hover {
    background-color: #286090;
    border-color: #204d74;
  }
`

const DeleteButton = styled(Button)`
  background-color: #d9534f;
  border-color: #d43f3a;
  
  &:hover {
    background-color: #c9302c;
    border-color: #ac2925;
  }
`

const ProjectAdd = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const loaderData = useLoaderData() || {}
  
  useEffect(() => {
    if (loaderData.redirect) {
      navigate(loaderData.redirect)
    }
  }, [loaderData.redirect, navigate])
  
  const { project, images = [], projects = [] } = loaderData
  
  const [state, setState] = useState({
    chosenImages: new Map(),
    description: '',
    title: '',
    id: null,
    error: ''
  })

  useEffect(() => {
    if (project) {
      setState(prev => ({
        ...prev,
        description: project.description,
        title: project.title,
        id: project.id,
        chosenImages: new Map(project.images.map(i => [i.src, i]))
      }))
    }
  }, [project])

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
    <PhotoItem key={i.src} className="col-sm-3 col-xs-6">
      <PhotoWrapper>
        <Photo 
          size={'low'}
          height={100}
          onClick={() => onSelect(i.src)}
          selected={chosenImages.has(i.src)}
          src={i.src}
        />
      </PhotoWrapper>
    </PhotoItem>
  ))

  return (
    <div>
      <Left>
        <Box>
          <StyledForm>
            <FormGroup>
              <FormLabel>Valgte bilder</FormLabel>
              {chosenLabels}
            </FormGroup>
          </StyledForm>
        </Box>
      </Left>
      <Right>
        <Box>
          <MediumHeadline big={stateId ? 'Endre referanse' : 'Ny referanse'}/>

          <StyledForm>
            <FormGroup>
              <FormLabel>Tittel</FormLabel>
              <FormInput 
                onChange={handleTitleChange} 
                placeholder="Prosjekttittel" 
                type="text"
                value={title}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Beskrivelse</FormLabel>
              <FormTextArea 
                onChange={handleDescriptionChange}
                placeholder="Skriv en prosjektbeskrivelse her." 
                rows="5" 
                value={description}
              />
            </FormGroup>
          </StyledForm>
          {error && <ErrorText>{error}</ErrorText>}
          <MediumHeadline big="Velg bilder"/>
          <PhotosRow className="row">
            {photos}
          </PhotosRow>
          <ButtonRow>
            <ButtonContainer flex={stateId ? 1 : 2}>
              <Button onClick={() => navigate(-1)}>Tilbake</Button>
            </ButtonContainer>
            {stateId && (
              <ButtonContainer flex={1}>
                <DeleteButton onClick={onRemove}>Slett</DeleteButton>
              </ButtonContainer>
            )}
            <ButtonContainer flex={stateId ? 1 : 2}>
              <Button onClick={onSave}>Lagre</Button>
            </ButtonContainer>
          </ButtonRow>
        </Box>
      </Right>
    </div>
  )
}

ProjectAdd.propTypes = {}

export default ProjectAdd