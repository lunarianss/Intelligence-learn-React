import styled from 'styled-components'
export const CreateExamNavWrapper = styled.div`
  background-color: white;
  margin-top: 10px;
  width: 20%;
  overflow: auto;
  height: 99vh;
  border: 2px solid gery;
  border-radius: 5px;
  overflow-y: overlay;
  margin-bottom: 50px;
  animation: 0.7s fadeleft ease forwards;
  border-top: 3px solid var(--border);
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  .collapse {
    background-color: white;
    border-bottom: 1px solied rgb(238, 237, 237);
    width: 85%;
    margin: 10px auto;
  }
`
export const QuestionItemWrapper = styled.div`
  display: flex;
  &:hover {
    background-color: rgb(238, 237, 237);
    // cursor: pointer;
  }
`

export const DeleteButtonWrapper = styled.div`
  width: 25%;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
  .delete {
    display: block;
    color: grey;
    font-size: 15px;
    margin: auto;
    line-height: 32px;
    cursor: pointer;
  }
`
