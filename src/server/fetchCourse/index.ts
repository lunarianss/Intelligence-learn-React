import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { client } from 'server'
import { CourseList } from './types'

// 显示课程
export const useShowCreateClass = () => {
  return useQuery(['teachclass'], async () => {
    return client.get<CourseList[]>({
      url: '/course/api/course/show-create'
    })
  })
}

//显示我学的课程
export const useShowLearnClass = () => {
  return useQuery(['learnclass'], async () => {
    return client.get<CourseList[]>({
      url: '/course/api/course/show-join'
    })
  })
}

//显示邀请码班级信息
export const useShowInvitedCourseInfo = () => {
  return useMutation(async (class_invitation_code: string) => {
    return await client.get({
      url: '/course/api/class/invitation-code',
      params: { classInvitationCode: class_invitation_code }
    })
  })
}

//加入此班级（课程）
export const useJoinInvitedCourse = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (props: { classId: string; ability: string; expect: string }) => {
      return client.post<CourseList>({
        url: '/course/api/class/join',
        params: { ...props }
      })
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(['learnclass'])
      }
    }
  )
}

export const useSendPicture = () => {
  return useMutation(
    (avatar: FormData | null) => {
      return client.post({
        url: '/course/api/resources/upload-avatar',
        data: avatar,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },
    {
      onSuccess: (data) => {
        console.log('data', data)
      },
      onError: (e) => {
        console.log('data', e)
      }
    }
  )
}

// 添加课程
export const useCreateClass = ({
  course_name,
  course_describe,
  course_cover
}: {
  course_name: string
  course_describe: string | null
  course_cover: string
}) => {
  const queryClient = useQueryClient()
  return useMutation(
    () => {
      return client.post({
        url: '/course/api/course/create',
        data: { course_name, course_describe, course_cover }
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['teachclass'])
      }
    }
  )
}

/* 获取课程 */
export const useGetCourseInfoById = () => {
  return useMutation(async (courseId: string) => {
    return client.get({ url: `/course/api/course/get-one/${courseId}` })
  })
}

//删除此课程
export const useDeleteCourse = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (courseId: string) => {
      return client.delete({
        url: `/course/api/course/delete/${courseId}`
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['teachclass'])
      }
    }
  )
}

//修改课程信息
export const useEditCourse = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (data: CourseList) => {
      return client.put({
        url: '/course/api/course/update',
        data
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['teachclass'])
      }
    }
  )
}

/** 随机获取课程 */
export const useRandomCourse = () => {
  return useQuery(['random-course'], async () => {
    return client.get({ url: '/course/api/course/get-random' })
  })
}

export const useRandomCourseInfo = (courseId: string) => {
  return useQuery([`random-course-${courseId}`], async () => {
    return client.get({ url: `/course/api/course/get-random-detail/${courseId}` })
  })
}
