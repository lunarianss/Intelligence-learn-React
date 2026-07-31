import { message } from 'antd'
import produce, { original } from 'immer'
import { isCouldSaveQuestion } from 'publicComponents/CreateQuestionPage/QuestionType/util'
import { IQuestionType, IQuestionTypeAction, IQuestionTypeInitialState } from './type/type'

export const initialQuestionTypeState: IQuestionTypeInitialState<IQuestionType> = {
  singleChoice: {
    list: [],
    pointSum: 0
  },

  multipleChoice: {
    list: [],
    pointSum: 0
  },
  fillBlankData: {
    list: [],
    pointSum: 0
  },
  shortAnswer: {
    list: [],
    pointSum: 0
  },
  judgeChoice: {
    list: [],
    pointSum: 0
  }
}

type questionType = 'singleChoice' | 'multipleChoice' | 'fillBlankData' | 'shortAnswer' | 'judgeChoice'

const generateNewOption = (questionDescription: string, content: string, index: number) => {
  const arr = questionDescription.split('<>')
  arr[index] = content
  return arr.join('<>')
}

const generateFillBankOption = (tempCount: number, curIndex: number, content: string, oldOption: string) => {
  const questionOption = '<>'.repeat(tempCount)
  const arr = questionOption.split('<>')
  const oldArr = oldOption.split('<>')
  for (let i = 0; i < arr.length; i++) {
    arr[i] = oldArr[i]
  }
  arr[curIndex] = content
  return arr.join('<>')
}

/* 处理试题表单校验 */
const handleFormDataIsValid = (question: IQuestionType) => {
  /* 检测表单选项进行提示 */
  const { isError, message: msg } = isCouldSaveQuestion(question)
  return { isError, msg }
}

export const questionTypeReducer = produce(
  (draftState: IQuestionTypeInitialState<IQuestionType>, action: IQuestionTypeAction) => {
    const keys = Object.keys(draftState)
    switch (action.type) {
      /* 删除题目 */
      case 'deleteQuestion':
        for (const typeQuestion of keys) {
          draftState[typeQuestion as questionType].list.forEach((q, index) => {
            if (q.questionId === action.id) {
              draftState[typeQuestion as questionType].list.splice(index, 1)
            }
          })
        }
        break
      /* 编辑题目 */
      case 'editQuestion':
        for (const typeQuestion of keys) {
          draftState[typeQuestion as questionType].list.forEach((q: any) => {
            if (q.questionId === action.payload.id) {
              if (action.isFillBank && (action.payload.index || action.payload.index === 0)) {
                q[action.payload.target] = generateFillBankOption(
                  action.tempNum!,
                  action.payload.index,
                  action.payload.content as string,
                  q.questionOption
                )
              } else if (action.payload.index || action.payload.index === 0) {
                q[action.payload.target] = generateNewOption(
                  q.questionOption,
                  action.payload.content as string,
                  action.payload.index
                )
              } else {
                q[action.payload.target] = action.payload.content as any
              }
            }
          })
        }
        break
      /* 增加题目 */
      case 'addFillBlank':
      case 'addJudge':
      case 'addMultiple':
      case 'addShortAnswer':
      case 'addSingle':
        const addActionMap = {
          addSingle: 'singleChoice',
          addMultiple: 'multipleChoice',
          addFillBlank: 'fillBlankData',
          addShortAnswer: 'shortAnswer',
          addJudge: 'judgeChoice'
        } as const
        draftState[addActionMap[action.type]].list.push(action.payload)
        break

      /* 保存题目 */
      case 'saveQuestion':
        for (const typeQuestion of keys) {
          draftState[typeQuestion as questionType].list.forEach((q: any, index) => {
            if (q.questionId === action.id) {
              const { isError, msg } = handleFormDataIsValid(q)
              if (!isError) {
                action.setEditQuestion(original(q))
                // action.setModalOpen(true)
              } else {
                message.warning(msg, 0.5)
              }
            }
          })
        }
        break
      /* 保存题目 id 和 状态 */
      case 'saveQuestionState':
        for (const typeQuestion of keys) {
          draftState[typeQuestion as questionType].list.forEach((q) => {
            if (q.questionId === action.oldId) {
              q.isStore = true
              q.questionId = action.id
            }
          })
        }
        break

      default:
        break
    }
  }
)
