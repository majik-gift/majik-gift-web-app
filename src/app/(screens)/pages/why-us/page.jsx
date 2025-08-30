import Categories from '@/app/components/Categories'
import ShopSection from '@/app/components/ProductSection'
import Section from '@/app/components/Section'
import { About, whyUsSection, whyUsSection3 } from '@/assets'
import { Stack } from '@mui/material'
import React from 'react'

export default function page() {
  return (
    <Stack paddingBottom={10}>
      <Section src={About} paraHead={'The Spiritual Shop'} para1={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a efficitur nisl. Vivamus laoreet vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a efficitur nisl. Vivamus laoreet vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a efficitur nisl. Vivamus laoreet vestibulum.'} buttonText={'Learn More'} color={"#000"} />
      <Categories />
      <Section src={whyUsSection} paraHead={'Readers & Healers'} para1={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a efficitur nisl. Vivamus laoreet vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a efficitur nisl. Vivamus laoreet vestibulum. '} para2={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a efficitur nisl. Vivamus laoreet vestibulum.'} buttonText={'Book Now'} color={'#000'} />
      <Stack bgcolor={'background.primary'}>
        <Section whyUs paraHead={'Classes & Workshops'} src={whyUsSection3} para1={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a efficitur nisl. Vivamus laoreet vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a efficitur nisl. Vivamus laoreet vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. '} para2={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a efficitur nisl. Vivamus laoreet vestibulum. '} buttonText={'Book Now'} reverse/>
      </Stack>
      <ShopSection />
    </Stack>
  )
}
