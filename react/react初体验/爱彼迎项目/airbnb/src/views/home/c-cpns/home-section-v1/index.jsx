import React, { memo } from 'react'
import { SectionV1Wrapper } from './style'
import SectionHeader from '../../../../components/section-header'
import SectionRooms from '../../../../components/section-rooms'
import SectionFooter from '@/components/section-footer'

const HomeSectionV1 = memo((props) => {
    const { infoData } = props
    return (
        <SectionV1Wrapper>
            <SectionHeader title={infoData.title} subtitle={infoData.subtitle} />
            <SectionRooms roomList={infoData.list} itemWidth='25%' />
            <SectionFooter></SectionFooter>
        </SectionV1Wrapper>
    )
})

export default HomeSectionV1