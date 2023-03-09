import React from 'react';
import { infoContent, infoScheme } from '../../types'

interface schemeContent {
   content: infoContent 
}


const Scheme = ({ content }: schemeContent ) => {

    return(
        <div className="scheme--section">
            <div className="scheme--heading">
                <h2>
                    {content.title}
                </h2>
            </div>
            {content.description && <div className="scheme--description">
                <h4>
                    {content.description}
                </h4>
            </div>}
            <div className="scheme--content">
                {content.content.map((stage : any) => {
                    return(
                        <div className="scheme--stage">
                          {content.timeline && 
                            <div className="timeline--item">
                              <img src="img/timeline_icon.png" />
                            </div>}
                          <div className="stage--item">
                             <div className="stage--img">
                                <img src={stage.image} />
                             </div>
                             <div className="stage--text">
                                <div className="stage--heading">
                                    <h4>{stage.heading}</h4>
                                </div>
                                <div className="stage--description">
                                    <p>{stage.description}</p>
                                </div>
                             </div>
                          </div>
                        </div>
                    )
                })
                }

            </div>
        </div>
    )
}

export default Scheme