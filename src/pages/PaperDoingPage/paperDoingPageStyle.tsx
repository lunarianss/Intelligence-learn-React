import styled from 'styled-components'
export const PaperDoingWrapper = styled.div`
  padding-top: 10px;
`
export const SiderWrapper = styled.div`
  .sider {
    position: 'sticky';
    top: 84;
    background-color: 'white';
    border: '1px solid';
    border-radius: 5;
    height: 600;
    width: 300;
  }
`

export const LeftExamWrapper = styled.div`
  width: 300px;
  background-color: #e2e8f0;
  padding: 15px;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 43px);
  .paperName {
    margin-bottom: 35px;
  }
`

export const CenterExamWrapper = styled.div`
  flex: 1;
  background-color: #3b82f6;
  overflow: auto;
  height: calc(100vh - 43px);
  background-color: #fff;
`

export const RightExamWrapper = styled.div`
  width: 280px;
  padding: 15px;
  .status-bar {
    display: flex;
    margin-bottom: 13px;
  }

  .already-answer {
    display: flex;
    align-items: center;
    margin-right: 30px;
    &::before {
      content: '';
      border-radius: 3px;
      display: inline-block;
      width: 20px;
      height: 20px;
      background-color: #0ea5e9;
      margin-right: 10px;
    }
  }

  .no-answer {
    display: flex;
    align-items: center;
    &::before {
      content: '';
      border-radius: 3px;
      display: inline-block;
      width: 20px;
      border: 1px solid #0284c7;
      height: 20px;
      background-color: #fff;
      margin-right: 10px;
    }
  }
`

export const LayoutWrapper = styled.div`
  display: flex;
`

export const CountDownWrapper = styled.div`
  background-color: #fff;
  width: 100%;
  color: #000;
  padding: 8px 25px;
  border-radius: 10px;
  font-size: 25px;

  .count-num {
    padding-left: 10px;
  }
`

export const InfoWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  background-color: #fff;
  width: 100%;
  color: rgba(0, 0, 0, 0.7);
  padding: 8px 25px;
  border-radius: 10px;
  .info-item:not(div:last-of-type) {
    margin-bottom: 13px;
  }
`
export const ExamWrapper = styled.div`
  position: relative;
  min-width: 1280px;
`

export const HeaderWrapper = styled.div`
  height: 43px;
  background-color: #475569;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: flex-end;
  .button-submit {
    height: 100%;
    width: 100px;
  }
`

export const QuestionBlock = styled.div<{ bg: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.bg ? '#fff' : '#0284c7')};
  cursor: pointer;
  border: 1px solid #0284c7;
  background-color: ${(props) => (props.bg ? '#0284c7' : undefined)};
`

export const QuestionTypeWrapperStatus = styled.div`
  padding: 10px;
`

export const QuestionStatusHeader = styled.div`
  display: flex;
  margin-bottom: 15px;
`
