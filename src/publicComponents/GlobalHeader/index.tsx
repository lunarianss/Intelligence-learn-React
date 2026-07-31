import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

interface GlobalHeaderProps {
  title: string
  tool?: JSX.Element | boolean
  transparent?: boolean
}

export const GlobalHeader = (props: GlobalHeaderProps) => {
  const prefix = useParams()
  const navigate = useNavigate()
  return (
    <RightLayoutHeaderWrapper>
      {!props.transparent && (
        <>
          <Breadcrumb separator="/">
            <Breadcrumb.Item onClick={() => navigate('/home/teach')}>
              <HomeOutlined className="cursor" />
            </Breadcrumb.Item>
            {prefix.identify ? (
              prefix.identify == 'MyTeach' ? (
                <Breadcrumb.Item onClick={() => navigate('/home/teach')}> 我教的课 </Breadcrumb.Item>
              ) : (
                <Breadcrumb.Item onClick={() => navigate('/home/learn')}> 我学的课 </Breadcrumb.Item>
              )
            ) : (
              <></>
            )}
            <Breadcrumb.Item>
              <b>{props.title}</b>
            </Breadcrumb.Item>
          </Breadcrumb>
          <HeaderToolWrapper>{props?.tool}</HeaderToolWrapper>
        </>
      )}
    </RightLayoutHeaderWrapper>
  )
}

const RightLayoutHeaderWrapper = styled.div`
  .cursor {
    cursor: pointer;
  }

  .ant-breadcrumb-link {
    cursor: pointer;
  }
  user-select: none;
  min-height: 60px;
  border-bottom: rgb(230, 230, 230) 2px solid;
  display: flex;
  padding: 0 30px;
  justify-content: space-between;
  align-items: center;
  z-index: 500;
  background-color: white;
`

const HeaderToolWrapper = styled.div`
  display: flex;
  align-items: center;
`
