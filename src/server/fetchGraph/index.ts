import { useQuery } from '@tanstack/react-query'
import { client } from '../index'

export const useShowKG = (courseId: string) => {
  return useQuery(['KG', courseId], async () => {
    return client.get({
      url: '/shit/api/points/KG/show',
      params: {
        courseId: courseId
      }
    })
  })
}

export const useShowMG = (courseId: string) => {
  return useQuery(['MG', courseId], async () => {
    return client.get({
      url: '/shit/api/points/KG/student',
      params: {
        courseId: courseId
      }
    })
  })
}
