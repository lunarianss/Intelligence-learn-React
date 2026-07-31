import { Drawer } from 'antd'
import SourcePdfPreview from 'pages/TeacherSourcePreviewPage/cpn-page/SourcePreviewPage/SourcePdfPreview'
import SourceVideoPreview from 'pages/TeacherSourcePreviewPage/cpn-page/SourcePreviewPage/SourceVideoPreview'
import { FC } from 'react'
import styled from 'styled-components'

export const PreviewDrawer: FC<{
  open: boolean
  close: () => void
  showType: 'img' | 'video' | 'pdf'
  url: string
}> = ({ open, close, showType, url }) => {
  return (
    <Drawer closable={true} width="100vw" open={open} onClose={close}>
      <Wapper>
        {showType == 'img' ? (
          <img src={url} style={{ maxHeight: '90vh', maxWidth: '90vw' }}></img>
        ) : showType == 'video' ? (
          <SourceVideoPreview resURL={url} />
        ) : showType == 'pdf' ? (
          <SourcePdfPreview resURL={url} />
        ) : (
          <></>
        )}
      </Wapper>
    </Drawer>
  )
}

const Wapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
