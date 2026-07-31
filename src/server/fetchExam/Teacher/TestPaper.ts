import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { paperTarget, PublishExamType, PublishHomeworkType } from 'publicComponents/ExamPage/types'
import { client } from 'server'
import { MutationMsg } from 'util/MutationMsg'
import { ExamListItem, IUploadExamPaper, PostTestPaper, TestPaper } from '../types'

/** 上传试卷 */
export const useUploadExamPaper = (courseId: string) => {
  const queryClient = useQueryClient()
  return useMutation(
    async ({ paperName, questionIds, questionsScore }: IUploadExamPaper) => {
      return client.post({
        url: '/shit/api/paper/teacher/create',
        data: {
          paperName,
          courseId,
          questionsScore,
          questionIds
        }
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`ExamList-${courseId}`])
      }
    }
  )
}

/** 打开一张试卷 */
export const useShowTestPaper = (paperId: string) => {
  return useQuery([`TestPaper-${paperId}`], () => {
    return client.get<TestPaper>({
      url: `/shit/api/paper/teacher/paper-preview`,
      params: { id: paperId }
    })
  })
}

/** 保存这张试卷 */
export const useSaveTestPaper = () => {
  return useMutation(async (paper: PostTestPaper) => {
    return client.post({
      url: '/shit/api/paper/teacher/update',
      data: paper
    })
  }, MutationMsg('试卷保存'))
}

/** 删除这张试卷 */
export const useDeleteTestPaper = () => {
  return useMutation(async (paperId: string) => {
    return client.delete({
      url: '/shit/api/paper/teacher/delete',
      data: paperId
    })
  }, MutationMsg('试卷删除'))
}

/** 获取此课程的全部试卷 */
export const useShowExamList = (courseID: string) => {
  return useQuery([`ExamList-${courseID}`], async () => {
    return client.get<ExamListItem[]>({
      url: `/shit/api/paper/teacher/show-all`,
      params: {
        courseId: courseID
      }
    })
  })
}

/** 发布页面获取学生列表 */
export const useGetPaperTarget = (courseId: string) => {
  return useMutation([`paperTarget-${courseId}`], (paperId: string) => {
    return client.get<paperTarget>({
      url: `/shit/api/paper/teacher/get-target`,
      params: {
        courseId,
        paperId
      }
    })
  })
}

/** 发布试卷 */
export const useReleaseExam = () => {
  return useMutation((data: PublishExamType) => {
    return client.post({
      url: '/shit/api/paper/teacher/release-exam',
      data
    })
  }, MutationMsg('发布试卷'))
}

/** 发布作业 */
export const useReleaseHomework = () => {
  return useMutation((data: PublishHomeworkType) => {
    return client.post({
      url: '/shit/api/paper/teacher/release-homework',
      data
    })
  }, MutationMsg('发布试卷'))
}

/** 撤回刚发布的试卷 */
export const useRevokePaper = () => {
  return useMutation((paperId: string) => {
    return client.delete({
      url: `/shit/api/paper/teacher/revoke/${paperId}`
    })
  }, MutationMsg('已撤回'))
}

/** 自动组卷 */
export const useAutoCreatePaper = () => {
  return useMutation((props: any) => {
    return client.post({
      url: `/shit/api/paper/teacher/auto-create`,
      data: props
    })
  })
}

/** 保存自动组卷模板 */
export const useAutoCreateTemplate = () => {
  return useMutation((props: any) => {
    return client.post({
      url: `/shit/api/paper/teacher/save-auto-template`,
      data: props
    })
  })
}

/** 查询指定自动组卷模板 */
export const usePaperTemplate = () => {
  return useMutation((autoPaperId: string) => {
    return client.get({
      url: `/shit/api/paper/teacher/auto-template-preview`,
      params: {
        autoPaperId
      }
    })
  })
}

/** 修改自动组卷模板 */
export const useUpdatePaperTemplate = () => {
  return useMutation((props: any) => {
    return client.put({
      url: `/shit/api/paper/teacher/update-auto-template`
    })
  })
}

/** 删除自动组卷模板 */
export const useDeletePaperTemplate = () => {
  return useMutation((autoPaperId: string) => {
    return client.delete({
      url: `/shit/api/paper/teacher/del-auto-template`,
      params: {
        autoPaperId
      }
    })
  })
}

/** 查询全部自动组卷模板 */
export const useShowTemplate = (courseID: string) => {
  return useQuery([`Template-${courseID}`], async () => {
    return client.get({
      url: `/shit/api/paper/teacher/show-auto-template`,
      params: {
        courseId: courseID
      }
    })
  })
}

/** 复制自动组卷模板 */
export const useCopyTemplate = () => {
  return useMutation((autoPaperId: string) => {
    return client.post({
      url: `/shit/api/paper/teacher/copy-auto-template`,
      params: {
        autoPaperId
      }
    })
  })
}

/** 导出试卷为word */
export const useExportPaper = () => {
  return useMutation((props: { paperId: string; answer: number; explain: number }) => {
    return client.get({
      url: `/shit/api/paper/teacher/export-paper`,
      params: {
        ...props
      }
    })
  })
}

/** 导入识别word试卷 */
export const useImportPaper = () => {
  return useMutation((props: any) => {
    return client.post({
      url: `/shit/api/paper/teacher/import-paper`,
      params: {
        ...props
      }
    })
  })
}

/** 导出全部试卷 */
export const useExportAllPaper = () => {
  return useMutation((props: { paperId: string; answer: number; explain: number }) => {
    return client.get({
      url: `/shit/api/paper/teacher/export-all`,
      params: {
        ...props
      }
    })
  })
}

/** 导出识别试卷模板 */
export const useExportDemo = () => {
  return useMutation((props: any) => {
    return client.get({
      url: `/shit/api/paper/teacher/export-demo`,
      params: {
        ...props
      }
    })
  })
}

/** 获取批改试卷对象 */
export const useCorrectTarget = () => {
  return useMutation((props: { paperId: string; courseId: string }) => {
    return client.get({
      url: `/shit/api/paper/teacher/correct-target`,
      params: {
        ...props
      }
    })
  })
}

/** 批改试卷详情 */
export const useShowCorrect = () => {
  return useMutation((props: { paperId: string; studentId: string }) => {
    return client.get({
      url: `/shit/api/paper/teacher/show-correct`,
      params: {
        ...props
      }
    })
  })
}

/** 批改试卷 */
export const useCorrectPaper = () => {
  return useMutation((props: any) => {
    return client.post({
      url: `/shit/api/paper/teacher/correct-paper`,
      params: {
        ...props
      }
    })
  })
}

/** 打回重做试卷 */
export const usePaperRedo = () => {
  return useMutation((props: { paperId: string; studentId: string }) => {
    return client.post({
      url: `/shit/api/paper/teacher/paper-redo`,
      params: {
        ...props
      }
    })
  })
}
