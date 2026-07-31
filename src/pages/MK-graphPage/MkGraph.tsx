import * as echarts from 'echarts'
import { PrimaryButton } from 'publicComponents/Button'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShowMG } from 'server/fetchGraph/index'
import styled from 'styled-components'
import { useComputedRoute } from 'util/computedRoute'
import { getKnowPoint, HTMLToolTip, setCategories, setNodeStyle } from './config'

const MkGraph = () => {
  const courseId = useParams().id!
  const { data } = useShowMG(courseId)
  const navigate = useNavigate()
  const computedPath = useComputedRoute('mk-graph')

  useEffect(() => {
    const chartDom: any = document.getElementById('chart')
    const myChart = echarts.init(chartDom, 'dark')
    let maxLevel = -1
    data?.nodeData?.forEach((node: any) => {
      maxLevel = Math.max(node.category, maxLevel)
      setNodeStyle(node)
    })

    const categories = setCategories(maxLevel)

    const option: any = {
      tooltip: {
        formatter: function (param: any) {
          const [know, color] = getKnowPoint(param.data.level)
          return HTMLToolTip(color, know, param)
        }
      },
      animationDuration: 2000,
      animationEasingUpdate: 'quinticInOut',
      legend: {
        show: true,
        orient: 'vertical',
        icon: 'circle',
        padding: 20,
        itemGap: 20,
        backgroundColor: '#1F2D3C',
        borderRadius: 8,
        textStyle: {
          fontSize: 14,
          color: '#ffffff'
        },
        left: 30,
        bottom: 30
      },
      series: [
        {
          type: 'graph',
          layout: 'force',
          focusNodeAdjacency: true,
          roam: true,
          zoom: 1,
          draggable: true,
          force: {
            repulsion: 1500,
            layoutAnimation: true,
            gravity: 0.1,
            edgeLength: 180
          },
          edgeSymbol: ['none', 'arrow'],
          categories: categories,
          data: data?.nodeData || [],
          links: data?.linkData || [],
          lineStyle: {
            opacity: 1,
            width: 1,
            color: 'source'
          },
          emphasis: {
            focus: 'adjacency'
          }
        }
      ]
    }
    myChart.setOption(option)
  }, [data])
  return (
    <>
      <KnowledgeGraphWrapper id={'chart'}></KnowledgeGraphWrapper>
      <PrimaryButton
        title={'返回'}
        style={{ position: 'absolute', top: 69, left: 31, zIndex: 1 }}
        handleClick={() => navigate(`${computedPath}knowledge`)}
      ></PrimaryButton>
    </>
  )
}
const KnowledgeGraphWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`

export default MkGraph
