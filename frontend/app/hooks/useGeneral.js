import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { GeneralApi } from '../api/GeneralApi'

/**
 * Hook for fetching all projects
 * @returns {Object} Query result containing projects data
 */
export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: GeneralApi.getProjects
  })
}

/**
 * Hook for fetching a single project
 * @param {string} projectId - ID of the project to fetch
 * @returns {Object} Query result containing project data
 */
export function useProject(projectId) {
  return useQuery({
    queryKey: ['projects', projectId],
    queryFn: () => GeneralApi.getProject(projectId),
    enabled: !!projectId
  })
}

/**
 * Hook for project mutations
 * @returns {Object} Object containing mutation functions
 */
export function useProjectMutations() {
  const queryClient = useQueryClient()

  const createProject = useMutation({
    mutationFn: GeneralApi.saveProject,
    onSuccess: () => {
      queryClient.invalidateQueries(['projects'])
    }
  })

  const deleteProject = useMutation({
    mutationFn: GeneralApi.removeProject,
    onSuccess: () => {
      queryClient.invalidateQueries(['projects'])
    }
  })

  return {
    createProject,
    deleteProject
  }
}

/**
 * Hook for image operations
 * @returns {Object} Object containing image operations
 */
export function useImages() {
  const queryClient = useQueryClient()

  const { data: images, isLoading } = useQuery({
    queryKey: ['images'],
    queryFn: GeneralApi.getImages
  })

  const invalidateCache = useMutation({
    mutationFn: GeneralApi.invalidateImageCache,
    onSuccess: () => {
      queryClient.invalidateQueries(['images'])
    }
  })

  return {
    images,
    isLoading,
    invalidateCache
  }
}

/**
 * Hook for private content
 * @returns {Object} Query result containing private content
 */
export function usePrivates() {
  return useQuery({
    queryKey: ['privates'],
    queryFn: GeneralApi.getPrivates
  })
}

/**
 * Hook for sending emails
 * @returns {Object} Mutation function for sending emails
 */
export function useSendMail() {
  return useMutation({
    mutationFn: GeneralApi.sendMail
  })
} 