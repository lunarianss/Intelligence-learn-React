import GlobalLayout from 'publicComponents/GlobalLayout'
import { useEffect, useMemo } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { createClassNavMap } from 'util/createNavMap'
import { isTeachAuth } from 'util/isAuthTeach'
import { useCurrentClassInfo } from '../../context/ClassInfoContext'
import ClassInfoNavItems from './config'

const ClassInfoPage = () => {
  const { classInfo, getCurCourseInfo } = useCurrentClassInfo()
  const params = useParams()

  useEffect(() => {
    getCurCourseInfo(params.id!)
  }, [])

  const sliceCount = useMemo(() => {
    if (params) {
      return params.identify!.length + params.id!.length + 12
    }
  }, [params])

  return (
    <GlobalLayout
      layoutName={'classInfo'}
      layoutData={classInfo}
      navItems={isTeachAuth() ? ClassInfoNavItems : ClassInfoNavItems.slice(1)}
      routePage={<Outlet />}
      sliceCount={sliceCount as number}
      createMapFunction={createClassNavMap}
    />
  )
}

export default ClassInfoPage
