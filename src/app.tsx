import React, { useEffect } from 'react'
import { RootState, actions } from './state/reducer'
import "./css/app.scss";
import AppHeader from './components/header'
import Footer from './components/footer';
import HomePage from './views/home';
import { useDispatch, useSelector } from 'react-redux';
import CreateOptionPage from './views/create';
import InvestPage from './views/invest';
import TradePage from './views/trade';


const TabInner = () => {
    const State = useSelector((state : RootState) => {
        return state;
    })

    switch (State.tab) {
        case "create":
        return <CreateOptionPage />
        case "invest":
        return <InvestPage />
        case "trade":
        return <TradePage />
        default:
        return <HomePage />
    }
        
}

const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        const path = document.location.pathname
        if (path) {
            switch (true) {
                case (path.indexOf("create") > -1):
                    dispatch(actions.SelectTab("create"))
                    break;
                case (path.indexOf('invest') > -1):
                    dispatch(actions.SelectTab("invest"))
                    break;
                case (path.indexOf('trade') > -1):
                    dispatch(actions.SelectTab("trade"))
                    break;
                default :
                    dispatch(actions.SelectTab("home"))
                    break;
            }
        }
    }, [])

    return(
        <div>
            <AppHeader />
              <div className="main--content">
                <TabInner />
              </div>
            <Footer />
        </div>
    )
}

export default App