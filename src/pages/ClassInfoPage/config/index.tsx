import {
  BellOutlined,
  CopyOutlined,
  FolderOutlined,
  FundProjectionScreenOutlined,
  GoldOutlined,
  NotificationOutlined,
  ProfileOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?:string
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

const ClassInfoNavItems: MenuItem[] = [
  getItem(<Link to={'class'}>班级管理</Link>, '1', <ProfileOutlined />),
  getItem(<Link to={'chapter'}>章节学习</Link>, '2', <FundProjectionScreenOutlined />),
  getItem(<Link to={'exam'}>课程考试</Link>, '3', <BellOutlined />),
  getItem(<Link to={'resource'}>课程资源</Link>, '4', <FolderOutlined />),
  getItem(<Link to={'discuss'}>课程讨论</Link>, '5', <NotificationOutlined />),
  getItem(<Link to={'questionbank'}>题库管理</Link>, '6', <CopyOutlined />),
  getItem(<Link to={'knowledge'}>知识点</Link>, '7', <GoldOutlined />)
]
export default ClassInfoNavItems
