import React from 'react'
import InstructorBanner from '../assets/Instruct-removebg-preview.png'
import { Link } from 'react-router-dom'
import InstructorHero from '../InstructorComponents/InstructorHero'
import Reasons from '../InstructorComponents/Reasons'
const InstructorHome = () => {
    return (
        <div>
            <InstructorHero />
            <Reasons/>
        </div>
    )
}

export default InstructorHome
