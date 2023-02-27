import React from 'react'
import "./css/app.scss";
import AppHeader from './components/header'
import Hero from './components/hero'
import Scheme from './components/scheme'
import { siteSchemes } from './content/schemes'

const App = () => {
    return(
        <div>
            <AppHeader />
            <div className="main--content">
                <div className="page">
                    <Hero />
                    <a href="#alg" />
                    <Scheme 
                    title={siteSchemes.algorithm.title}
                    description={siteSchemes.algorithm.description}
                    timeline={siteSchemes.algorithm.timeline}
                    content={siteSchemes.algorithm.content} />
                    <a href="#alg" />
                    <Scheme 
                    title={siteSchemes.howToEarn.title}
                    description={siteSchemes.howToEarn.description}
                    timeline={siteSchemes.howToEarn.timeline}
                    content={siteSchemes.howToEarn.content} />
                    <a href="#roadmap" />
                    <Scheme 
                    title={siteSchemes.roadMap.title}
                    description={siteSchemes.roadMap.description}
                    timeline={siteSchemes.roadMap.timeline}
                    content={siteSchemes.roadMap.content} />
                </div>
            </div>
        </div>
    )
}

export default App