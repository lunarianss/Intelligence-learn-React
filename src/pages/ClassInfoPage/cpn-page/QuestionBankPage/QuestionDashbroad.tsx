import { CaretDownOutlined, OrderedListOutlined, SnippetsOutlined, ZoomInOutlined } from '@ant-design/icons'
import { Progress } from 'antd'
import React from 'react'
import { ActionWapper, DashbroadWapper } from './QuestionBankPageStyle'

export const QuestionDashbroad: React.FC<{
  TargetRef: React.MutableRefObject<HTMLDivElement | null>
  move: () => any
  selectPoint: () => any
}> = ({ TargetRef, move, selectPoint }) => {
  return (
    <DashbroadWapper ref={TargetRef}>
      <div className="processWapper" onClick={move}>
        <Progress
          percent={60}
          strokeColor={'#52c01a'}
          success={{ percent: 2, strokeColor: 'red' }}
          strokeWidth={20}
          width={440}
          type="circle"
          strokeLinecap="butt"
          format={(precent, successPercent) => (
            <div className="text">
              已完成{precent}题<br />
              错误{successPercent}题<br />
              <CaretDownOutlined className="jumpIcon" />
            </div>
          )}
        />
      </div>
      <ActionWapper>
        <div className="action">
          <SnippetsOutlined /> &nbsp; 重练错题
        </div>
        <div className="action" onClick={selectPoint}>
          <ZoomInOutlined />
          &nbsp; 智能推荐
        </div>
        <div className="action" onClick={move}>
          <OrderedListOutlined />
          &nbsp; 顺序刷题
        </div>
      </ActionWapper>
    </DashbroadWapper>
  )
}
