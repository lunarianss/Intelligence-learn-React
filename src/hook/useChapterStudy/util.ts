/** 将文件数组分为视频文件数组和其他文件数组 */
export const createVideoAndOtherArr = (fileList: any[]) => {
  const { videoProject, otherProject } = fileList.reduce(
    (pre, cur) => {
      if (cur.type === 'video/mp4') {
        pre.videoProject.push(cur)
      } else {
        pre.otherProject.push(cur)
      }
      return pre
    },
    { videoProject: [], otherProject: [] }
  )
  return {
    videoProject,
    otherProject
  }
}
