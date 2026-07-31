import 'lib/aliyun-upload-sdk/aliyun-upload-sdk-1.5.4.min'
import { MutableRefObject } from 'react'
import { client } from 'server'
import { StateSetter } from '../types'

interface IUploadInfo {
  videoId?: string // videoId，由服务端返回的音/视频ID
  endpoint: string // OSS对外服务的访问域名
  bucket: string // OSS存储空间
  object: string // OSS存储数据的基本单元
  file: File
}

class AliYunOSS {
  OSS: any
  videoId: MutableRefObject<string>
  setProgress: StateSetter<number>
  endUpload: (file: IUploadInfo) => void
  setStatusText: StateSetter<string>
  setStart: StateSetter<boolean>
  errUpload: (err: string) => void
  timeout = 60000
  partSize = 1048576
  parallel = 5
  retryCount = 3
  retryDuration = 2
  region = 'cn-shanghai'
  userId = '279346877251780943'
  file = null
  authProgress = 0
  uploadDisabled = true
  resumeDisabled = true
  pauseDisabled = true
  statusText = ''

  constructor(
    oss: any,
    setProgress: StateSetter<number>,
    endUpload: () => void,
    setStatusText: StateSetter<string>,
    errUpload: () => void,
    videoId: MutableRefObject<string>,
    setStart: StateSetter<boolean>
  ) {
    this.OSS = oss
    this.setProgress = setProgress
    this.endUpload = endUpload
    this.setStatusText = setStatusText
    this.errUpload = errUpload
    this.videoId = videoId
    this.setStart = setStart
  }

  get uploader() {
    return this.createUpLoader()
  }

  private createUpLoader() {
    const AliYunUpload = this.OSS
    console.log(this.OSS, 'OSS')
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this
    const uploader = new AliYunUpload.Vod({
      timeout: this.timeout,
      partSize: Math.round(this.partSize),
      parallel: this.parallel,
      retryCount: this.retryCount,
      retryDuration: this.retryDuration,
      region: this.region,
      userId: this.userId,

      addFileSuccess: function (uploadInfo: IUploadInfo) {
        _this.uploadDisabled = false
        _this.resumeDisabled = false
        _this.statusText = '添加文件成功, 等待上传...'
        console.log('addFileSuccess: ' + uploadInfo.file.name)
      },

      onUploadstarted: function (uploadInfo: IUploadInfo) {
        if (!uploadInfo.videoId) {
          client
            .get({
              url: '/resources/upload-video-auth',
              params: { originName: uploadInfo.file.name }
            })
            .then((data) => {
              const uploadAuth = data.uploadAuth
              const uploadAddress = data.uploadAddress
              const videoId = data.videoId
              _this.videoId.current = videoId
              _this.setStart(true)
              uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
            })
          _this.statusText = '文件开始上传...'

          console.log(
            'onUploadStarted:' +
              uploadInfo.file.name +
              ', endpoint:' +
              uploadInfo.endpoint +
              ', bucket:' +
              uploadInfo.bucket +
              ', object:' +
              uploadInfo.object
          )
        } else {
          client.get({ url: '/resources/refresh-video-auth', params: { videoId: uploadInfo.videoId } }).then((data) => {
            console.log(data, 'dataServer')
            const uploadAuth = data.uploadAuth
            const uploadAddress = data.uploadAddress
            const videoId = data.videoId
            _this.videoId.current = videoId
            _this.setStart(true)
            uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
          })
        }
      },

      // 文件上传成功
      onUploadSucceed: function (uploadInfo: IUploadInfo) {
        _this.statusText = '文件上传成功!'
        _this.setStatusText(_this.statusText)
      },

      // 文件上传失败
      onUploadFailed: function (uploadInfo: IUploadInfo, code: number, message: string) {
        _this.statusText = '文件上传失败!'
        _this.setStatusText(_this.statusText)
        _this.errUpload(message)
      },

      // 取消文件上传
      onUploadCanceled: function (uploadInfo: IUploadInfo, code: number, message: string) {
        console.log('Canceled file: ' + uploadInfo.file.name + ', code: ' + code + ', message:' + message)
        _this.statusText = '文件已暂停上传'
        _this.setStatusText(_this.statusText)
      },

      // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
      onUploadProgress: function (uploadInfo: IUploadInfo, totalSize: number, progress: number) {
        console.log(
          'onUploadProgress:file:' +
            uploadInfo.file.name +
            ', fileSize:' +
            totalSize +
            ', percent:' +
            Math.ceil(progress * 100) +
            '%'
        )
        _this.setProgress(Math.ceil(progress * 100))
        _this.authProgress = Math.ceil(progress * 100)
        _this.statusText = '文件上传中...'
        _this.setStatusText(_this.statusText)
      },

      // 上传凭证超时
      onUploadTokenExpired: function (uploadInfo: IUploadInfo) {
        // 上传大文件超时, 如果是上传方式一即根据 UploadAuth 上传时
        // 需要根据 uploadInfo.videoId 调用刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)重新获取 UploadAuth
        // 然后调用 resumeUploadWithAuth 方法, 这里是测试接口, 所以我直接获取了 UploadAuth
        const refreshUrl =
          'https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/RefreshUploadVideo?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&Title=haha1&FileName=xxx.mp4&VideoId=' +
          uploadInfo.videoId
        client.get({ url: refreshUrl }).then(({ data }) => {
          const uploadAuth = data.UploadAuth
          uploader.resumeUploadWithAuth(uploadAuth)
          console.log('upload expired and resume upload with uploadauth ' + uploadAuth)
        })
        _this.statusText = '文件超时...'
        _this.setStatusText(_this.statusText)
      },

      // 全部文件上传结束
      onUploadEnd: function (uploadInfo: IUploadInfo) {
        _this.statusText = '文件上传完毕'
        _this.setStatusText(_this.statusText)
        _this.endUpload(uploadInfo)
      }
    })
    return uploader
  }
}

export default AliYunOSS
