import { GlobalMessage } from 'publicComponents/GlobalMessage'
import React, { useCallback, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ICourseTimeReducerAction } from 'reducer/ChaperStudyTree/type/type'
import { useAddContentResource } from 'server/fetch3rd/fetchChapter'
import { useUploadVideo } from 'server/fetchResource'
import AliYunOSS from 'util/AliYunOSS'
import { createVideoAndOtherArr } from './util'

import AliyunUpload from 'AliyunUpload'
import { uploadProps } from './config'

interface IUploadClassTimeResource {
  dispatch: React.Dispatch<ICourseTimeReducerAction>
}

export const useUploadResource = (props: IUploadClassTimeResource) => {
  const { dispatch } = props
  const courseId: string = useParams().id!
  const [fileList, setFileList] = useState<any>([]) // 在章节部分上传资源时才用到
  const Uploadprops = uploadProps(fileList, setFileList)

  /* 添加资源抽屉开启和关闭 */
  const [openResourceDrawer, setOpenResourceDrawer] = useState(false)
  /*关联知识点*/
  const [relatePoints, setRelatePoints] = useState([])
  /* 进度条 */
  const [progress, setProgress] = useState(0)
  /* 上传状态文字 */
  const [statusText, setStatusText] = useState('')
  const videoId = useRef('')
  /*添加资源API*/
  const { mutateAsync: addContentResource, isSuccess } = useAddContentResource(courseId)
  const { mutateAsync: uploadVideo } = useUploadVideo()
  const [isVideoStart, setIsVideoStart] = useState(false)
  const [isOtherStart, setIsOtherStart] = useState(false)
  const [otherProgress, setOtherProgress] = useState(50)

  const finishUpload = async () => {
    setIsVideoStart(false)
    const data = await uploadVideo({ videoId: videoId.current, courseId, relatePoints })
    dispatch({ type: 'pushId', id: data.resourceId })
  }

  const errUpload = () => GlobalMessage('error', '视频文件上传错误')

  const uploader = new AliYunOSS(
    AliyunUpload,
    setProgress,
    finishUpload,
    setStatusText,
    errUpload,
    videoId,
    setIsVideoStart
  ).uploader

  /* 处理文件上传 */
  const handleUpload = async () => {
    const { videoProject, otherProject } = createVideoAndOtherArr(fileList)

    /* 视频文件上传 */
    videoProject.forEach((file: File) => {
      uploader.addFile(file)
    })
    uploader.startUpload()

    /* 非视频文件上传 */
    otherProject.map((file: any) => {
      const formData = new FormData()
      formData.append('file', file)
      setIsOtherStart(true)
      return addContentResource({ relatedPoints: relatePoints, courseId, file: formData }).then((data) => {
        dispatch({ type: 'pushId', id: data.resourceId })
      })
    })

    /* 并发上传 */
    await Promise.all(otherProject)
      .then(() => {
        setOtherProgress(100)
        setTimeout(() => setIsOtherStart(false), 500)
        dispatch({
          type: 'setFileList',
          fileObj: <T>(pre: T[]) => {
            pre = pre.concat(fileList)
            return pre
          }
        })
      })
      .catch(() => {
        GlobalMessage('error', '上传非视频文件出现错误')
      })
      .finally(() => {
        setFileList([])
      })
  }

  /* 选择树来触发 */
  const handleRelateCheck = useCallback((checkInfo: any) => {
    const { checked } = checkInfo
    setRelatePoints(checked)
  }, [])

  const onCloseResourceDrawer = () => {
    setOpenResourceDrawer(false)
    dispatch({ type: 'setModalState', open: true })
    setRelatePoints([])
  }

  const onOpenResourceDrawer = () => {
    setOpenResourceDrawer(true)
    dispatch({ type: 'setModalState', open: false })
    setFileList([])
  }

  return {
    handleUpload,
    openResourceDrawer,
    onCloseResourceDrawer,
    relatePoints,
    handleRelateCheck,
    progress,
    statusText,
    isSuccess,
    isVideoStart,
    isOtherStart,
    otherProgress,
    setRelatePoints,
    Uploadprops,
    onOpenResourceDrawer
  }
}
