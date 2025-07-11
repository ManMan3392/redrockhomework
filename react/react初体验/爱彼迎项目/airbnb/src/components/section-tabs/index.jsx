
import classNames from 'classnames'
import React, { memo, useState } from 'react'
import { TabsWrapper } from './style'
import ScollView from '@/base-ui/scroll-view'

const SectionTabs = memo((props) => {
  const { tabNames = [], tabClick } = props
  const [currentIndex, setCurrentIndex] = useState(0)

  function itemClickHandle(index, item) {
    setCurrentIndex(index)
    tabClick(index, item)
  }

  return (
    <TabsWrapper>
      <ScollView>
        {
          tabNames.map((item, index) => {
            return (
              <div
                key={index}
                className={classNames("item", { active: index === currentIndex })}
                onClick={e => itemClickHandle(index, item)}
              >
                {item}
              </div>
            )
          })
        }
      </ScollView>
    </TabsWrapper>
  )
})


export default SectionTabs