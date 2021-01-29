/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import no1Card from 'images/cards/no1-card.png';
import mc2Card from 'images/cards/mc2-card.png';
import vnaCard from 'images/cards/vna-card.png';
import platinumCard from 'images/cards/platinum-card.png';
import { makeStyles } from '@material-ui/core/styles';
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
import dataCard from 'images/data.json';
import Header from './Header';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as Actions from '../../actions';

import JarvisFormStyle from './JarvisFormStyle';

const useStyles = makeStyles(() => ({
  sliderStyle: {
    width: '100%',
  },
  sliderItem: {
    // height: '80px',
  },
  pageHeader: {
    width: '100%',
    padding: '24px 24px 16px 16px',
    fontSize: '24px',
    '& .floatAction': {
      display: 'none',
    },
    '&:hover .floatAction': {
      display: 'flex',
    },
    '&:hover': {
      display: 'none !important',
    },
  },
  sectionTilte: {
    width: '100%',
    padding: '0px 24px 16px 16px',
    fontSize: '20px',
    fontWeight: '500',
  },
  showAllCard: {
    width: '100%',
    fontSize: '14px',
    fontWeight: '500',
    color: '#02743e',
    textTransform: 'uppercase',
    marginBottom: '24px',
    marginLeft: '16px',
  },
  openCardBtn: {
    width: '90%',
    height: '38px',
    borderRadius: '4px',
    backgroundColor: '#028547',
    border: 'none',
    color: 'white',
    marginLeft: '8px',
  },
  compareCardBtn: {
    width: '90%',
    height: '38px',
    borderRadius: '4px',
    backgroundColor: '#018786',
    border: 'none',
    color: 'white',
    marginLeft: '8px',
    marginTop: '4px',
  },
  cardContainer: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  cardItem: {
    display: 'flex',
    flexDirection: 'column',
    width: '100px',
    marginBottom: '16px',
    marginLeft: '16px',
  },
  cardTitle: {
    width: '100%',
    fontSize: '12px',
    textAlign: 'center',
    height: '50px',
  },
  cardbenefit: {
    width: '90%',
    height: '24px',
    borderRadius: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function LandingCard(props) {
  const classes = useStyles();
  const allCard = dataCard.cards;

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

  function getCardBenefit(id) {
    if (id === 1) {
      return 'Điểm thưởng';
    }
    if (id === 0) {
      return 'Hoàn tiền';
    }

    if (id === 2) {
      return 'Du lịch';
    }

    return '';
  }

  function chooseThisCard(cardId) {
    const values = {};
    values.card = cardId.id;
    values.selectedCard = cardId;
    values.limitType = '1';
    props.dispatch(Actions.saveRawData(values));
    props.setStep(1000);
  }

  return (
    <JarvisFormStyle>
      <Header className="header" />
      <div className={classes.pageHeader}>Thẻ tín dụng VPBank</div>
      <div className={classes.cardContainer}>
        {allCard &&
          allCard.map(card => (
            <div
              className={classes.cardItem}
              onClick={() => chooseThisCard(card.id_int)}
            >
              <img src={getCardImage(card.id_int)} alt="card" />
              <span className={classes.cardTitle}>{card.name}</span>
              <div className={classes.cardbenefit}>
                {getCardBenefit(card.benefit_id)}
              </div>
            </div>
          ))}
      </div>
    </JarvisFormStyle>
  );
}
