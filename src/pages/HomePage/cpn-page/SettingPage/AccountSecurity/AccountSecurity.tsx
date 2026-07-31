import { Button, Form } from 'antd'

export const AccountSecurity = () => {
  return (
    <>
      <Form>
        <Form.Item label="密码">
          已设置&nbsp;&nbsp;
          <Button>修改密码</Button>
        </Form.Item>
        <Form.Item label="邮箱">
          XXX.qq.com&nbsp;&nbsp;
          <Button>更改绑定邮箱</Button>
        </Form.Item>
        <Form.Item label="邮箱">
          1234567890&nbsp;&nbsp;
          <Button>更改手机号</Button>
        </Form.Item>
      </Form>
      <Button danger>注销账号</Button>&nbsp;&nbsp;
      <a>用户协议</a>
    </>
  )
}
