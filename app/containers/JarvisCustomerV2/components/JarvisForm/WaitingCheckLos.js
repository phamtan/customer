/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Slider from '@material-ui/core/Slider';
import Divider from '@material-ui/core/Divider';
import logo from 'images/logo-vp.svg';
import _ from 'lodash';
import dataCard from 'images/data.json';
import backGroundGreen from 'images/backgroundgreen.png';
import Header from './Header';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as Actions from '../../actions';

import JarvisFormStyle from './JarvisFormStyle';

const useStyles = makeStyles(() => ({
  container: {
    backgroundImage: `url(${backGroundGreen})`,
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    backgroundSize: 'contain',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleHeader: {
    fontSize: '24px',
    width: '100%',
    textAlign: 'center',
    marginTop: '16px',
    marginBottom: '24px',
  },
  cardStyle: {
    width: '92%',
    marginLeft: '16px',
    marginRight: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '16px',
    marginTop: '24px',
    minHeight: '85vh'
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
    fontSize: '14px',
    fontWeight: '500',
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
  cardTitle: {
    fontSize: '14px',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  limitText: {
    fontSize: '16px',
    color: '#117f8a',
  }
}));

export default function ChooseLimit(props) {
  const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', {});
  const { cards } = dataCard;
  const classes = useStyles();
  const [amount, setAmount] = useState(card ? Number(card.maxLimit) * 0.5 : 30);
  const card = cards.filter(
    card => card.id_int === jarvisCustomer.selectedCard,
  )[0];

  useEffect(() => {
    if (card) {
      setAmount(Number(card.maxLimit) * 0.5)
    }
  }, [card]);

  function chooseThisBenefit() {
    const values = {};
    values.requestLimit = amount * 1000000;
    props.dispatch(Actions.saveRawData(values));
    props.setStep(0);
  }

  function valueLabelFormat(value) {
    return value;
  }

  function updateLimit(value) {
    setAmount(value);
  }

  function getMarks() {
    const minLimit = card.minLimit;
    const maxLimit = card.maxLimit;
    let marks = [];
    marks.push({value: Number(minLimit), label: minLimit});
    marks.push({value: Number(maxLimit) * 0.25, label: Number(maxLimit) * 0.25});
    marks.push({value: Number(maxLimit) * 0.5, label: Number(maxLimit) * 0.5});
    marks.push({value: Number(maxLimit) * 0.75, label: Number(maxLimit) * 0.75});
    marks.push({value: Number(maxLimit), label: maxLimit});
    
    return marks;
  }

  return (
    <JarvisFormStyle>
      <div className={classes.container}>
      <Card className={classes.cardStyle}>
        <CardContent className={classes.cardStyle}>
          <div className={classes.cardContainer}>
          <div className={classes.limitText}>Hạn mức bạn chọn là: {amount} triệu VNĐ</div>
          </div>
          <button
            type="button"
            onClick={() => chooseThisBenefit()}
            className={classes.action}
          >
            Tiếp tục
          </button>
        </CardContent>
      </Card>
      
      </div>
    </JarvisFormStyle>
  );
}
