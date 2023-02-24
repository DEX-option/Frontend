import React from 'react';
import Menu from './menu'
import ConnectBtn from './connectBtn';


const AppHeader = () => {
    return(
        <header className="app--header">
              <div className="logo--section">
                <img className="logo--image" src="img/logo.png" />
              </div>
              <div className="menu--section">
                <Menu />
              </div>
              <div className="connect--section">
                <ConnectBtn />
              </div>
        </header>
    )
}

export default AppHeader