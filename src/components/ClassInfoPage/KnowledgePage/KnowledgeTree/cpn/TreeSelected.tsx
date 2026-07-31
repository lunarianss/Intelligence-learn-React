import { Button, Empty, Tree } from 'antd'
import { useNavigate } from 'react-router-dom'

export interface TreeSelected {
  curCheckId?: string[]
  handleRelateCheck: any
  relateKeys: string[]
  handleRelateExpand: any
  checkTreeData: any
}

export const TreeSelected = (props: TreeSelected) => {
  const { checkTreeData, curCheckId, handleRelateCheck, handleRelateExpand, relateKeys } = props
  const navigate = useNavigate()
  return (
    <>
      {checkTreeData ? (
        <Tree
          checkStrictly={true}
          checkedKeys={curCheckId}
          checkable={true}
          onCheck={handleRelateCheck}
          expandedKeys={relateKeys}
          onExpand={handleRelateExpand}
          onSelect={handleRelateExpand}
        >
          {checkTreeData && checkTreeData}
        </Tree>
      ) : (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60
          }}
          description={<span>暂无知识点</span>}
        >
          <Button type="primary" onClick={() => navigate('home/teach')}>
            去创建
          </Button>
        </Empty>
      )}
    </>
  )
}
