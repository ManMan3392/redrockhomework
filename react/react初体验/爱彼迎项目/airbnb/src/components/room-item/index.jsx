import React, { memo } from 'react'
import { ItemWrapper } from './style'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

const RoomItem = memo((props) => {
    const { itemData, itemWidth } = props
    return (
        <ItemWrapper
            verifyColor={itemData.verify_info?.text_color || '#39576a'}
            itemWidth={itemWidth}
        >
            <div className="inner">
                <div className="cover">
                    <img src={itemData.picture_url} alt='' />
                </div>
                <div className="desc">
                    {itemData?.verify_info?.message?.join(' • ')}
                </div>
                <div className="name">
                    {itemData.name}
                </div>
                <div className="price">
                    ￥{itemData.price}/晚
                </div>
                <div className='bottom'>
                    <Box sx={{ '& > legend': { mt: 2 } }}>
                        <Rating
                            name="read-only"
                            value={itemData?.star_rating ?? 5}
                            readOnly
                            sx={{ fontSize: '12px', color: '#00848A', marginRight: '-1px' }}
                        />
                    </Box>
                    <span className="count">{itemData?.reviews_count}</span>
                    {
                        itemData.bottom_info && <span className='extra'>·{itemData.bottom_info?.content}</span>
                    }
                </div>
            </div>
        </ItemWrapper>
    )
})

export default RoomItem