import React from 'react';
import logo from 'images/logo-vp.svg';

export default function Header(props) {

    return (
        <div className={props.className}><img src={logo} alt="logo" /></div>
    )
}


