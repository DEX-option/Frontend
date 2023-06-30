import React from 'react'
import { siteSchemes } from '../../content/schemes'
import Hero from '../../components/hero'
import Scheme from '../../components/scheme'
import AboutSection from '../../components/about'

const HomePage = () => {
    return(
            <div className="page">
                <Hero />
                <a href="#alg" />
                <Scheme content={siteSchemes.algorithm} />
                <a href="#earn" />
                <Scheme content={siteSchemes.howToEarn} />
                <AboutSection />
            </div>
    )
}

export default HomePage