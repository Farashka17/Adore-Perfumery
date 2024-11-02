import React from 'react'
import PageTitleImageBackground from '../common/pageTitleImageBackground'
import Contact from './contact'
import Branches from './branches'

const ContactAndBranchesComponent = () => {
      const title="Contact and Branches"
  return (
    <div className="bg-[white]  md:mx-auto font-nunito w-full">
    <div className="w-full flex flex-col  mx-auto  py-[25px]">
      <PageTitleImageBackground title={title}/>
      <Contact/>
      <Branches/>
    </div>
    </div>
  )
}

export default ContactAndBranchesComponent