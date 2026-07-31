import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { client } from 'server'
import { GlobalMessage } from '../../publicComponents/GlobalMessage/index'
import { IAddKnowledgeParam } from './types'
/*展示章节学习树*/
export const useShowKnowledgeTree = (courseId: string) => {
  return useQuery(
    ['knowledgeTree', courseId],
    async () => {
      return client.get({
        url: '/shit/api/points/show',
        params: { courseId: courseId }
      })
    },
    { refetchOnMount: false }
  )
}

/* 添加根知识点 */
export const useAddKnowledgePointsAPI = () => {
  return useMutation(async ({ pointPid, pointName, courseId }: IAddKnowledgeParam) => {
    return client.post({ url: '/shit/api/points/add-point', data: { pointPid, pointName, courseId } })
  })
}
/*删除知识点*/
export const useDeleteKnowledgeAPI = () => {
  return useMutation(async ({ pointIds }: { pointIds: string[] }) => {
    return client.delete({ url: '/shit/api/points/delete', params: { pointIds } })
  })
}
/*更新知识点名称*/
export const useRenameKnowledgeAPI = () => {
  return useMutation(async ({ pointId, pointName }: { pointId: string; pointName: string }) => {
    return client.put({
      url: '/shit/api/points/update-name',
      data: {
        pointId,
        pointName
      }
    })
  })
}

/*关联知识点*/
export const relatePrePointsAPI = (courseId: string) => {
  return useMutation(async ({ pointId, prePointId }: { pointId: string; prePointId: string[] }) => {
    return client.post({ url: '/shit/api/points/pre-points', data: { pointId, prePointId, courseId } })
  })
}

/*关联知识点*/
export const relateAfterPointsAPI = (courseId: string) => {
  return useMutation(async ({ pointId, afterPointId }: { pointId: string; afterPointId: string[] }) => {
    return client.post({ url: '/shit/api/points/after-points', data: { pointId, afterPointId, courseId } })
  })
}

export const importKnowledgePoints = (courseId: string) => {
  const queryClient = useQueryClient()
  return useMutation(
    async (excelFile: FormData) => {
      return client.post({
        url: '/shit/api/points/excel/import',
        data: excelFile,
        params: {
          courseId
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(['knowledgeTree', courseId])
        GlobalMessage('success', '知识点更新成功！！')
      }
    }
  )
}
