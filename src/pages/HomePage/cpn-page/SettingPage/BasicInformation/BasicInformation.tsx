import { Badge, Button, Descriptions } from 'antd'
import { BasicInformationWrapper } from '../SettingPageStyle'

export const BasicInformation = () => {
  return (
    <>
      <BasicInformationWrapper>
        <Descriptions size="small" title="个人信息" bordered extra={<Button type="primary">编辑</Button>}>
          <Descriptions.Item label="头像">Avater</Descriptions.Item>
          <Descriptions.Item label="用户名">userName</Descriptions.Item>
          <Descriptions.Item label="账号状态">
            <Badge status="processing" text="正常" />
          </Descriptions.Item>
          <Descriptions.Item label="个性签名" span={2}>
            未设置
          </Descriptions.Item>
          <Descriptions.Item label="注册时间" span={2}>
            2018-04-24 18:00:00
          </Descriptions.Item>
          <Descriptions.Item label="企业">厂东技术师范大学</Descriptions.Item>
          <Descriptions.Item label="部门">计算机科学学院</Descriptions.Item>
          <Descriptions.Item label="编号" span={2}>
            20200XXXXXXXX
          </Descriptions.Item>
        </Descriptions>
      </BasicInformationWrapper>
    </>
  )
}
