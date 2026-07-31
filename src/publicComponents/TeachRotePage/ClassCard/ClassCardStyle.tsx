import styled from 'styled-components'
export const CardWrapper = styled.div`
  width: 200px;
  overflow: hidden;
  border-radius: 14px;
  color: var(--navy);
  height: 250px;
  margin-right: 40px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  transition: transform 300ms;
  &:hover {
    transform: translateY(-6px);
  }

  .magBtn {
    font-weight: bold;
    font-size: 0.5rem;
    position: absolute;
    top: 20px;
    right: -35px;
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
