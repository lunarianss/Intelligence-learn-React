export let baseURL = ''
if (process.env.NODE_ENV === 'production') {
  // baseURL = 'http://43.139.194.209:8088'
  baseURL = 'http://139.9.44.14:31899'
} else if (process.env.NODE_ENV === 'development') {
  // baseURL = 'http://10.0.11.88:8089' // 内部测试环境
  // baseURL = 'https://mock.apifox.cn/m1/792185-0-default'
  // baseURL = 'http://43.139.104.227:8089' // 钿沣服务器 只有上传资源和注册测试的时候才开启，其余时候使用第一个
  // baseURL = 'http://43.139.194.209:8088' // ？
  baseURL = 'http://139.9.44.14:31899'
} else {
  // baseURL = 'http://43.139.104.227:8089'
  // baseURL = 'http://localhost:8089'
}

/* BaseUrl Mock http://127.0.0.1:3000/api  端口号看自己的com */

export const TIME_OUT = 20000 * 6
