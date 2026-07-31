import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { BaseSpin } from 'baseUI/BaseSpin/BaseSpin'
import { FC, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import styled from 'styled-components'
import { useGetResourceById } from './util'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const SourcePdfPreview: FC<{
  resURL?: string
}> = ({ resURL }) => {
  const { data } = useGetResourceById()
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: any }) => {
    setNumPages(numPages)
  }
  const nextPage = () => {
    if (numPages == pageNumber) return
    setPageNumber((pre: number) => (pre += 1))
  }
  const lastPage = () => {
    if (pageNumber === 1) return
    setPageNumber((pre: number) => (pre -= 1))
  }

  return (
    <PdfViewWrapper style={{ width: '943px', position: 'relative', minHeight: '380px' }}>
      <Document
        loading={<BaseSpin size={'large'} title={'加载中'} />}
        file={resURL || (data && data.resourceLink)} // 前者在资源页面传入，后者在路由中获取
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page
          pageNumber={pageNumber}
          loading={<BaseSpin title={''} style={{ position: 'absolute', top: '300px' }} />}
        />
      </Document>
      <PdfControl>
        <LeftChangeWrapper>
          <Tooltip title={pageNumber == 1 ? '已是第一页' : '上一页'}>
            <LeftOutlined onClick={lastPage} style={{ width: '100%', height: '100%', lineHeight: '44px' }} />
          </Tooltip>
        </LeftChangeWrapper>
        <PdfNums>
          {pageNumber} /{numPages}页
        </PdfNums>
        <RightChangeWrapper>
          <Tooltip title={pageNumber == numPages ? '已是最后一页' : '下一页'}>
            <RightOutlined onClick={nextPage} style={{ width: '100%', height: '100%', lineHeight: '44px' }} />
          </Tooltip>
        </RightChangeWrapper>
      </PdfControl>
    </PdfViewWrapper>
  )
}
const PdfViewWrapper = styled.div`
  line-height: 44px;
  text-align: center;
  width: 44px;
  position: relative;
`
const PdfControl = styled.div`
  position: absolute;
  top: 614px;
  left: 404px;
  width: 150px;
  height: 44px;
  display: flex;
  background-color: #f5f2f0;
  border-radius: 12px;
  overflow: hidden;
`
const changeStyle = styled.div`
  transition: background-color 0.5s;
  margin: 0 auto;
  width: 44px;

  &:hover {
    background-color: #e6e6e6;
  }
`
const RightChangeWrapper = styled(changeStyle)``
const LeftChangeWrapper = styled(changeStyle)``
const PdfNums = styled.div`
  flex: 1;
  margin: 0 auto;
`

export default SourcePdfPreview
