import React from 'react'
import Home from '../InstructorComponents/components/Home';
import SideBar from '../InstructorComponents/SideBar'
import { useState } from 'react';
const CourseSetup = () => {
    
    const [selectedComponent,setSelectedComponent] = useState(<Home/>);
  return (
    <div className='flex gap-10 '>
        <SideBar 
        selectedComponent={selectedComponent}
        setSelectedComponent={setSelectedComponent}
        />
        <div className='w-full'>
            {selectedComponent}
         
        </div>
    </div>
  )
}

export default CourseSetup
