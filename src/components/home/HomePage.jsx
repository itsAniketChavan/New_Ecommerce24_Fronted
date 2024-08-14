import React from 'react'
import CategoriesList from './CategoriesList'
import Services from "./Services"
import FlashDeals from "./FlashDeals"

const Home = () => {
  return (
    <div>
       <CategoriesList/>
       <Services/>
       {/* <FlashDeals/> */}
    </div>
  )
}

export default Home
