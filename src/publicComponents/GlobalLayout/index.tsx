import { Avatar } from 'antd'
import AvatarPic from 'assets/img/avatar.jpg'
import classPic from 'assets/img/class.jpg'
import { BaseSpin } from 'baseUI/BaseSpin/BaseSpin'
import { IClassInfo } from 'context/ClassInfoContext'
import { IUserInfo, useUserInfo } from 'context/UserInfoContext'
import { GlobalHeader } from 'publicComponents/GlobalHeader'
import { GlobalNav } from 'publicComponents/GlobalNav'
import Skeletons from 'publicComponents/Skeleton'
import { Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import {
  HomePageWrapper,
  LeftLayoutWrapper,
  NavBottomWrapper,
  NavWrapper,
  RightLayoutRouteWrapper,
  RightLayoutWrapper,
  UserAvatarWrapper
} from './style'
const protectClassInfoType = (data: IUserInfo | IClassInfo | null, name: 'home' | 'classInfo'): data is IUserInfo =>
  name === 'home'

const GlobalLayout = (props: {
  navItems: any
  routePage: any
  sliceCount: number
  createMapFunction: () => Map<string, string>
  layoutName: 'home' | 'classInfo'
  layoutData: IUserInfo | IClassInfo | null
}) => {
  const location = useLocation()

  const isGraph = location.pathname.slice(-5) === 'graph'
  const { layoutData, layoutName } = props
  const { showUserCard } = useUserInfo()
  return (
    <HomePageWrapper>
      <LeftLayoutWrapper>
        <NavBottomWrapper>
          {protectClassInfoType(layoutData, layoutName) ? ( // User
            <>
              <UserAvatarWrapper onClick={showUserCard!}>
                <Avatar src={layoutData?.headPortrait || AvatarPic} size="large" />
              </UserAvatarWrapper>
              <div className="nickname">{layoutData?.name || '正在加载中……'}</div>
              <div className="signature">
                <span>{layoutData?.personalSignature || 'Love Yourself'}</span>
              </div>
            </>
          ) : (
            // Course
            <>
              <div className="CourseImg">
                <img src={classPic} />
              </div>
              <div className="nickname">{layoutData?.courseName}</div>
              <div className="signature">
                <span>{layoutData?.courseDescribe || '该课程暂无描述'}</span>
              </div>
            </>
          )}
        </NavBottomWrapper>
        <NavWrapper>
          <GlobalNav
            items={props.navItems}
            sliceCount={props.sliceCount}
            createMapFunction={props.createMapFunction}
          ></GlobalNav>
        </NavWrapper>
      </LeftLayoutWrapper>
      <RightLayoutWrapper>
        {isGraph ? (
          <Suspense fallback={<BaseSpin size="large" />}>
            <RightLayoutRouteWrapper>{props.routePage}</RightLayoutRouteWrapper>
          </Suspense>
        ) : (
          <Suspense
            fallback={
              <>
                <GlobalHeader title="" transparent={true} />
                <Skeletons size="middle" />
              </>
            }
          >
            <RightLayoutRouteWrapper>{props.routePage}</RightLayoutRouteWrapper>
          </Suspense>
        )}
      </RightLayoutWrapper>
    </HomePageWrapper>
  )
}

export default GlobalLayout
