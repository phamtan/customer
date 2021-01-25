/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from 'react-slick';
import cashbackIcon from 'images/benefit/cashbackicon.svg';
import loyaltyIcon from 'images/benefit/loyaltyicon.svg';
import healthIcon from 'images/benefit/health.svg';
import shopeeIcon from 'images/benefit/shopee.svg';
import mobifoneIcon from 'images/benefit/mobifone.svg';
import travelIcon from 'images/benefit/travel.svg';
import withdrawIcon from 'images/benefit/withdraw.svg';
import platinumCashbackCard from 'images/cards/platinum-cashback.png';
import platinumTravelCard from 'images/cards/platinum-travel.png';
import californiacenturyon from 'images/cards/californiacenturyonhorizon.png';
import no1 from 'images/cards/no1-card.png';
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
}));

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  lazyLoad: true,
  variableWidth: false,
};

export default function LandingCard(props) {
  const classes = useStyles();

  function chooseThisCard(cardId) {
    const values = {};
    values.card = cardId;
    values.selectedCard = cardId;
    values.limitType = '1';
    props.dispatch(Actions.saveData(values));
    props.setStep(1000);
  }

  return (
    <JarvisFormStyle>
      <Header className="header" />
      <div className={classes.pageHeader}>Chọn sản phẩm phù hợp</div>
      <div className={classes.sectionTilte}>
        Chọn loại thẻ theo lợi ích {'>'}
      </div>
      <Slider {...settings} className={classes.sliderStyle}>
        <div className={classes.sliderItem} width={170}>
          <img src={cashbackIcon} alt="cashback" />
        </div>
        <div className={classes.sliderItem} width={170}>
          <img src={loyaltyIcon} alt="loyalty" />
        </div>
        <div className={classes.sliderItem} width={170}>
          <img src={healthIcon} alt="health" />
        </div>
        <div className={classes.sliderItem} width={170}>
          <img src={travelIcon} alt="travel" />
        </div>
        <div className={classes.sliderItem} width={170}>
          <img src={shopeeIcon} alt="shopee" />
        </div>
        <div className={classes.sliderItem} width={170}>
          <img src={mobifoneIcon} alt="mobifone" />
        </div>
        <div className={classes.sliderItem} width={170}>
          <img src={withdrawIcon} alt="withdraw" />
        </div>
      </Slider>
      <div className={classes.sectionTilte}>Thẻ được đăng ký nhiều {'>'}</div>
      <Slider {...settings} className={classes.sliderStyle}>
        <div className={classes.sliderItem} width={170}>
          <div className="imageSlide">
            <img src={platinumCashbackCard} alt="cashback" />
          </div>
          <div className="floatAction">
            <button
              type="button"
              onClick={() => chooseThisCard(10)}
              className={classes.openCardBtn}
            >
              Mở thẻ
            </button>
            <button
              type="button"
              onClick={() => props.setStep(17)}
              className={classes.compareCardBtn}
            >
              So sánh
            </button>
          </div>
        </div>
        <div className={classes.sliderItem} width={170}>
          <div className="imageSlide">
            <img src={platinumTravelCard} alt="loyalty" />
          </div>
          <div className="floatAction">
            <button
              type="button"
              onClick={() => chooseThisCard(11)}
              className={classes.openCardBtn}
            >
              Mở thẻ
            </button>
            <button
              type="button"
              onClick={() => props.setStep(17)}
              className={classes.compareCardBtn}
            >
              So sánh
            </button>
          </div>
        </div>
        <div className={classes.sliderItem} width={170}>
          <div className="imageSlide">
            <img src={no1} alt="health" />
          </div>
          <div className="floatAction">
            <button
              type="button"
              onClick={() => chooseThisCard(9)}
              className={classes.openCardBtn}
            >
              Mở thẻ
            </button>
            <button
              type="button"
              onClick={() => props.setStep(17)}
              className={classes.compareCardBtn}
            >
              So sánh
            </button>
          </div>
        </div>
        <div className={classes.sliderItem} width={170}>
          <div className="imageSlide">
            <img src={californiacenturyon} alt="travel" />
          </div>
          <div className="floatAction">
            <button
              type="button"
              onClick={() => chooseThisCard(14)}
              className={classes.openCardBtn}
            >
              Mở thẻ
            </button>
            <button
              type="button"
              onClick={() => props.setStep(17)}
              className={classes.compareCardBtn}
            >
              So sánh
            </button>
          </div>
        </div>
      </Slider>
      <div className={classes.sectionTilte}>Thẻ mới phát hành {'>'}</div>
      <Slider {...settings} className={classes.sliderStyle}>
        <div className={classes.sliderItem} width={170}>
          <div className="imageSlide">
            <img src={platinumCashbackCard} alt="cashback" />
          </div>
          <div className="floatAction">
            <button
              type="button"
              onClick={() => chooseThisCard(10)}
              className={classes.openCardBtn}
            >
              Mở thẻ
            </button>
            <button
              type="button"
              onClick={() => props.setStep(17)}
              className={classes.compareCardBtn}
            >
              So sánh
            </button>
          </div>
        </div>
        <div className={classes.sliderItem} width={170}>
          <div className="imageSlide">
            <img src={platinumTravelCard} alt="loyalty" />
          </div>
          <div className="floatAction">
            <button
              type="button"
              onClick={() => chooseThisCard(11)}
              className={classes.openCardBtn}
            >
              Mở thẻ
            </button>
            <button
              type="button"
              onClick={() => props.setStep(17)}
              className={classes.compareCardBtn}
            >
              So sánh
            </button>
          </div>
        </div>
        <div className={classes.sliderItem} width={170}>
          <div className="imageSlide">
            <img src={no1} alt="health" />
          </div>
          <div className="floatAction">
            <button
              type="button"
              onClick={() => chooseThisCard(9)}
              className={classes.openCardBtn}
            >
              Mở thẻ
            </button>
            <button
              type="button"
              onClick={() => props.setStep(17)}
              className={classes.compareCardBtn}
            >
              So sánh
            </button>
          </div>
        </div>
        <div className={classes.sliderItem} width={170}>
          <div className="imageSlide">
            <img src={californiacenturyon} alt="travel" />
          </div>
          <div className="floatAction">
            <button
              type="button"
              onClick={() => chooseThisCard(14)}
              className={classes.openCardBtn}
            >
              Mở thẻ
            </button>
            <button
              type="button"
              onClick={() => props.setStep(17)}
              className={classes.compareCardBtn}
            >
              So sánh
            </button>
          </div>
        </div>
      </Slider>
      <div className={classes.showAllCard} onClick={() => props.setStep(16)}>
        Xem tất cả các thẻ tín dụng VPBank
      </div>
    </JarvisFormStyle>
  );
}