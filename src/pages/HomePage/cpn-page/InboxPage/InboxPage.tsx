import {
  CommentOutlined,
  ContainerOutlined,
  HeartFilled,
  HeartOutlined,
  MailOutlined,
  TeamOutlined
} from '@ant-design/icons'
import { Badge, Button, List, Tabs, Typography } from 'antd'
import { GlobalHeader } from 'publicComponents/GlobalHeader/index'
import { GlobalRightLayout } from 'publicComponents/GlobalLayout/style'
import React, { useState } from 'react'
import { ContactModal } from './Contact/ContactModal'
import { ReadOnlyModal } from './Contact/ReadOnlyModal'

const { TabPane } = Tabs
const { Paragraph } = Typography

type msgItem = {
  tag: string
  from: string
  expire: number
  Readed: boolean
  isFavority: boolean
  msgID: number
  pre: string
  content: string
}

const InboxPage: React.FC = () => {
  const [chosen, setChosen] = useState<string>('All')
  const [showModal, setShowModal] = useState(false)
  const [Contact, setContact] = useState(false)

  const [onDisplayMsg, setOnDisplayMsg] = useState<msgItem>()
  const data: msgItem[] = [
    {
      tag: 'Notice',
      from: 'Teacher',
      expire: 1600000,
      Readed: false,
      isFavority: true,
      msgID: 1,
      pre: '发布了新作业。。',
      content: '老师发布了一则新作业，<a>前往完成</a>。'
    },
    {
      tag: 'Broadcast',
      from: 'UserID',
      expire: 1600000,
      Readed: false,
      isFavority: false,
      msgID: 2,
      pre: '关于校园十大歌手比赛。。',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, velit, temporibus quis sed magni dignissimos, eum deleniti quidem officiis commodi labore. Est minus, mollitia quas temporibus eius recusandae eos quo.'
    },
    {
      tag: 'Private',
      from: 'UserID2',
      expire: 1600000,
      Readed: false,
      isFavority: false,
      msgID: 4,
      pre: '最后一条新消息',
      content: '私信测试'
    }
  ]
  const [msgList, setMsgList] = useState<msgItem[]>(data)

  const readMsg = (item: msgItem) => {
    setOnDisplayMsg(item)
    item.tag == 'Private' ? setContact(true) : setShowModal(true)
    item.Readed = true
    setMsgList(msgList.filter(() => true))
  }
  const favMsg = (e: any, item: msgItem) => {
    e.stopPropagation()
    item.isFavority = !item.isFavority
    setMsgList(msgList.filter(() => true))
  }

  const showBadge = (tag: string) => {
    let show = false
    msgList
      .filter((item) => (tag == 'All' ? true : item.tag == tag))
      .forEach((i) => {
        if (!i.Readed) show = true
      })
    return show
  }

  const tabConfig = [
    { name: '全部消息', tag: 'All', icon: <MailOutlined /> },
    { name: '我的私信', tag: 'Private', icon: <MailOutlined /> },
    { name: '课程通知', tag: 'Notice', icon: <CommentOutlined /> },
    { name: '推广信息', tag: 'Broadcast', icon: <ContainerOutlined /> },
    { name: '收藏待办', tag: 'Favority', icon: <HeartOutlined /> }
  ]

  return (
    <>
      <GlobalHeader
        title="消息通知"
        tool={
          <Tabs activeKey={chosen} centered onChange={(key) => setChosen(key)}>
            {tabConfig.map((i) => (
              <TabPane
                tab={
                  <Badge dot={showBadge(i.tag)}>
                    {i.icon} {i.name}
                  </Badge>
                }
                key={i.tag}
              />
            ))}
          </Tabs>
        }
      ></GlobalHeader>
      <GlobalRightLayout>
        <List
          itemLayout="horizontal"
          dataSource={msgList.filter((item) => {
            switch (chosen) {
              case 'All':
                return true
              case 'Favority':
                return item.isFavority
              default:
                return item.tag == chosen
            }
          })}
          renderItem={(item) => (
            <List.Item onClick={() => readMsg(item)}>
              <List.Item.Meta
                key={item.msgID}
                avatar={<TeamOutlined />}
                title={<Badge dot={!item.Readed}>{item.from}</Badge>}
                description={<Paragraph ellipsis={true}>{item.content}</Paragraph>}
              />
              <Button onClick={(e) => favMsg(e, item)}>{item.isFavority ? <HeartFilled /> : <HeartOutlined />}</Button>
            </List.Item>
          )}
        />
      </GlobalRightLayout>
      <ReadOnlyModal
        visible={showModal}
        close={() => setShowModal(false)}
        title={onDisplayMsg?.from || '无标题'}
        content={onDisplayMsg?.content || ' '}
      />
      <ContactModal visible={Contact} close={() => setContact(false)} from="NU" />
    </>
  )
}

export default InboxPage
