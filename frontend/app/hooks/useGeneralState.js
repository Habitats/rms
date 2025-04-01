import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { GeneralApi } from '../api/GeneralApi'

/**
 * Hook for managing general application state
 * @returns {Object} Object containing general state and operations
 */
export function useGeneralState() {
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: GeneralApi.getProjects
  })

  const { data: images, isLoading: imagesLoading } = useQuery({
    queryKey: ['images'],
    queryFn: GeneralApi.getImages
  })

  const { data: privates, isLoading: privatesLoading } = useQuery({
    queryKey: ['privates'],
    queryFn: GeneralApi.getPrivates
  })

  const isLoading = projectsLoading || imagesLoading || privatesLoading

  return {
    projects: projects || [],
    images: images || [],
    privates: privates || [],
    isLoading
  }
}

/**
 * Hook for managing project state
 * @param {string} projectId - ID of the project to fetch
 * @returns {Object} Object containing project state and operations
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
 * Hook for managing image cache
 * @returns {Object} Object containing cache operations
 */
export function useImageCache() {
  const queryClient = useQueryClient()
  const { mutate: invalidateCache } = useMutation({
    mutationFn: GeneralApi.invalidateImageCache,
    onSuccess: () => {
      queryClient.invalidateQueries(['images'])
    }
  })

  return {
    invalidateCache
  }
}

/**
 * Hook for sending emails
 * @returns {Object} Object containing email operations
 */
export function useSendMail() {
  return useMutation({
    mutationFn: GeneralApi.sendMail
  })
} 