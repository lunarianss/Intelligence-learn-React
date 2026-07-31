import { IQuestionType } from 'reducer/CreateExamPaper/type/type'
import { OptionPreviewWrapper } from '../QuestionFooter'

interface SingleChoiceProps {
  question: IQuestionType
}

export const SingleChoicePreview = (props: SingleChoiceProps) => {
  const { question } = props
  return (
    <>
      {question.questionOption
        .split('<>')
        .map((optionContent, index) => {
          return {
            option: String.fromCharCode(index + 65),
            optionContent
          }
        })
        .map((option) => {
          const isRightAnswer = option.option === question.rightAnswer
          return (
            <div style={{ display: 'flex', marginBottom: '12px', alignItems: 'center' }} key={option.option}>
              <OptionPreviewWrapper
                style={{
                  color: isRightAnswer ? 'white' : 'black',
                  textAlign: 'center',
                  backgroundColor: isRightAnswer ? 'rgb(24, 144, 255)' : 'rgb(245, 245, 245)'
                }}
              >
                <span>{option.option}</span>
              </OptionPreviewWrapper>
              <span style={{ paddingLeft: '14px' }}>{option.optionContent}</span>
            </div>
          )
        })}
    </>
  )
}
