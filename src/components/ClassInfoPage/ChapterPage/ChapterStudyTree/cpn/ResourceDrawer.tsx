import { UploadOutlined } from '@ant-design/icons'
import { Button, Drawer, Progress, Upload } from 'antd'
import { TreeSelected } from 'components/ClassInfoPage/KnowledgePage/KnowledgeTree/cpn/TreeSelected'
import { PrimaryButton } from 'publicComponents/Button'
import { GlobalLabel } from 'publicComponents/GlobalLabel/globalLabel'
import { GlobalMessage } from 'publicComponents/GlobalMessage'
import React, { useState } from 'react'
import { RelatePointsWrapper, UploadWrapper } from './ChapterTreeModal'

type uploadStatus = {
  isStart: boolean
  text: string
  progress: number
}

export const ResourceDrawer: React.FC<{
  open: boolean
  close: () => void
  videoStatus: uploadStatus
  otherStatus: uploadStatus
  checkTreeData: any
  relateKeys: any
  handleRelateExpand: any
  handleRelateCheck: (checkInfo: any) => void
  relatePoints: any
  Uploadprops: any
  handleUpload: any
}> = ({
  open,
  close,
  videoStatus,
  otherStatus,
  checkTreeData,
  relateKeys,
  relatePoints,
  handleRelateCheck,
  handleRelateExpand,
  handleUpload,
  Uploadprops
}) => {
  const [fileList, setFileList] = useState<any>([])
  return (
    <div>
      <Drawer title="添加资源并且关联知识点" open={open} mask={false} width="100vw" onClose={close} closable={true}>
        <div style={{ width: '800px', margin: '0 auto' }}>
          <UploadWrapper style={{ textAlign: 'center', maxHeight: '200px' }}>
            <Upload {...Uploadprops} className={'upload'}>
              <Button icon={<UploadOutlined />}>请选择上传文件</Button>
            </Upload>
          </UploadWrapper>

          {videoStatus.isStart && (
            <div>
              <Progress percent={videoStatus.progress} />
              <span>视频 {videoStatus.text}</span>
            </div>
          )}
          {otherStatus.isStart && (
            <div>
              <Progress percent={otherStatus.progress} />
              {`非视频文件${otherStatus.progress === 50 ? '正在上传' : '上传完毕！'}`}
            </div>
          )}
          <RelatePointsWrapper>
            <GlobalLabel>关联知识点</GlobalLabel>
            <TreeSelected
              checkTreeData={checkTreeData}
              relateKeys={relateKeys}
              handleRelateExpand={handleRelateExpand}
              handleRelateCheck={handleRelateCheck}
              curCheckId={relatePoints}
            />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} key={'submit'}>
              <PrimaryButton
                title={'完成'}
                handleClick={async () => {
                  await handleUpload()
                  setTimeout(() => {
                    close()
                  }, 1000)
                  GlobalMessage('success', '资源上传成功！👋👋')
                }}
              />
            </div>
          </RelatePointsWrapper>
        </div>
      </Drawer>
    </div>
  )
}
