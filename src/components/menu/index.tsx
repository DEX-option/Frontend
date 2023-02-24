import React from 'react';
import { menuConfig } from '../../content/menu';

const Menu = () => {

    return(
        <div className="main--menu">
            {menuConfig.map((item) => {
                return(
                    <div className="menu--item">
                        <a href={item.link}>{item.name}</a>
                    </div>
                )
            })}
        </div>
    )
}

export default Menu


