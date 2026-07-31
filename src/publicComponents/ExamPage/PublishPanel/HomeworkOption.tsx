import { Switch } from 'antd'
import Select from 'rc-select'
import React from 'react'
const { Option } = Select

export const HomeworkOption: React.FC<{
  publishOption: any
  setPublishOption: any
  isAllowRedo: boolean
  setIsAllowRedo: any
}> = ({ setPublishOption, publishOption, isAllowRedo, setIsAllowRedo }) => {
  return (
    <div>
      <>
        <span className="bl"> 允许重做:</span>
        <Switch
          checked={publishOption.isAllowMakeUp}
          onChange={(value) => {
            setIsAllowRedo(value), setPublishOption({ ...publishOption, isAllowMakeUp: value ? 1 : 0 })
          }}
        />
        <br></br>
        <span className={isAllowRedo ? 'bl' : 'gray'}> 取最高分:</span>
        <Switch
          checked={publishOption.isGetHighScore && isAllowRedo}
          disabled={!isAllowRedo}
          onChange={(value) => {
            setPublishOption({ ...publishOption, isGetHighScore: value ? 1 : 0 })
          }}
        />
        <br></br>
        <span className={isAllowRedo ? 'bl' : 'gray'}> 是否多选题未选全给一半分:</span>
        <Switch
          checked={publishOption.isMultiHalfScore && isAllowRedo}
          disabled={!isAllowRedo}
          onChange={(value) => {
            setPublishOption({ ...publishOption, isMultiHalfScore: value ? 1 : 0 })
          }}
        />
        <br></br>
        <span className={isAllowRedo ? 'bl' : 'gray'}> 允许重做几次:</span>
        <Select
          disabled={!isAllowRedo}
          defaultValue={1}
          onChange={(value: number) => {
            setPublishOption({ ...publishOption, remakeTime: value })
          }}
        >
          <Option value={1}>1</Option>
          <Option value={2}>2</Option>
          <Option value={3}>3</Option>
        </Select>
      </>
    </div>
  )
}
