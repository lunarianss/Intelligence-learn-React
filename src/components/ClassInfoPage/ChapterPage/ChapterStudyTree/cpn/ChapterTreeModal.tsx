import { Button, Drawer, Input, List } from 'antd'
import { useClassTimeDispatch } from 'context/ChapterStudyTree/ClassTimeDispatchContext'
import { useUploadResource } from 'hook/useChapterStudy/useUploadResource'
import { GlobalLabel } from 'publicComponents/GlobalLabel/globalLabel'
import React from 'react'
import styled from 'styled-components'
import { ResourceDrawer } from './ResourceDrawer'

export const ChapterTreeModal: React.FC<{
  checkTreeData: any
  handleRelateCheck: any
  relateKeys: any
  handleRelateExpand: any
  handleOk: any
  addContentLoading: boolean
}> = ({ checkTreeData, handleRelateExpand, handleOk, relateKeys, addContentLoading }) => {
  /*ClassTime Reducer*/
  const { dispatch, classTimeState } = useClassTimeDispatch()

  /*上传资源，关联知识点*/
  const {
    handleUpload,
    openResourceDrawer,
    relatePoints,
    handleRelateCheck,
    progress,
    statusText,
    isVideoStart,
    isOtherStart,
    otherProgress,
    onCloseResourceDrawer,
    onOpenResourceDrawer,
    Uploadprops
  } = useUploadResource({ dispatch })
  /*Upload Props*/
  const onCloseClassTimeDrawer = () => {
    dispatch({ type: 'setModalState', open: false })
    dispatch({ type: 'setFileList', fileObj: () => [] })
    dispatch({ type: 'setName', name: '' })
  }

  return (
    <ChapterTreeModalWrapper>
      <Drawer
        title="添加课时"
        open={classTimeState?.courseTimeModalVisible}
        onClose={onCloseClassTimeDrawer}
        size={'large'}
        mask={false}
        width={'100vw'}
      >
        <div style={{ width: '800px', margin: '0 auto' }}>
          <GlobalLabel htmlFor={'addResource'}>课时名称</GlobalLabel>
          <Input
            placeholder={'请输入课时名称'}
            id={'addResource'}
            value={classTimeState.courseTimeName}
            onChange={(e) => dispatch({ type: 'setName', name: e.target.value })}
          />

          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
            <Button type="primary" onClick={onOpenResourceDrawer}>
              添加课时资源
            </Button>
          </div>

          <div>
            <GlobalLabel>已经上传的资源:</GlobalLabel>
            <List
              itemLayout="horizontal"
              dataSource={classTimeState.fileList}
              renderItem={(item: any) => <List.Item>{item.name}</List.Item>}
            />
          </div>
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
            <Button size={'large'} type={'primary'} onClick={handleOk} loading={addContentLoading}>
              完成
            </Button>
          </div>
        </div>
      </Drawer>

      <ResourceDrawer
        open={openResourceDrawer} // 打开状态
        close={onCloseResourceDrawer} //控制关闭
        videoStatus={{
          isStart: isVideoStart,
          progress: progress,
          text: statusText
        }}
        otherStatus={{
          isStart: isOtherStart,
          progress: otherProgress,
          text: statusText
        }}
        handleRelateCheck={handleRelateCheck}
        handleRelateExpand={handleRelateExpand}
        handleUpload={handleUpload}
        checkTreeData={checkTreeData}
        relateKeys={relateKeys}
        relatePoints={relatePoints}
        Uploadprops={Uploadprops}
      />
    </ChapterTreeModalWrapper>
  )
}

export const ChapterTreeModalWrapper = styled.div`
  position: relative;
`

export const UploadWrapper = styled.div`
  margin-bottom: 13px;
  display: flex;
  flex-flow: column nowrap;
`
export const RelatePointsWrapper = styled.div`
  margin-top: 20px;
  height: 300px;
  overflow: auto;
`
