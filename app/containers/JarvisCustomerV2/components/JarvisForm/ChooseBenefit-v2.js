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
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Slider from '@material-ui/core/Slider';
import Check from '@material-ui/icons/Check';
import clsx from 'clsx';
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
    width: '100%',
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

const PrettoRedSlider = withStyles({
  root: {
    color: '#d6121a',
    height: 8,
    width: '100%',
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

const useStyles = makeStyles(theme => ({
  stepperRoot: {
    width: '100%',
    color: '#028547',
    backgroundColor: '#f7f8f8',
    border: '1px solid white',
    height: '38px',
    marginLeft: '0px',
    marginTop: '16px',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  step: {
    '&$completed': {
      color: 'lightgreen',
    },
    '&$active': {
      color: '#028547',
    },
  },
  active: {
    color: '#028547',
  },
  stepperBackground: {
    backgroundColor: '#f7f8f8',
  },
  labelContainer: {
    '&$alternativeLabel': {
      marginTop: 0,
    },
  },
  titleHeader: {
    fontSize: '24px',
    width: '100%',
    textAlign: 'center',
    marginTop: '16px',
    marginBottom: '24px',
  },
  cardStyle: {
    width: '90%',
    marginLeft: '16px',
    marginRight: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '157px',
    marginBottom: '16px',
  },
  titleCard: {
    marginBottom: '48px',
  },
}));

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
    value: 8,
    label: '8',
  },
  {
    value: 10,
    label: '10',
  },
  {
    value: 12,
    label: '12',
  },
  {
    value: 14,
    label: '14',
  },
  {
    value: 16,
    label: '16',
  },
  {
    value: 18,
    label: '18',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 22,
    label: '22',
  },
  {
    value: 24,
    label: '24',
  },
  {
    value: 26,
    label: '26',
  },
  {
    value: 28,
    label: '28',
  },
  {
    value: 30,
    label: '30',
  },
  {
    value: 32,
    label: '32+',
  },
];

export default function Round2Confirm(props) {
  const classes = useStyles();
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

  function valueLabelFormat(value) {
    return value;
  }

  return (
    <JarvisFormStyle>
      <Header className="header" />

      <div className={classes.titleHeader}>
        <span>Xin chào</span>
        <div>Nhập thông tin của bạn để mở thẻ tín dụng mới.</div>
      </div>

      <Card className={classes.cardStyle}>
        <CardContent className={classes.cardStyle}>
          <div className={classes.titleCard}>Thu nhập hàng tháng</div>
          <PrettoSlider
            defaultValue={17}
            aria-labelledby="discrete-slider-custom"
            valueLabelDisplay="on"
            marks={marks}
            valueLabelFormat={valueLabelFormat}
            min={8}
            max={32}
            onChange={value => setAmount(value)}
          />
        </CardContent>
      </Card>
      <Card className={classes.cardStyle}>
        <CardContent className={classes.cardStyle}>
          <div className={classes.titleCard}>Tổng chi tiêu hàng tháng</div>
          <PrettoRedSlider
            defaultValue={17}
            aria-labelledby="discrete-slider-custom"
            valueLabelDisplay="on"
            step={null}
            marks={marks}
            min={8}
            max={32}
            valueLabelFormat={valueLabelFormat}
            onChange={value => setSpend(value)}
          />
        </CardContent>
      </Card>
      <div>
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
