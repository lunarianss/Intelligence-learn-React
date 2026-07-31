import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { IQuestionInfo, IQuestionType } from 'reducer/CreateExamPaper/type/type'
import { client } from 'server'
import { QuestionBank, WholeQuestion } from '../types'

/** 添加试题 */
export const useCreateQuestion = () => {
  return useMutation(async (QuestionItem: IQuestionInfo) => {
    return client.post({
      url: '/shit/api/question/teacher/create',
      data: {
        ...QuestionItem
      }
    })
  })
}

/** 获取此课程的全部题目 */
export const useShowCreateQuestion = (id: string) => {
  return useQuery([`questionbank-${id}`], async () => {
    return client.get<QuestionBank[]>({
      url: '/shit/api/question/teacher/show-all',
      params: {
        courseId: id
      }
    })
  })
}

/** 展示一道题的详细信息 */
export const useShowQuestionDetails = (id?: string) => {
  return useQuery([`previewQ-${id}`], async () => {
    return await client.get<WholeQuestion>({
      url: `/shit/api/question/teacher/show-one`,
      params: {
        questionId: id
      }
    })
  })
}

/** 更新题目 */
export const useUpadateQuestion = () => {
  const queryClient = useQueryClient()
  let id = ''
  return useMutation(
    async (QuestionItem: IQuestionType) => {
      id = QuestionItem.questionId
      return client.put({
        url: '/shit/api/question/teacher/update',
        data: {
          ...QuestionItem
        }
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`preview-${id}`])
      }
    }
  )
}

/** 删除试题 */
export const useDeleteQuestion = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (id: string) => {
      return client.delete({
        url: '/shit/api/question/teacher/delete',
        params: { questionId: id }
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['questionbank'])
      }
    }
  )
}
