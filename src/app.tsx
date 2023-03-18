import React from 'react'
import "./css/app.scss";
import AppHeader from './components/header'
import Hero from './components/hero'
import Scheme from './components/scheme'
import { siteSchemes } from './content/schemes'
import AboutSection from './components/about';
import Footer from './components/footer';

const App = () => {
    return(
        <div>
            <AppHeader />
            <div className="main--content">
                <div className="page">
                    <Hero />
                    <a href="#alg" />
                    <Scheme content={siteSchemes.algorithm} />
                    <a href="#alg" />
                    <Scheme content={siteSchemes.howToEarn} />
                    <a href="#roadmap" />
                    <Scheme content={siteSchemes.roadMap} />
                    <AboutSection />
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default App