import { Stack } from '@mui/material'
import React from 'react'

const HorizontalLine = ({bgColor = "background.colorOfBorder"}) => {
    return (
        <Stack width={"100%"} height={"0.05rem"} backgroundColor={bgColor} />
    )
}

export default HorizontalLine