import styled from 'styled-components'

export const GlobalRightLayout = styled.div`
  padding: 30px;
  overflow-y: scroll;
  flex-grow: 1;
`

export const RightLayoutRouteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  // 加了这个，刷新的时候不会闪一下
  transform: translateX(-100vw);
  @keyframes slideInX {
    0% {
      transform: translateX(-100vw);
    }
    100% {
      transform: translateX(0);
    }
  }
  animation: 0.2s ease-out 0.3s slideInX forwards;
`

export const NavWrapper = styled.div`
  flex: 1;
`

export const NavBottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
`

export const HomePageWrapper = styled.div`
  margin: 0 auto;
  height: 100vh;
  width: 100vw;
  background-color: white;
  display: flex;
  justify-content: space-between;
  .CourseImg {
    width: 198px;
    display: flex;
    justify-content: center;
    img {
      width: 90%;
    }
  }
`

export const LeftLayoutWrapper = styled.div`
  padding-top: 30px;
  z-index: 1;
  backdrop-filter: blur(10px);
  @keyframes slideIn {
    0% {
      transform: translateY(-100vh);
    }
    100% {
      transform: translateY(0);
    }
  }
  animation: 0.3s ease-in slideIn forwards;

  box-sizing: border-box;
  ::-webkit-scrollbar {
    width: 0;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  overflow: scroll;
  border-right: rgb(230, 230, 230) 2px solid;
  width: 200px;
  .signature {
    text-align: center;
    height: 40px;
    span {
      border-bottom: 2px solid black;
      padding-bottom: 8px;
    }
  }

  .nickname {
    text-align: center;
    width: 150px;
    margin: 10px 0;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 600;
    font-size: 15px;
    overflow: hidden;
    align-items: center;
    line-height: 28px;
    word-break: break-word;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .signature span {
    width: 150px;
    display: inline-block;
    word-break: break-word;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
export const RightLayoutWrapper = styled.div`
  flex: 1;
`

export const UserAvatarWrapper = styled.div`
  .ant-avatar {
    margin: 0 auto;
    transition: all 0.1s;
    &:hover {
      transform: scale(1.1) rotate(30deg);
    }
  }
  padding: 5px;
  border-radius: 50%;
  border: 3px solid rgb(230, 230, 230);
`
