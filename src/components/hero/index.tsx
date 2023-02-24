import React from 'react';
import * as texts from '../../content/texts'

const Hero = () => {
    
    return(
        <div className="hero--section">
            <div className="hero--column">
                <img src="img/pie.png" />
            </div>
            <div className="hero--column">
               <div className="hero--heading">
                  <h2>{texts.heroHeading}</h2>
               </div>
               <div className="hero--description">
                  <p>{texts.heroDescription}</p>
               </div>
            </div>
        </div>
    )
}

export default Hero