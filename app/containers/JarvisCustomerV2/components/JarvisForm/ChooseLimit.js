/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Slider from '@material-ui/core/Slider';
import Divider from '@material-ui/core/Divider';
import logo from 'images/logo-vp.svg';
import _ from 'lodash';
import dataCard from 'images/data.json';
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
    marginTop: '56px',
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

const useStyles = makeStyles(() => ({
  titleHeader: {
    fontSize: '24px',
    width: '100%',
    textAlign: 'center',
    marginTop: '16px',
    marginBottom: '24px',
  },
  cardStyle: {
    width: '95%',
    marginLeft: '16px',
    marginRight: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '16px',
  },
  titleCard: {
    marginBottom: '48px',
  },
  cardContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '16px',
    marginBottom: '24px',
  },
  dividerStyle: {
    color: '#117f8a',
    backgroundColor: '#117f8a',
    width: '100%',
  },
  cardName: {
    color: '#117f8a',
    marginTop: '18px',
    marginBottom: '18px',
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameStyle: {
    paddingTop: '10px',
    paddingLeft: '4px',
    color: '#028547',
    textTransform: 'uppercase',
  },
  guiline: {
    width: '100%',
    fontSize: '16px',
    color: 'black',
    textAlign: 'center',
    marginTop: '7px',
  },
  action: {
    width: '382px',
    height: '46px',
    margin: '28px 16px 28px',
    padding: '15px 159.4px 15px 105.6px',
    borderRadius: '4px',
    backgroundColor: '#028547',
    color: 'white',
    fontSize: '14px',
    border: 'none',
    textTransform: 'uppercase',
  },
}));

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

export default function ChooseLimit(props) {
  const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', {});
  const { cards } = dataCard;
  const classes = useStyles();
  const [amount, setAmount] = useState(30);
  const card = cards.filter(
    card => card.id_int === jarvisCustomer.selectedCard,
  )[0];

  function chooseThisBenefit() {
    const values = {};
    values.amount = amount;
    props.dispatch(Actions.saveData(values));
    props.setStep(0);
  }

  function valueLabelFormat(value) {
    return value;
  }

  return (
    <JarvisFormStyle>
      <Header className="header" />

      <div className={classes.titleHeader}>
        <div>Chọn hạn mức phù hợp</div>
      </div>

      <Card className={classes.cardStyle}>
        <CardContent className={classes.cardStyle}>
          <div className={classes.cardContainer}>
            <div>{card.name}</div>
            <div>140,000,000 VNĐ</div>
          </div>
          <Divider className={classes.dividerStyle} />
          <div className={classes.cardName}>
            <img src={logo} alt="vpbank" />
            <div className={classes.nameStyle}>{card.name}</div>
          </div>
          <Divider className={classes.dividerStyle} />
          <div className={classes.guiline}>Kéo để tăng giảm hạn mức</div>
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
      <button
        type="button"
        onClick={() => chooseThisBenefit()}
        className={classes.action}
      >
        Tiếp tục
      </button>
    </JarvisFormStyle>
  );
}
