import { setLevelFourStyle, setLevelOneStyle, setLevelThreeStyle } from '../../K-graphPage/config/index'
import { CategoryMap2 } from '../../K-graphPage/config/normalStyle'

interface CategoryInterface {
  name?: string
  itemStyle?: any
}

export const getKnowPoint = (level: number) => {
  let ans = '掌握'
  let color = 'rgb(42, 202, 68)'
  if (level < 60) {
    ans = '未掌握'
    color = 'rgb(255, 95, 90)'
  } else if (level >= 80) {
    ans = '熟练掌握'
    color = 'rgb(42, 202, 68)'
  }
  return [ans, color]
}

export const setCategories = (maxLevel: number) => {
  const categories: CategoryInterface[] = [{ name: '未掌握' }, { name: '掌握' }, { name: '熟练掌握' }]
  for (let index = 0; index < maxLevel + 1; index++) {
    categories.forEach((c) => {
      c.itemStyle = CategoryMap2.get(c.name)
      return c
    })
  }
  return categories
}

export const setNodeStyle = (node: any) => {
  if (node.level < 60) setLevelOneStyle(node, 'mk')
  else if (node.level >= 80) setLevelThreeStyle(node, 'mk')
  else setLevelFourStyle(node, 'mk')
}

export const HTMLToolTip = (
  color: string,
  know: string,
  param: { name: string }
) => `<div style="display: flex; flex-direction: column;">
<section style="background-color: ${color}; width: 12px; height: 12px; border-radius: 6px"></section>
<div style="display: flex; padding-left: 23px;padding-top: 7px" >
  <h4 style="margin-right: 10px">
  知识点掌握程度:
  </h4>
  <span style="color:${color}">
  ${know}
  </span>
</div>
<div style="display: flex; padding-left: 23px">
  <h4 style="margin-right: 10px">
  知识点名字:
  </h4>
  <span style="color: black">
  ${param.name}
  </span>
</div>
</div>`
