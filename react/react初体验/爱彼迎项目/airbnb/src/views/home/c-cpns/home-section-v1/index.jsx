import React, { memo } from 'react'
import { SectionV1Wrapper } from './style'
import SectionHeader from '../../../../components/section-header'
import SectionRooms from '../../../../components/section-rooms'

const HomeSectionV1 = memo((props) => {
    const { infoData } = props
    return (
        <SectionV1Wrapper>
            <SectionHeader title={infoData.title} subtitle={infoData.subtitle} itemWidth='25%' />
            <SectionRooms roomList={infoData.list} itemWidth='25%' />
        </SectionV1Wrapper>
    )
})

export default HomeSectionV1