import React from 'react';
import * as texts from '../../content/texts'
import { ActionBtn, LinkBtn } from '../connectBtn';

const Hero = () => {
    
    return(
        <div className="hero--section">
            <div className="hero--column">
                <img className="hero--img" src="img/pie.png" />
            </div>
            <div className="hero--column">
               <div className="hero--heading">
                  <h2>{texts.heroHeading}</h2>
               </div>
               <div className="hero--description">
                  <p>{texts.heroDescription}</p>
               </div>
               <div className="hero--btn--block">
                  <LinkBtn href="#" text="Start trading" />
                  <LinkBtn href="#" text="Buy tokens" />
               </div>
            </div>
        </div>
    )
}

export default Hero