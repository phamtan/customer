/* eslint-disable jsx-a11y/alt-text */
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
import TextField from '@material-ui/core/TextField';
import logo from 'images/logo-vp.svg';
import _ from 'lodash';
import dataCard from 'images/data.json';
import platinumCashbackCard from 'images/cards/platinum-cashback.png';
import stepupCard from 'images/cards/step-up-card.png';
import ladyCard from 'images/cards/lady-card.png';
import mobiClassicCard from 'images/cards/mobi-classic.png';
import mobiPlatinumCard from 'images/cards/mobi-platinum-card.png';
import mobiTitaniumCard from 'images/cards/mobi-titanium-card.png';
import californiacenturyon from 'images/cards/californiacenturyonhorizon.png';
import californiaplatinum from 'images/cards/californiaplatinum.png';
import platinumTravel from 'images/cards/platinum-travel.png';
import shopeesuper from 'images/cards/shopeesuper.png';
import signatureTravel from 'images/cards/signature-travel.png';
import theshopee from 'images/cards/theshopee.png';
import titaniumcashback from 'images/cards/titanium-cashback.png';
import travelgold from 'images/cards/travelgold.png';
import no1Card from 'images/cards/no1-card.png';
import mc2Card from 'images/cards/mc2-card.png';
import vnaCard from 'images/cards/vna-card.png';
import platinumCard from 'images/cards/platinum-card.png';
import congrat from 'images/congrat.png';
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
  pageContainer: {
    marginTop: '16px',
    width: '100%',
    maxWidth: '470px',
    backgroundColor: 'white',
    marginBottom: '16px',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
    width: '96%',
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
    width: '95%',
    height: '46px',
    textAlign: 'center',
    borderRadius: '4px',
    backgroundColor: '#028547',
    color: 'white',
    fontSize: '14px',
    border: 'none',
    textTransform: 'uppercase',
    marginBottom: '32px',
  },
  cardTitle: {
    fontSize: '14px',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  limitText: {
    fontSize: '16px',
    color: '#117f8a',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputLimit: {
    width: '40px',
    marginLeft: '6px',
  },
  cardImage: {
    width: '258px',
    margin: 'auto',
    zIndex: '10',
  },
  congrat: {
    marginTop: '-120px',
  },
  congratContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  congratText: {
    fontFamily: 'Roboto',
    fontSize: '24px',
    lineHeight: '1.33',
    letterSpacing: '0.18px',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: '400',
  },
  congratSubText: {
    fontFamily: 'Roboto',
    fontSize: '16px',
    lineHeight: '1.5',
    letterSpacing: '0.15px',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: '400',
    marginTop: '16px',
    marginBottom: '10px',
  },
  congratLimit: {
    fontSize: '16px',
    marginBottom: '16px',
  },
}));

export default function ChooseLimit(props) {
  const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', {});
  const { cards } = dataCard;
  const classes = useStyles();
  const [amount, setAmount] = useState(card ? Number(card.maxLimit) * 0.5 : 30);
  const card = cards.filter(card => card.id_int === 1)[0];

  useEffect(() => {
    if (card) {
      setAmount(
        jarvisCustomer && jarvisCustomer.finalApprovedLimit
          ? jarvisCustomer.finalApprovedLimit
          : 10,
      );
    } else {
      props.history.push('/v2');
    }
  }, [card]);

  function getCardImage(id) {
    if (id === 1) {
      return mc2Card;
    }
    if (id === 2) {
      return ladyCard;
    }
    if (id === 3) {
      return stepupCard;
    }
    if (id === 4) {
      return platinumCard;
    }
    if (id === 5) {
      return vnaCard;
    }
    if (id === 6) {
      return mobiClassicCard;
    }
    if (id === 7) {
      return mobiPlatinumCard;
    }
    if (id === 8) {
      return mobiTitaniumCard;
    }
    if (id === 9) {
      return no1Card;
    }
    if (id === 10) {
      return platinumCashbackCard;
    }
    if (id === 11) {
      return platinumTravel;
    }
    if (id === 12) {
      return titaniumcashback;
    }
    if (id === 13) {
      return californiaplatinum;
    }
    if (id === 14) {
      return californiacenturyon;
    }
    if (id === 15) {
      return travelgold;
    }
    if (id === 16) {
      return signatureTravel;
    }
    if (id === 17) {
      return theshopee;
    }
    if (id === 18) {
      return shopeesuper;
    }
    return vnaCard;
  }

  function chooseThisBenefit() {
    const values = jarvisCustomer;
    values.requestLimit = amount * 1000000;
    props.dispatch(Actions.saveRawData(values));
    props.history.push('/v2/begin');
  }

  function updateLimit(event, newValue) {
    const { maxLimit } = card;
    if (newValue && newValue > Number(maxLimit)) {
      props.handleShoMessage({
        message: 'Không được nhập lớn hơn hạn mức tối đa của thẻ',
        severity: 'error',
      });
    } else {
      setAmount(newValue);
    }
  }

  function updateLimitText(value) {
    const { maxLimit, minLimit } = card;
    if (value && (value > Number(maxLimit) || value < Number(minLimit))) {
      props.handleShoMessage({
        message: 'Không được nhập hạn mức ngoài hạn mức của thẻ',
        severity: 'error',
      });
    } else {
      setAmount(value);
    }
  }

  function getMarks() {
    const { minLimit } = card;
    const { maxLimit } = card;
    const marks = [];
    marks.push({ value: Number(minLimit), label: minLimit });
    marks.push({
      value: Number(maxLimit) * 0.25,
      label: Number(maxLimit) * 0.25,
    });
    marks.push({
      value: Number(maxLimit) * 0.5,
      label: Number(maxLimit) * 0.5,
    });
    marks.push({
      value: Number(maxLimit) * 0.75,
      label: Number(maxLimit) * 0.75,
    });
    marks.push({ value: Number(maxLimit), label: maxLimit });

    return marks;
  }

  return (
    <JarvisFormStyle>
      <Header className="header" />
      <div className={classes.pageContainer}>
        <div className={classes.titleHeader}>
          <div>Chọn hạn mức phù hợp</div>
        </div>
        <div className={classes.congratContainer}>
          <img
            className={classes.cardImage}
            src={getCardImage(card ? card.id_int : 1)}
          />
          <img className={classes.congrat} src={congrat} />
        </div>

        <div className={classes.congratText}>Xin chúc mừng</div>
        <div className={classes.congratSubText}>
          Bạn <b>đủ điều kiện</b> để đăng ký <b>{card.name}</b>
        </div>
        <div className={classes.congratLimit}>
          Hạn mức bạn được phê duyệt là{' '}
          <b>
            {jarvisCustomer && jarvisCustomer.finalApprovedLimit
              ? jarvisCustomer.finalApprovedLimit
              : ''}{' '}
            triệu VNĐ
          </b>
        </div>

        <Card className={classes.cardStyle}>
          <CardContent className={classes.cardStyle}>
            <div className={classes.cardContainer}>
              <div className={classes.cardTitle}>{card ? card.name : ''}</div>
              <div>{card ? card.comparison.table_1.creditLimit : ''}</div>
            </div>
            <Divider className={classes.dividerStyle} />
            <div className={classes.cardName}>
              <img src={logo} alt="vpbank" />
              <div className={classes.nameStyle}>{card ? card.name : ''}</div>
            </div>
            <Divider className={classes.dividerStyle} />
            <div className={classes.guiline}>Kéo để tăng giảm hạn mức</div>
            <PrettoSlider
              defaultValue={card ? Number(card.maxLimit) * 0.5 : 20}
              aria-labelledby="discrete-slider-custom"
              valueLabelDisplay="on"
              marks={getMarks()}
              min={card ? Number(card.minLimit) : 10}
              max={card ? Number(card.maxLimit) : 100}
              step={10}
              value={amount}
              onChange={updateLimit}
            />
            <div className={classes.limitText}>
              <span>Hạn mức bạn chọn là:</span>
              <TextField
                className={classes.inputLimit}
                id="outlined-basic"
                value={amount}
                onChange={e => updateLimitText(e.target.value)}
              />
              <span>triệu VNĐ</span>
            </div>
          </CardContent>
        </Card>
        <button
          type="button"
          onClick={() => chooseThisBenefit()}
          className={classes.action}
        >
          Tiếp tục
        </button>
      </div>
    </JarvisFormStyle>
  );
}
