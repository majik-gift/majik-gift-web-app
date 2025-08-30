import OrderSummary from '@/app/components/OrderSummary'
import { Container} from '@mui/material'
import React from 'react'

export default function Services() {
  return (
    <Container maxWidth={'lg'}>
      <OrderSummary orderType={"Shipping Address"} />
    </Container>
  )
}
