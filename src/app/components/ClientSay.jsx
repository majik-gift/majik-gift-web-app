import { Container, Stack, Typography } from '@mui/material'
import React from 'react'
import ClientSaySlider from './ClientSaySlider'

export default function ClientSay() {
  return (
     <Container maxWidth={'lg'} style={{padding:'80px 0px'}}>
          <Stack gap={5}>
               <Typography variant='h3' textAlign={'center'} fontWeight={'SemiBold'} fontFamily={'Libre Bodoni'}>What Our Users Say</Typography>
               <ClientSaySlider/>
          </Stack>
     </Container>
)
}
