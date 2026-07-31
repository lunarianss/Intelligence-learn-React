export interface IChapterReducerState {
  expandKeys: string[]
  ChapterError: unknown
  curAddInputValue: string
  focusState: boolean
}

export type IChapterReducerAction =
  | { type: 'setError'; error: unknown }
  | { type: 'setFocusState'; focusState: boolean }
  | { type: 'setExpandKeys'; expandKeys: (preState: string[]) => string[] }
  | { type: 'setCurInputValue'; curInputValue: string }

export type ICourseTimeReducerAction =
  | { type: 'setModalState'; open: boolean }
  | { type: 'setFileList'; fileObj: <T>(pre: T[]) => T[] }
  | { type: 'setName'; name: string }
  | { type: 'initNameAndFileList' }
  | { type: 'pushId'; id: string }
  | { type: 'clearId' }

export interface ICourseTimeReducerState {
  courseTimeModalVisible: boolean
  fileList: ICurFileObj[]
  courseTimeName: string
  ids: string[]
}

interface ICurFileObj {
  resourceId: string
  sourceLink: string
  resourceName: string
  type: number
}
