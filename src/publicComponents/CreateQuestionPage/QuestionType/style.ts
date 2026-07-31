import styled from 'styled-components'

export const QuestionWapper = styled.div`
  font-size: 20px;
  vertical-align: text-bottom;
`

export const FooterWapper = styled.div`
  /* display: grid; */
  color: rgb(132, 132, 132);
  margin-top: 20px;
  div {
    margin: 10px;
    margin-left: 0px;
  }
  grid-template-areas:
    'E E E E E R'
    'E E E E E P';
  .d {
    grid-area: E;
  }
  .p {
    grid-area: P;
  }
  .r {
    grid-area: R;
  }
`
