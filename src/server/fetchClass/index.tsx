import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { message } from "antd"
import { client } from "server"
import { ClassList,StudentList } from "./types"

export const useToGetClassList = (courseId: string) => {
  return useQuery([`classList-${courseId}`], async () => {
    return client.get<ClassList[]>({
      url: '/course/api/class/show',
      params: { courseId }
    })
  })
}

export const useDeleteClass = (courseId: string) => {
  const queryClient = useQueryClient()
  return useMutation(
    (id: string) => {
      return client.delete({ url: `/course/api/class/delete/${id}` })
    },
    {
      onSuccess: () => {
        message.loading('重新获取列表')
        queryClient.refetchQueries([`classList-${courseId}`])
      }
    }
  )
}

export const useCreateNewClass = (courseId: string) => {
  const queryClient = useQueryClient()
  return useMutation(
    (className: string) => {
      return client.post({
        url: `/course/api/class/create`,
        data: {
          course_id: courseId,
          class_name: className
        }
      })
    },
    {
      onSuccess: () => {
        message.loading('重新获取列表')
        queryClient.refetchQueries([`classList-${courseId}`])
      }
    }
  )
}

export const useReName = (courseId: string) => {
  const queryClient = useQueryClient()
  return useMutation(
    (props: { className: string; classId: string }) => {
      return client.put({
        url: '/course/api/class/update-name',
        data: {
          class_id: props.classId,
          class_name: props.className
        }
      })
    },
    {
      onSuccess: () => {
        message.loading('重新获取列表')
        queryClient.refetchQueries([`classList-${courseId}`])
      }
    }
  )
}

export const useShowStudent = (classId: string) => {
  return useQuery([`useShowStudent-${classId}`], () => {
    return client.get<StudentList[]>(
      {
        url: '/course/api/class/show-student',
        params: {
          classId: classId
        }
      }
    )
  })
}

export const useDeleteStudent = (useRefetchStudent: any) => {
  return useMutation(
    (argus: { classId: string; userId: string }) => {
      return client.delete({
        url: '/course/api/class/remove-student',
        data: {
          classId: argus.classId,
          userId: argus.userId
        }
      })
    },
    {
      onSuccess: () => {
        useRefetchStudent()
      }
    }
  )
}
