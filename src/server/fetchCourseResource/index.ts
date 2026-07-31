import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from 'server'
import { ResourceType } from './types'
// 显示资源列表
export const useShowResourceList = (courseId: string) => {
  return useQuery([`resources-${courseId}`], async () => {
    return client.get<ResourceType[]>({
      url: '/course/api/resources/list-resources',
      params: {
        courseId: courseId
      }
    })
  })
}

export const useUploadRes = () => {
  return useMutation((res: any) => {
    return client.post<any>({
      url: '/course/api/resources/upload-avatar',
      data: {
        avatar: res
      }
    })
  })
}
