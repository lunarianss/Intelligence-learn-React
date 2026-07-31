import styled from 'styled-components'
export const ContentWapper = styled.div`
  /* padding: 0 30px; */
  width: 99%;
  height: 99%;
  overflow: hidden;
  @keyframes jump {
    0% {
      padding-top: 0;
    }
    100% {
      padding-top: 0.9rem;
    }
  }
`

export const DashbroadWapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  .processWapper {
    display: flex;
    margin: 20px;
    box-sizing: content-box;
    align-items: center;
    justify-content: center;
    .text {
      cursor: pointer;
      font-size: 3rem;
      line-height: 3.5rem;
      transform: translateY(25px);
      .jumpIcon {
        transition: all 0.3s;
      }
      &:hover .jumpIcon {
        padding-top: 0.9rem;
      }
    }
  }
`
export const ActionWapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  .action {
    cursor: pointer;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #555;
    font-size: 50px;
    overflow: hidden;
    height: 20%;
    margin: 2%;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    transition: all 0.4s;
    &:hover {
      transform: scale(1.05);
    }
  }
`

export const TableWapper = styled.div`
  padding-left: 30px;
  height: 100%;
  overflow: scroll;
  .back {
    cursor: pointer;
    height: 1.1rem;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    transition: all 0.1s ease-in-out;
    &:hover {
      height: 1.5rem;
      animation: 0.5s jump ease-in infinite alternate;
    }
  }
`
