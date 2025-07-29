import React from 'react'
import Home from '../InstructorComponents/components/Home';
import SideBar from '../InstructorComponents/SideBar'
import { useState } from 'react';
const CourseSetup = () => {

  const [selectedComponent, setSelectedComponent] = useState(<Home />);
  return (
    <div className="flex">
   
      <div className="w-1/4 h-screen fixed  ">
        <SideBar
          selectedComponent={selectedComponent}
          setSelectedComponent={setSelectedComponent}
        />
      </div>

   
      <div className="ml-[calc(20%)] w-[calc(80%)] p-4">
        {selectedComponent}
      </div>
    </div>

  )
}

export default CourseSetup
