import React from 'react';
import returnIcon from 'images/return.svg';

export default function Header(props) {

    return (
        <div className={props.className}>
            <img src={returnIcon} alt="return" onClick={() => props.goBack()} /> Quay lại
        </div>
    )
}


