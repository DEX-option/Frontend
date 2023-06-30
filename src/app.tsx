import React from 'react'
import "./css/app.scss";
import AppHeader from './components/header'
import Footer from './components/footer';
import HomePage from './views/home';

const App = () => {
    return(
        <div>
            <AppHeader />
            <div className="main--content">
                <HomePage />
            </div>
            <Footer />
        </div>
    )
}

export default App