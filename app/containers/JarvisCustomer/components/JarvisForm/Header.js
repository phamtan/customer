/* eslint-disable react/prop-types */
import React from 'react';
import logo from 'images/logo-vp.svg';
import step1 from 'images/step1.svg';
import step2 from 'images/step2.svg';
import step3 from 'images/step3.svg';
import step4 from 'images/step4.svg';
import step5 from 'images/step5.svg';

export default function Header(props) {
  return (
    <div className={props.className}>
      <img src={logo} alt="logo" />
      {props.step === 1 && <img src={step1} alt="logo" />}
      {props.step === 2 && <img src={step2} alt="logo" />}
      {props.step === 3 && <img src={step3} alt="logo" />}
      {props.step === 4 && <img src={step4} alt="logo" />}
      {props.step === 5 && <img src={step5} alt="logo" />}
    </div>
  );
}
