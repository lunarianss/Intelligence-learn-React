import { useMutation, useQuery } from '@tanstack/react-query'
import { ChapterResourceType } from '../fetch3rd/fetchChapter/types'
import { client } from '../index'

export const useGetResource = (resourceId: string) => {
  return useQuery<ChapterResourceType>(['resource', resourceId], async () => {
    return client.get({ url: `/course/api/resources/get-resource/${resourceId}` })
  })
}

export const useUploadVideo = () => {
  return useMutation(
    async ({ videoId, relatePoints, courseId }: { videoId: string; courseId: string; relatePoints: string[] }) => {
      return client.post({
        url: '/course/api/resources/upload-video',
        data: {
          videoId,
          relatePoints,
          courseId
        }
      })
    }
  )
}

export const useDeleteResource = () => {
  return useMutation(async (id: string) => {
    return client.delete({
      url: `/course/api/resources/delete/${id}`
    })
  })
}
