import React from 'react';

type ActionProps = {
    onClick(e: React.MouseEvent): void,
    text: string
  };

type LinkProps = {
    href: string,
    text: string
 };

export const ActionBtn = ({ text, onClick } : ActionProps ) => {


    return(
        <div className="btn connect--btn" onClick={onClick}>
            {text}
        </div>
    )

}

export const LinkBtn = ({ text, href } : LinkProps ) => {

    return(
        <div className="btn connect--btn">
            <a href={href}>{text}</a>
        </div>
    )
}
