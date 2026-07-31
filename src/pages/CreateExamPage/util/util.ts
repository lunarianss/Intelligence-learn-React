import { IQuestionType } from 'reducer/CreateExamPaper/type/type'
import { QuestionConstantString } from 'server/fetchExam/types'

/*生成随机的，和之前创建的不相等不相等的，范围是[0, maxNumber]的id*/
const generateDiffId = (set: Set<number>, maxNumber: number) => {
  const generate = () => Math.floor(Math.random() * maxNumber)
  let generateId = generate()
  while (set.has(generateId)) {
    generateId = generate()
  }
  set.add(generateId)
  return generateId + ''
}

/*创建试题对象*/
export const createQuestionObj = (type: QuestionConstantString, set: Set<number>, courseId: string): IQuestionType => {
  const resultObj: IQuestionType = {
    score: 5,
    questionId: generateDiffId(set, 1000),
    questionDescription: '',
    courseId,
    pointIds: [],
    isStore: false,
    questionOption: '',
    questionAnswerExplain: '',
    questionDifficulty: 0,
    questionType: type,
    rightAnswer: '',
    questionAnswerNum: 1
  }
  if (type === 0) resultObj.questionOption = '<><><>'
  else if (type === 1) resultObj.questionOption = '<><><><>'
  return resultObj
}
