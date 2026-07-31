import { AnyFn } from 'types'

export function debounce(fn: AnyFn, delay: number, immediate = false, resultCallback?: AnyFn) {
  // 1.定义一个定时器, 保存上一次的定时器
  let timer: any = null
  let isInvoke = false

  // 真正执行的函数并返回这个防抖函数
  const _debounce = function (...args: any[]) {
    return new Promise((resolve) => {
      // 取消上一次的定时器
      // 这个定时器不必要置为null，他是不执行的中间定时器。
      if (timer) clearTimeout(timer)
      // 判断是否需要立即执行
      if (immediate && !isInvoke) {
        const result = fn.apply(this, args)
        if (resultCallback) resultCallback(result)
        resolve(result)
        // 确保下次立即点击之后，不会执行
        isInvoke = true
      } else {
        // 延迟执行
        timer = setTimeout(() => {
          // 外部传入的真正要执行的函数
          const result = fn.apply(this, args)
          if (resultCallback) resultCallback(result)
          resolve(result)
          // 确保下次还可以立即执行
          isInvoke = false
          // 最后执行的定时器才需要清除置为null
          timer = null
        }, delay)
      }
    })
  }

  // 封装取消功能
  _debounce.cancel = function () {
    if (timer) clearTimeout(timer)
    // 执行完之后才清空定时器，防止内存泄露,clear之后，仍是定时器对象
    timer = null
    // 确保下次还可以立即执行
    isInvoke = false
  }

  return _debounce
}
