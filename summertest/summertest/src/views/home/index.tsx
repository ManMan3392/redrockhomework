import type { ReactNode, FC } from 'react'
import { memo, useState } from 'react'
import { HomeWrapper } from './style'

interface Iprops {
  children?: ReactNode
}

const Home: FC<Iprops> = () => {
  const [isheight, setHeight] = useState(true)

  const handleClick = () => {
    setHeight(false)
    console.log(isheight)
  }

  return (
    <HomeWrapper>
      <div
        className="bottom"
        onClick={handleClick}
        style={{ height: isheight ? '130px' : '0px' }}
      ></div>
    </HomeWrapper>
  )
}
export default memo(Home)
