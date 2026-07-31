import { Skeleton } from 'antd'
import styled from 'styled-components'

const Skeletons = (props: {
  size: 'middle' | 'small' | 'large'
  width?: string
  height?: string
  absolute?: boolean
}) => {
  const len = props.size === 'middle' ? 1 : 2

  return (
    <div
      style={
        props.absolute
          ? { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }
          : { opacity: 1 }
      }
    >
      <SkeletonWrapper>
        {Array.from({ length: len }).map((_, i) => {
          return (
            <Skeleton
              active={true}
              round={true}
              key={i}
              paragraph={{ rows: props.size === 'middle' ? 13 : props.size === 'large' ? 15 : 5 }}
              style={{
                width: props.size === 'small' ? '400px' : '600px',
                marginTop: '50px',
                padding: '40px'
              }}
            />
          )
        })}
      </SkeletonWrapper>
    </div>
  )
}

const SkeletonWrapper = styled.div`
  position: relative;
  left: 70px;
  display: flex;
  top: 70px;
`
export default Skeletons
