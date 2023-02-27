import React from 'react';
import { infoContent, infoScheme } from '../../types'

interface schemeContent {
    title: string,
    description: string,
    timeline: boolean,
    content: infoScheme
}


const Scheme: React.FC<schemeContent> = ({ 
    title, 
    description, 
    timeline,
    content }: infoContent ) => {

    console.log(content)

    return(
        <div className="scheme--section">
            <div className="scheme--heading">
                <h2>
                    {title}
                </h2>
            </div>
            {description && <div className="scheme--description">
                <h4>
                    {description}
                </h4>
            </div>}
            <div className="scheme--content">
                {content.map((stage) => {
                    return(
                        <div className="scheme--stage">
                          {timeline && 
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