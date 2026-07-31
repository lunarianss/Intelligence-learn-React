import { fourSize, oneSize, threeSize, twoSize } from './normalSize'
import { CategoryMap, defaultStyle, fourStyle, oneStyle, threeStyle, twoStyle } from './normalStyle'

export const setLevelOneStyle = (node: any, tag?: string) => {
  node.symbolSize = tag ? oneSize : oneSize
  node.itemStyle = oneStyle
  node.label = {
    normal: {
      show: true,
      formatter: '{b}',
      fontSize: 18,
      lineHeight: 38,
      color: '#FFFFFF',
      fontWeight: 'bold',
      position: 'inside'
    }
  }
}

export const setLevelTwoStyle = (node: any) => {
  node.symbolSize = twoSize
  node.itemStyle = twoStyle
  node.label = {
    show: true,
    formatter: '{b}',
    fontSize: 16,
    lineHeight: 36,
    color: '#FFFFFF',
    fontWeight: 'bold',
    position: 'right'
  }
}
export const setLevelThreeStyle = (node: any, tag?: string) => {
  node.symbolSize = tag ? oneSize : threeSize
  node.itemStyle = threeStyle
  node.label = {
    show: true,
    formatter: '{b}',
    fontSize: 12,
    lineHeight: 24,
    color: '#FFFFFF',
    position: 'right'
  }
}

export const setLevelDefaultStyle = (node: any) => {
  node.symbolSize = defaultStyle
  node.itemStyle = defaultStyle
  node.label = {
    show: true,
    fontSize: 10,
    lineHeight: 20,
    color: '#FFFFFF',
    position: 'inside'
  }
}
export const setLevelFourStyle = (node: any, tag?: string) => {
  node.symbolSize = tag ? oneSize : fourSize
  node.itemStyle = fourStyle
  node.label = {
    show: true,
    fontSize: 12,
    lineHeight: 24,
    color: '#FFFFFF',
    position: 'inside'
  }
}
export const setNodeStyle = (node: any) => {
  switch (node.category) {
    case 0:
      setLevelOneStyle(node)
      break
    case 1:
      setLevelTwoStyle(node)
      break
    case 2:
      setLevelThreeStyle(node)
      break
    case 3:
      setLevelFourStyle(node)
      break
    default:
      setLevelDefaultStyle(node)
  }
}
export const setCategories2 = (maxLevel: number) => {
  const categories = []

  for (let index = 0; index < maxLevel + 1; index++) {
    categories.push({
      name: `${index + 1}级知识点`,
      itemStyle: CategoryMap.get(index + 1) || CategoryMap.get('default')
    })
  }
  return categories
}
