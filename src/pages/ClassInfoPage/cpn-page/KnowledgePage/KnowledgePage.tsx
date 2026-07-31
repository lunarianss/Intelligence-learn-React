import { UploadOutlined } from '@ant-design/icons'
import { Button, Modal, Upload, UploadProps } from 'antd'
import { KnowledgeTree } from 'components/ClassInfoPage/KnowledgePage/KnowledgeTree/KnowledgeTree'
import { useKnowledgeUI } from 'hook/useKnowledge/useKnowledgeUI'
import { GlobalHeader } from 'publicComponents/GlobalHeader/index'
import { GlobalRightLayout } from 'publicComponents/GlobalLayout/style'
import { GlobalMessage } from 'publicComponents/GlobalMessage'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { importKnowledgePoints } from 'server/fetchKnowledge'
import styled from 'styled-components'
import { useComputedRoute } from 'util/computedRoute'
import { isTeachAuth } from 'util/isAuthTeach'

const KnowledgePage: React.FC = () => {
  const editable = isTeachAuth()
  const { knowledgeControl, treeData } = useKnowledgeUI(editable)
  const computedPath = useComputedRoute('knowledge')
  const [show, setShow] = useState(false)
  const [fileList, setFileList] = useState([])
  const classInfo = {
    courseId: useParams().id!
  }
  const importExcel = () => {
    setShow(true)
  }

  const uploadProps = (fileList: any, setFileList: any): UploadProps => {
    return {
      onRemove: (file: any) => {
        const index = fileList.indexOf(file)
        const newFileList = fileList.slice()
        newFileList.splice(index, 1)
        setFileList(newFileList)
      },

      beforeUpload: (file: File) => {
        if (fileList.length === 1) {
          GlobalMessage('warning', '最多导入1个 Excel')
          return false
        }

        setFileList((pre: File[]) => pre.concat(file))
        return false
      },
      fileList
    }
  }
  const { mutateAsync: uploadExcel, isLoading } = importKnowledgePoints(classInfo.courseId)

  const clickUpload = async () => {
    console.log('上传')
    if (fileList.length === 0) {
      GlobalMessage('success', '请先上传知识点模板')
    }
    const formData = new FormData()
    formData.append('excelFile', fileList[0])
    console.log(fileList, formData, 'fileList')
    try {
      await uploadExcel(formData)
      setFileList([])
    } catch {}
  }

  return (
    <KnowledgePageWrapper>
      <Modal open={show} title="导入excel" onCancel={() => setShow(false)} onOk={() => setShow(false)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Upload {...uploadProps(fileList, setFileList)}>
            <div>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </div>
          </Upload>
          <Button type="primary" style={{ marginTop: '32px' }} loading={isLoading} onClick={clickUpload}>
            点击上传
          </Button>
        </div>
      </Modal>
      <GlobalHeader
        title="课程知识点"
        tool={
          editable ? (
            <>
              <a className={'add-knowledge'} onClick={knowledgeControl.addKnowledgePoint}>
                添加知识点
              </a>
              <Button className="excel-button" onClick={importExcel}>
                导入excel
              </Button>
              <Link to={`${computedPath}k-graph`}>
                <span className={'k-graph'}>课程知识图谱</span>
              </Link>
            </>
          ) : (
            <Link to={`${computedPath}mk-graph`}>
              <span className={'mk-graph'}>个人知识图谱</span>
            </Link>
          )
        }
      ></GlobalHeader>
      <GlobalRightLayout>
        <KnowledgeTree treeData={treeData} knowledgeControl={knowledgeControl} />
      </GlobalRightLayout>
    </KnowledgePageWrapper>
  )
}
const KnowledgePageWrapper = styled.div`
  .excel-button {
    margin-right: 20px;
  }

  a.add-knowledge {
    display: inline-block;
    width: 120px;
    height: 36px;
    box-shadow: 0 3px 8px 0 rgb(58 107 255 / 33%);
    border-radius: 13px;
    text-align: center;
    color: white;
    font-size: 14px;
    line-height: 36px;
    background: linear-gradient(140deg, #6cc7ff 0%, #5a33ff 100%);
    margin-right: 20px;

    &:hover {
      background: linear-gradient(140deg, #89d9ff 0%, #6c4aff 100%);
    }
  }

  span.k-graph,
  span.mk-graph {
    display: inline-block;
    padding: 0 16px;
    width: 130px;
    height: 36px;
    line-height: 36px;
    border: solid #94c1ff 1px;
    font-size: 14px;
    color: #3a8bff;
    font-weight: 500;
    border-radius: 20px;
    text-align: center;
    transition: 0.5s background-color ease;

    &:hover {
      background: #eaf0ff;
    }
  }

  span.mk-graph {
    margin-left: 8px;
  }
`

export default KnowledgePage
