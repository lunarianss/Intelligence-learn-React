import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGetResourceById } from './util'

import Aliplayer from 'Aliplayer'

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const AliYunPlayer = require('util/aliPlayer')

const SourceVideoPreview: FC<{
  resURL?: string
}> = ({ resURL }) => {
  const [resource] = useState<any>(null)
  // 如果resURL有传入，则不必调用此函数
  const { data } = useGetResourceById()
  useEffect(() => {
    console.log(data, 'data')
    if ((resURL || data) && Aliplayer) {
      new Aliplayer(
        {
          id: 'ali-player',
          width: '700px',
          height: '485px',
          autoplay: true,
          language: 'zh-cn',
          source: resURL || data!.resourceLink // 前者在资源页面传入，后者在路由中获取
        },
        function (player: any) {
          console.log(player, 'player')
        }
      )
    }
  }, [data, Aliplayer])

  return (
    <div>
      <ResourceTitle>{resource && resource.resourceName}</ResourceTitle>
      <div id={'ali-player'} style={{ width: '943px', minHeight: '70vh' }}></div>
    </div>
  )
}
const ResourceTitle = styled.div`
  font-size: 29px;
  margin-bottom: 12px;
`

export default SourceVideoPreview
