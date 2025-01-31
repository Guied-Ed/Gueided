import React, { useState } from 'react';
import { Settings as SettingsIcon, Home as HomeIcon, Book, User, CheckCircle } from 'lucide-react'; // Renamed Settings to SettingsIcon
import Home from './components/Home';
import SettingsComponent from './components/Settings'; // Renamed Settings to SettingsComponent
import Courses from './components/Courses';
import Students from './components/Students';

const sideBar = [

    { name: 'Home', icon: <HomeIcon />, component: <Home /> },
    { name: 'Settings', icon: <SettingsIcon />, component: <SettingsComponent /> },
    { name: 'Courses', icon: <Book />, component: <Courses /> },
    { name: 'Student', icon: <User />, component: <Students /> },

];

interface ComponentProps {
    selectedComponent: JSX.Element
    setSelectedComponent: (value: JSX.Element) => void
}

const SideBar: React.FC<ComponentProps> = ({ selectedComponent, setSelectedComponent }) => {





    const handleComponent = (component: JSX.Element) => {
        setSelectedComponent(component);
    }
    return (
        <div className="bg-black h-screen w-80  mr-4 ">
            <ul className='flex flex-col gap-6 py-8 px-6'>
                {sideBar.map((sD, index) => {


                    const isSelected = selectedComponent.type === sD.component.type

                    return (

                        <li key={index} className={ ` flex gap-4  items-center cursor-pointer duration-300 transition p-4 ${isSelected ? " bg-white text-black" : " hover:bg-white hover:text-black text-white "} `} onClick={() => handleComponent(sD.component)} >
                            <div>{sD.icon}</div>
                            <span >{sD.name}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default SideBar;
