/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import returnIcon from 'images/return.svg';

export default function Header(props) {
  return (
    <div className={props.className}>
      <img src={returnIcon} alt="return" onClick={() => props.goBack()} /> Quay
      lại
    </div>
  );
}
