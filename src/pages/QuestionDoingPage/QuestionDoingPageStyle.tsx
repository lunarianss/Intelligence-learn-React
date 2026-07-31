import styled from 'styled-components'
export const QuestionDoingPageWrapper = styled.div`
  margin-right: auto;
  margin-left: auto;
  margin-top: 10vh;
  width: 40vw;
  border-radius: 5px;
  position: relative;
  padding: 30px;
  animation: 0.7s fadeleft ease forwards;
  /* border-top: 3px solid var(--border); */
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`
export const BackButton = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  button {
    display: flex;
    height: 2em;
    width: 70px;
    align-items: center;
    justify-content: center;
    background-color: #eeeeee4b;
    border-radius: 5%;
    letter-spacing: 1px;
    transition: all 0.2s linear;
    cursor: pointer;
    border: none;
    background: #fff;
    margin-right: 5x;
  }

  button > svg {
    margin-right: 5px;
    margin-left: 5px;
    font-size: 20px;
    transition: all 0.4s ease-in;
  }

  button:hover > svg {
    font-size: 1.2em;
    transform: translateX(-5px);
  }

  button:hover {
    box-shadow: 9px 9px 33px #d1d1d1, -9px -9px 33px #ffffff;
    transform: translateY(-2px);
  }
`
