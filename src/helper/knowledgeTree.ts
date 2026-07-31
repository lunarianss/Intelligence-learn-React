import { QueryClient } from '@tanstack/react-query'
import { cloneDeepWith } from 'lodash'
import React from 'react'
import { IChapterReducerAction } from 'reducer/ChaperStudyTree/type/type'
import { IKnowledgePoint, PrePoint } from '../hook/useKnowledge/type'

export const updateKnowledgeTreeQueryCache = (
  updaterFun: (query: IKnowledgePoint[]) => IKnowledgePoint[],
  queryClient: QueryClient,
  courseId: string
) => {
  const queryTreeData: IKnowledgePoint[] = queryClient.getQueryData(['knowledgeTree', courseId]) || []
  const newQueryTreeData = updaterFun(queryTreeData)
  queryClient.setQueryData(['knowledgeTree', courseId], newQueryTreeData)
}
/*添加子知识点*/
export const addChildKnowledgeNode = (
  data: IKnowledgePoint[],
  id: string,
  queryClient: QueryClient,
  node: IKnowledgePoint,
  courseId: string
) => {
  const deepCloneData = cloneDeepWith(data)
  const recursion = (data: IKnowledgePoint[]) => {
    if (!data) return
    data.map((d) => {
      if (d?.children?.length) {
        recursion(d.children)
      }
      if (id == d.pointId) {
        d.children = d?.children.concat(node)
        queryClient.setQueryData(['knowledgeTree', courseId], deepCloneData)
      }
    })
  }
  recursion(deepCloneData)
}
/*删除知识点*/
export const deleteKnowledgeNode = (data: any, id: any, queryClient: any, courseId: string) => {
  const deepCloneData = cloneDeepWith(data)
  const recursion = (data: any) => {
    if (!data) return
    data.map((d: any, index: number) => {
      if (d?.children?.length) {
        recursion(d.children)
      }
      if (id == d?.pointId) {
        data.splice(index, 1)
        queryClient.setQueryData(['knowledgeTree', courseId], deepCloneData)
      }
    })
  }
  recursion(deepCloneData)
}
/*重命名节点*/
export const renameKnowledgePoint = (
  data: IKnowledgePoint[],
  id: string,
  setCurRenameNode: any,
  dispatch: React.Dispatch<IChapterReducerAction>,
  courseId: string
) => {
  const recursion = (data: IKnowledgePoint[]) => {
    if (!data) return
    data.map((d) => {
      if (d.children.length) {
        recursion(d.children)
      }
      if (id == d.pointId) {
        setCurRenameNode(d)
        dispatch({ type: 'setCurInputValue', curInputValue: d.pointName })
      }
    })
  }
  recursion(data)
}
export const generateKnowledgeKeys = (data: any) => {
  if (!data) return
  const result: any = []
  const recursion = (data: any) => {
    data.forEach((d: any) => {
      if (d.children) {
        recursion(d.children)
      }
      result.push(d.pointId)
    })
  }
  recursion(data)
  return result
}
/*关联前序知识点*/
export const relateAllPoints = (
  data: IKnowledgePoint[],
  id: string,
  queryClient: QueryClient,
  node: PrePoint[],
  mark: string,
  courseId: string
) => {
  const deepCloneData = cloneDeepWith(data)
  const recursion = (data: IKnowledgePoint[]) => {
    if (!data) return
    data.map((d: IKnowledgePoint) => {
      if (d?.children?.length) {
        recursion(d.children)
      }
      if (id == d.pointId) {
        mark === 'pre' ? (d.prePoints = node) : (d.afterPoints = node)
        queryClient.setQueryData(['knowledgeTree', courseId], deepCloneData)
      }
    })
  }
  recursion(deepCloneData)
}
export const generateRelatePointsObj = (data: IKnowledgePoint[], checked: string[], courseId: string) => {
  if (!data) return []
  const result: PrePoint[] = []
  const recursion = (data: IKnowledgePoint[]) => {
    data.forEach((d) => {
      if (d.children) {
        recursion(d.children)
      }
      checked.forEach((id: any) => {
        if (d.pointId === id) {
          result.push({ pointId: id, pointName: d.pointName })
        }
      })
    })
  }
  recursion(data)
  return result
}
/*找到当前节点关联的id*/
export const findCurRelatePoints = (data: any, id: any, mark: any) => {
  const result: any = []
  const recursion = (data: any) => {
    if (!data) return
    data.map((d: any) => {
      if (d.children.length) {
        recursion(d.children)
      }
      if (id == d.pointId) {
        if (mark === '前序') {
          d.prePoints.forEach((p: any) => {
            result.push(p.pointId)
          })
        } else {
          d.afterPoints.forEach((p: any) => {
            result.push(p.pointId)
          })
        }
      }
    })
  }
  recursion(data)
  return result
}
