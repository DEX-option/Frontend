import React from 'react'
import "./css/app.scss";
import AppHeader from './components/header'
import Hero from './components/hero'
import Scheme from './components/scheme'

const App = () => {
    return(
        <div>
            <AppHeader />
            <div className="main--content">
                <div className="page">
                    <Hero />
                    <Scheme />
                </div>
            </div>
        </div>
    )
}

export default App