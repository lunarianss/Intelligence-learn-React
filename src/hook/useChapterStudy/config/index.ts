import { UploadProps } from 'antd/es/upload/interface'
import { GlobalMessage } from 'publicComponents/GlobalMessage'
import { ChapterInitNode, ClassTimeInitNode } from '../type'

export const ChapterNode: ChapterInitNode = {
  id: Math.random() * 1000 + Math.random() * 10 + '',
  name: '新建节点',
  chapterOrder: 1,
  courTimes: [],
  childChapters: [],
  pid: ''
}
export const ClassTimeNode: ClassTimeInitNode = {
  classTimeId: Math.random() * 1000 + Math.random() * 10 + '',
  name: '新建节点',
  resource: [],
  paperName: '',
  paperId: '',
  chapterId: ''
}
export const SupportType = ['ppt', 'jpg', 'pdf', 'mp4', 'img', 'png', 'mp3', '.md']

export const uploadProps = (fileList: any, setFileList: any): UploadProps => {
  return {
    onRemove: (file: any) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file: File) => {
      if (fileList.length >= 5) {
        GlobalMessage('warning', '一个课时最大只能上传5个文件')
        return false
      }

      const type = file.name.slice(file.name.length - 3)
      if (!SupportType.includes(type)) {
        GlobalMessage('info', '仅支持 ppt  img  png  mp4  mp3  .md结尾的文件')
        return false
      }

      setFileList((pre: File[]) => {
        const isFind = pre.find((preFile) => {
          return file.name === preFile.name
        })
        if (isFind) {
          GlobalMessage('info', '不可以重复上传')
        } else {
          pre = pre.concat(file)
        }
        return pre
      })

      return false
    },
    fileList
  }
}
