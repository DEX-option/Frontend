import React from 'react';
import Menu from './menu'
import { ActionBtn } from './connectBtn';


const AppHeader = () => {

    const ConnectWallet = async (event : React.MouseEvent) => {
       event.stopPropagation()
       console.log("Connect wallet")
    }

    return(
        <header className="app--header">
              <div className="logo--section">
                <img className="logo--image" src="img/logo.png" />
              </div>
              <div className="menu--section">
                <Menu />
              </div>
              <div className="connect--section">
                <ActionBtn text="Connect wallet" onClick={ConnectWallet} />
              </div>
        </header>
    )
}

export default AppHeader