import styled from 'styled-components'

export const LearnRoutePageWrapper = styled.div``

export const ModalContextWrapper = styled.div`
  .classname-label {
    color: #cfd2cf;
    letter-spacing: 2px;
    font-size: 13px;
  }
`

export const CardWrapper = styled.div`
  width: 200px;
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  color: var(--navy);
  height: 250px;
  margin: auto;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  transition: transform 300ms;
  &:hover {
    transform: translateY(-6px);
  }
  .magBtn {
    position: absolute;
    z-index: 100;
    color: #fff;
    right: 10px;
    font-size: 20px;
  }
  &::after {
    filter: blur(10px);
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    background-color: #eee;
    opacity: 0.5;
    width: 50px;
    height: 1000px;
    transform: rotate(45deg) translateY(-400px) translateX(-300px);
    @keyframes high-light {
      0% {
        transform: rotate(45deg) translateY(-400px) translateX(-400px);
      }
      100% {
        transform: rotate(45deg) translateY(-400px) translateX(0px);
      }
    }
    animation: 1s high-light linear forwards;
  }
`
export const CardHeadWrapper = styled.div`
  height: 150px;
  margin: 0 auto;
  overflow: hidden;

  img {
    width: 100%;
    display: inline-block;
    height: 100%;
    transition: transform 500ms;
    &:hover {
      transform: scale(1.2);
    }
  }
`
export const CardBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-top: 10px;
  .ant-btn-primary {
    height: 30px;
    border-color: transparent;
  }
  .tname {
    font-size: 14px;
    margin-bottom: 5px;
  }
`
