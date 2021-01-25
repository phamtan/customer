/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import no1Card from 'images/cards/no1-card.png';
import mc2Card from 'images/cards/mc2-card.png';
import platinumCard from 'images/cards/platinum-card.png';
import LocalDiningOutlinedIcon from '@material-ui/icons/LocalDiningOutlined';
import LocalTaxiOutlinedIcon from '@material-ui/icons/LocalTaxiOutlined';
import BeachAccessOutlinedIcon from '@material-ui/icons/BeachAccessOutlined';
import FlightTakeoffOutlinedIcon from '@material-ui/icons/FlightTakeoffOutlined';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import titaniumCashbackCard from 'images/cards/titanium-cashback.png';
import platinumCashbackCard from 'images/cards/platinum-cashback.png';
import platinumTravelCard from 'images/cards/platinum-travel.png';
import vnaCard from 'images/cards/vna-card.png';
import Header from './Header';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as Actions from '../../actions';

import JarvisFormStyle from './JarvisFormStyle';

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const CASHBACK = [
  { img: titaniumCashbackCard, id: 'titaniumcb' },
  { img: platinumCashbackCard, id: 'platinumcb' },
];

const TRAVEL = [
  { img: platinumTravelCard, id: 'platinumtravel' },
  { img: vnaCard, id: 'vna' },
];

const REWARD = [
  { img: mc2Card, id: 'mc2' },
  { img: platinumCard, id: 'platinum' },
];

const MONEY = [{ img: no1Card, id: 'no1' }];

const marks = [
  {
    value: 0,
    label: '',
  },
  {
    value: 30,
    label: '8-15',
  },
  {
    value: 60,
    label: '15-35',
  },
  {
    value: 100,
    label: 'Trên 35',
  },
];

const spendAmount = [
  {
    value: 0,
    label: '',
  },
  {
    value: 25,
    label: 'Dưới 25',
  },
  {
    value: 50,
    label: '25-50',
  },
  {
    value: 75,
    label: '50-100',
  },
  {
    value: 100,
    label: 'Trên 100',
  },
];

export default function Round2Confirm(props) {
  const [benefit, setBenefit] = useState(1);
  const [cardList, setCardList] = useState(REWARD);
  const [, setCard] = useState(cardList[0].id);
  const [amount, setAmount] = useState(30);
  const [spend, setSpend] = useState(25);

  function changeCardList(benefit) {
    setBenefit(benefit);
    if (benefit === 1) {
      setCardList(REWARD);
      setCard(REWARD[0].id);
    }
    if (benefit === 2) {
      setCardList(MONEY);
      setCard(MONEY[0].id);
    }
    if (benefit === 3) {
      setCardList(TRAVEL);
      setCard(TRAVEL[0].id);
    }
    if (benefit === 4) {
      setCardList(CASHBACK);
      setCard(CASHBACK[0].id);
    }
  }

  function chooseThisBenefit() {
    const values = {};
    values.amount = amount;
    values.spend = spend;
    values.benefit = benefit;
    props.dispatch(Actions.saveData(values));
    props.setStep(997);
  }

  function valueLabelFormat() {
    return '';
  }

  return (
    <JarvisFormStyle>
      <Header className="header" />
      <div className="benefitTitle">Chọn loại thẻ</div>
      <div className="benefitText">Đa dạng lựa chọn, tối đa lợi ích </div>
      <div className="benefitDescription">Thu nhập hàng tháng</div>
      <div className="benefitSlider">
        <PrettoSlider
          defaultValue={30}
          aria-labelledby="discrete-slider-custom"
          valueLabelDisplay="on"
          step={null}
          marks={marks}
          valueLabelFormat={valueLabelFormat}
          onChange={value => setAmount(value)}
        />
      </div>
      <div className="benefitDescription">Tổng chi tiêu hàng tháng</div>
      <div className="benefitSlider">
        <PrettoSlider
          defaultValue={25}
          aria-labelledby="discrete-slider-custom"
          valueLabelDisplay="on"
          step={null}
          marks={spendAmount}
          valueLabelFormat={valueLabelFormat}
          onChange={value => setSpend(value)}
        />
      </div>
      <div className="benefitDescription">Loại chi tiêu nhiều nhất</div>
      <div className="benefitWrapper">
        <div
          className={`benefitItem ${benefit === 1 ? 'active' : ''}`}
          onClick={() => {
            changeCardList(1);
          }}
        >
          <div className={`${benefit === 1 ? 'active' : ''}`}>
            <LocalDiningOutlinedIcon />
          </div>
          <span>Mua sắm, Ăn uống</span>
        </div>
        <div
          className={`benefitItem ${benefit === 2 ? 'active' : ''}`}
          onClick={() => changeCardList(2)}
        >
          <div className={`${benefit === 2 ? 'active' : ''}`}>
            <LocalTaxiOutlinedIcon />
          </div>
          <span>Đi lại, giải trí</span>
        </div>
      </div>
      <div className="benefitWrapper">
        <div
          className={`benefitItem ${benefit === 3 ? 'active' : ''}`}
          onClick={() => changeCardList(3)}
        >
          <div className={`${benefit === 3 ? 'active' : ''}`}>
            <BeachAccessOutlinedIcon />
          </div>
          <span>Bảo hiểm</span>
        </div>
        <div
          className={`benefitItem ${benefit === 4 ? 'active' : ''}`}
          onClick={() => changeCardList(4)}
        >
          <div className={`${benefit === 4 ? 'active' : ''}`}>
            <FlightTakeoffOutlinedIcon />
          </div>
          <span>Du lịch</span>
        </div>
        <button
          type="button"
          onClick={() => chooseThisBenefit()}
          className="btn btnSubmit"
        >
          Tiếp tục
        </button>
      </div>
    </JarvisFormStyle>
  );
}
