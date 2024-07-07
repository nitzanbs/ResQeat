import React from 'react'
import Category from '../../components/foodCategories/FoodCategories'
import SearchBar from '../../components/searchBar/SearchBar'
import './Home.css'

function Home() {
  return (
    <>
    <div className='pageHome'>
    {/* <SearchBar/> */}
    <div className='homeContainer'><Category/></div>
    <img className="ImageWhyUs" src="../../images/WhyUs.png" alt="" />
    </div>
    </>
  )
}

export default Home