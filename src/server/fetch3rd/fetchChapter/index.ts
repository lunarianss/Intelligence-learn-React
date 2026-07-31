import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { client } from 'server'
import { generateExpandKeys } from '../../../helper/chapterStudyTree'
import { ChapterTreeData } from '../../../hook/useChapterStudy/type'
import { IChapterReducerAction } from '../../../reducer/ChaperStudyTree/type/type'
import { AddChapterParam, EditChapterParam } from '../../../types/server/fetchChapter'
import { AddContent, AddContentResource, EditContent } from '../../../types/server/fetchClassTime'
import qs from 'qs'
/*获取章节学习树信息*/
export const useShowChapter = (courseId: string, dispatch: React.Dispatch<IChapterReducerAction>) => {
  return useQuery(
    ['chapterTree', courseId],
    async () => {
      if (courseId === '') return
      const data: ChapterTreeData[] = await client.get({
        url: '/course/api/chapter/getChapter',
        params: { courseId }
      })
      // dispatch({ type: 'setExpandKeys', expandKeys: () => generateExpandKeys(data) })
      return data
    },
    { refetchOnMount: false }
  )
}

/*删除章节树节点*/
export const useDeleteChapter = () => {
  return useMutation(async (id: string) => {
    return client.delete({ url: `/course/api/chapter/deleteChapter/${id}` })
  })
}

/*确认添加章节树根节点*/
export const useAddChapter = (setCurNode: any) => {
  return useMutation(
    async ({ name, course_id }: AddChapterParam) => {
      return client.post({
        url: '/course/api/chapter/addChapter',
        data: { name, course_id, pid: '-1' }
      })
    },
    {
      onSuccess: (data: any) => {
        /*通过data取到id，通过setCurNode来修改*/
        setCurNode((pre: any) => {
          pre.id = data
          return pre
        })
      }
    }
  )
}

/*添加章节学习树的子目录*/
export const useAddChildChapter = (setCurNode: any) => {
  return useMutation(
    async ({ course_id, name, pid }: AddChapterParam) => {
      return client.post({
        url: '/course/api/chapter/addChapter',
        data: { course_id, name, pid }
      })
    },
    {
      onSuccess: (data: any) => {
        /*通过data取到id，通过setCurNode来修改*/
        setCurNode((pre: any) => {
          pre.id = data
          return pre
        })
      }
    }
  )
}

/*更改章节名称*/
export const useEditChapter = () => {
  return useMutation(async ({ chapter_id, new_name }: EditChapterParam) => {
    return client.put({
      url: '/course/api/chapter/updateChapterName',
      data: { chapter_id, new_name }
    })
  })
}
/*上传课时资源*/
export const useAddContentResource = (courseId: string) => {
  const queryClient = useQueryClient()
  return useMutation(
    async ({ relatedPoints, courseId, file }: AddContentResource) => {
      return client.post({
        url: '/course/api/resources/upload-course',
        params: { courseId, relatedPoints: relatedPoints },
        data: file,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        paramsSerializer: params => {
          return qs.stringify(params, { indices: false })
        }
      })
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(['resources', courseId])
      }
    }
  )
}

/* 添加课时 */
export const useAddContent = (courseId: string) => {
  const queryClient = useQueryClient()
  return useMutation(
    async ({ chapter_id, name, resource_ids, paper_id, paper_name }: AddContent) => {
      return client.post({
        url: '/course/api/ctime/addClassTime',
        data: {
          chapter_id,
          name,
          resource_ids,
          paper_id,
          paper_name
        }
      })
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(['chapterTree', courseId])
      }
    }
  )
}
/* 删除课时 */
export const useDeleteClassTime = () => {
  return useMutation(async (id: string) => {
    return client.delete({ url: `/course/api/ctime/deleteClassTime/${id}` })
  })
}
/*删除资源*/
export const useDeleteResource = () => {
  return useMutation(async (id: string) => {
    return client.delete({ url: `/course/api/resources/delete/${id}` })
  })
}
/* 编辑课时 */
export const useEditClassTime = () => {
  return useMutation(async ({ chapter_id, class_time_id, name, paper_id, paper_name, resource_ids }: EditContent) => {
    return client.put({
      url: '/course/api/ctime/updateClassTime',
      data: {
        chapter_id,
        class_time_id,
        name,
        paper_id,
        paper_name,
        resource_ids
      }
    })
  })
}
