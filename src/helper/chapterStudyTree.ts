import { QueryClient } from '@tanstack/react-query'
import { cloneDeepWith } from 'lodash'
import React from 'react'
import { IChapterReducerAction } from 'reducer/ChaperStudyTree/type/type'
import { ChapterResourceType } from 'server/fetch3rd/fetchChapter/types'
import { StateSetter } from 'types'
import { ChapterInitNode, ChapterTreeData, ChildChapter, ClassTimeInitNode } from '../hook/useChapterStudy/type'
import { ChapterData } from '../types/server/fetchChapter'
/* 寻找要刪除的树的章节目录节点 */
export const deleteTreeNode = (data: any[], id: string, queryClient: QueryClient, courseId: string) => {
  const deepCloneData = cloneDeepWith(data)
  const recursion = (data: any[]) => {
    if (!data) return
    data.forEach((d: ChildChapter, index) => {
      if (d?.childChapters?.length) {
        recursion(d?.childChapters)
      }
      if (id === d?.id) {
        data.splice(index, 1)
        queryClient.setQueryData(['chapterTree', courseId], deepCloneData)
      }
    })
  }
  recursion(deepCloneData)
}
/* 删除资源 */
export const deleteResource = (data: ChapterTreeData[], id: string, queryClient: QueryClient, courseId: string) => {
  const deepCloneData = cloneDeepWith(data)
  const recursion = (data: ChapterTreeData[]) => {
    data.forEach((d) => {
      if (!data) return
      if (d.courTimes && d.courTimes.length) {
        d.courTimes.forEach((courTime) => {
          if (courTime?.resource && courTime?.resource?.length) {
            courTime.resource.forEach((resource: any, i: any) => {
              if (resource.resourceId === id) {
                courTime.resource.splice(i, 1)
                queryClient.setQueryData(['chapterTree', courseId], deepCloneData)
              }
            })
          }
        })
      }
      if (d.childChapters.length) {
        recursion(d.childChapters)
      }
    })
  }
  recursion(deepCloneData)
}
/* 删除课时 */
export const deleteTreeContent = (data: ChapterTreeData[], id: string, queryClient: QueryClient, courseId: string) => {
  const deepCloneData = cloneDeepWith(data)
  const recursion = (data: ChapterTreeData[]) => {
    if (!data) return
    data.forEach((d) => {
      d.courTimes?.forEach((da, index) => {
        if (da.classTimeId === id) {
          d.courTimes?.splice(index, 1)
          queryClient.setQueryData(['chapterTree', courseId], deepCloneData)
        }
      })
      if (d.childChapters.length) {
        recursion(d.childChapters)
      }
    })
  }
  recursion(deepCloneData)
}

export const addChildChapterNode = (
  data: ChapterTreeData[],
  id: string,
  queryClient: QueryClient,
  node: ChapterInitNode,
  courseId: string
) => {
  const deepCloneData = cloneDeepWith(data)
  const recursion = (data: ChapterTreeData[]) => {
    if (!data) return
    data.forEach((d: ChapterTreeData) => {
      if (d.childChapters.length) {
        recursion(d.childChapters)
      }
      if (id === d.id) {
        d.childChapters = d.childChapters.concat(node)
        queryClient.setQueryData(['chapterTree', courseId], deepCloneData)
      }
    })
  }
  recursion(deepCloneData)
}

/* 传入参数一更新函数来更新queryData,从而使得UI更新 */
export const updateChapterTreeQueryCache = (
  updaterFun: (Treedata: ChapterData[]) => ChapterData[],
  queryClient: QueryClient,
  courseId: string
) => {
  const queryTreeData: ChapterData[] | undefined = queryClient.getQueryData(['chapterTree', courseId])
  const newQueryTreeData = queryTreeData ? updaterFun(queryTreeData!) : 0
  queryClient.setQueryData(['chapterTree', courseId], newQueryTreeData)
}

/* 添加课时 */
export const addChildContentNode = (
  data: ChapterTreeData[],
  id: string,
  queryClient: QueryClient,
  node: ClassTimeInitNode,
  courseId: string
) => {
  const deepCloneData = cloneDeepWith(data)
  const recursion = (data: ChapterTreeData[]) => {
    if (!data) return
    data.forEach((d: ChildChapter) => {
      if (d?.childChapters?.length) {
        recursion(d?.childChapters)
      }
      if (id === d.id) {
        d.courTimes = d.courTimes.concat(node)
        queryClient.setQueryData(['chapterTree', courseId], deepCloneData)
      }
    })
  }
  recursion(deepCloneData)
}

/* 重命名节点 */
export const reNameTreeNode = (
  data: ChapterTreeData[],
  id: string,
  setCurRenameNode: StateSetter<ChapterTreeData | null>,
  dispatch: React.Dispatch<IChapterReducerAction>
) => {
  const recursion = (data: ChapterTreeData[]) => {
    if (!data) return
    data.forEach((d: ChildChapter) => {
      if (d.childChapters.length) {
        recursion(d.childChapters)
      }
      if (id === d.id) {
        setCurRenameNode(d)
        dispatch({ type: 'setCurInputValue', curInputValue: d.name })
        dispatch({
          type: 'setExpandKeys',
          expandKeys: (pre) => pre.concat(d.id)
        })
      }
    })
  }
  recursion(data)
}
/* 受控keys，全部展开 */
export const generateExpandKeys = (data: ChapterTreeData[]) => {
  if (!data) return []
  const result: string[] = []
  const recursion = (data: ChapterTreeData[]) => {
    data.forEach((d: any) => {
      if (d.childChapters.length) {
        recursion(d.childChapters)
        result.push(d.id)
      } else {
        result.push(d.id)
      }
    })
  }
  recursion(data)
  return result
}

/* 格式化资源 */
export const formatResource = (resource: ChapterResourceType[]) => {
  const result: ChapterResourceType[] = []
  resource.forEach((r) => {
    if (r.type === 10) {
      result.push(r)
    }
  })
  resource.forEach((r) => {
    if (r.type === 20 || r.type === 21) {
      result.push(r)
    }
  })

  resource.forEach((r) => {
    if (r.type === 22) {
      result.push(r)
    }
  })
  resource.forEach((r) => {
    if (r.type === 23) {
      result.push(r)
    }
  })

  resource.forEach((r) => {
    if (r.type === 40 || r.type === 41) {
      result.push(r)
    }
  })

  resource.forEach((r) => {
    if (r.type === 50) {
      result.push(r)
    }
  })

  return result
}

/* 挂载前展开所有视频 */
export const expandOnMount = (data: ChapterTreeData[]) => {
  const result: string[] = []
  const recursion = (data: ChapterTreeData[]) => {
    data.forEach((d: any) => {
      if (d.childChapters && d.childChapters.length) {
        recursion(d.childChapters)
      }
      if (d.courTimes && d.courTimes.length) {
        recursion(d.courTimes)
      }
      if (d.classTimeId) {
        result.push(d.classTimeId)
      }
      if (d.id) {
        result.push(d.id)
      }
    })
  }
  recursion(data)

  return result
}
