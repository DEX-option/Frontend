import React from 'react';
import { menuConfig } from '../../content/menu';

const Menu = () => {

    return(
        <div className="main--menu">
            {menuConfig.map((item, index) => {
                return(
                    <div className="menu--item" key={"menu".concat(String(index*1.34))}>
                        <a href={item.link}>{item.name}</a>
                    </div>
                )
            })}
        </div>
    )
}

export default Menu


