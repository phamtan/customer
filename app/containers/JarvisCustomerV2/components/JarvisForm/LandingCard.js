/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabList from '@material-ui/lab/TabList';
import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';
import Slider from 'react-slick';
import clsx from 'clsx';
import cashbackIcon from 'images/benefit/cashbackicon.svg';
import loyaltyIcon from 'images/benefit/loyaltyicon.svg';
import healthIcon from 'images/benefit/health.svg';
import shopeeIcon from 'images/benefit/shopee.svg';
import mobifoneIcon from 'images/benefit/mobifone.svg';
import travelIcon from 'images/benefit/travel.svg';
import withdrawIcon from 'images/benefit/withdraw.svg';
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
import Header from './Header';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import dataCard from 'images/data.json';
import * as Actions from '../../actions';

import JarvisFormStyle from './JarvisFormStyle';

const useStyles = makeStyles(() => ({
  sliderStyle: {
    width: '100%',
    paddingLeft: '16px',
    backgroundColor: 'transparent',
    border: 'none',
  },
  pageHeader: {
    width: '100%',
    padding: '24px 24px 16px 16px',
    fontSize: '24px',
    pointerEvents: 'none',
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
    paddingLeft: '24px',
    marginTop: '16px',
  },
  openCardBtn: {
    width: '90%',
    height: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    backgroundColor: '#028547',
    border: 'none',
    color: 'white',
  },
  compareCardBtn: {
    width: '90%',
    height: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    backgroundColor: '#018786',
    border: 'none',
    color: 'white',
    marginTop: '4px',
  },
  sliderItem: {
    width: '190px !important',
    marginBottom: '16px',
  },
  imageSlide: {
    width: '198px !important',
    height: '145px',
  },
  tabStyle: {
    width: '100%',
    height: '48px',
    backgroundColor: '#028547',
    color: 'white',
    paddingLeft: '24px',
  },
  indicator: {
    backgroundColor: 'white',
  },
  tabItem: {
    width: '152px',
  },
  cardTitle: {
    width: '100%',
    fontSize: '16px',
    textAlign: 'left',
    paddingLeft: '16px',
    textTransform: 'uppercase',
    fontWeight: 'normal',
    marginBottom: '4px',
    marginTop: '-10px',
  },
  cardbenefit: {
    width: '90%',
    maxWidth: '84px',
    height: '24px',
    borderRadius: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '16px',
  },
}));

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  lazyLoad: true,
  centerMode: false,
  variableWidth: true,
  arrows: false,
};

export default function LandingCard(props) {
  const classes = useStyles();
  const allCard = dataCard.cards;
  const mostRegisCards = allCard.filter(card => card.mostRegis);
  const newCards = allCard.filter(card => card.newCard);

  const [tab, setTab] = React.useState(1);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  function chooseThisCard(cardId) {
    const values = {};
    values.card = cardId;
    values.selectedCard = cardId;
    values.limitType = '1';
    return new Promise((resolve, reject) => {
      props.dispatch(Actions.saveRawData(values, resolve, reject));
    }).then(() => {
      props.setStep(1000);
    });
  }

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

    if (id === 6) {
      return 'Shopee';
    }

    return '';
  }

  return (
    <JarvisFormStyle>
      <Header className="header" />
      <TabContext value={tab}>
        <TabList
          className={classes.tabStyle}
          onChange={handleChange}
          classes={{
            indicator: classes.indicator,
          }}
        >
          <Tab className={classes.tabItem} label="THẺ" value={1} />
          <Tab className={classes.tabItem} label="VAY" value={2} />
          <Tab className={classes.tabItem} label="XE HƠI" value={3} />
        </TabList>
        {tab === 1 && (
          <>
            <div className={classes.pageHeader}>Chọn sản phẩm phù hợp</div>
            <div className={classes.sectionTilte}>
             Danh mục thẻ theo lợi ích {'>'}
            </div>
            <Slider {...settings} className={clsx("benefit", classes.sliderStyle)}>
              <div width={170}>
                <img src={cashbackIcon} alt="cashback" />
              </div>
              <div width={170}>
                <img src={loyaltyIcon} alt="loyalty" />
              </div>
              <div width={170}>
                <img src={healthIcon} alt="health" />
              </div>
              <div width={170}>
                <img src={travelIcon} alt="travel" />
              </div>
              <div width={170}>
                <img src={shopeeIcon} alt="shopee" />
              </div>
              <div width={170}>
                <img src={mobifoneIcon} alt="mobifone" />
              </div>
              <div width={170}>
                <img src={withdrawIcon} alt="withdraw" />
              </div>
            </Slider>
            <div className={classes.sectionTilte}>
              Thẻ được đăng ký nhiều {'>'}
            </div>
            <Slider {...settings} className={clsx("card", classes.sliderStyle)}>
              {mostRegisCards && mostRegisCards.map(card => (
                <div className={classes.sliderItem}>
                  <div className="imageSlide">
                    <img
                      className={classes.imageSlide}
                      src={getCardImage(card.id_int)}
                      alt="cashback"
                    />
                    <div className={classes.cardTitle}>{card.name}</div>
                    <div className={classes.cardbenefit}>{getCardBenefit(card.benefit_id)}</div>
                  </div>
                  <div className="floatAction">
                    <button
                      type="button"
                      onClick={() => chooseThisCard(card.id_int)}
                      className={classes.openCardBtn}
                    >
                      Mở thẻ
                    </button>
                    <button
                      type="button"
                      // onClick={() => props.setStep(17)}
                      className={classes.compareCardBtn}
                    >
                      So sánh
                    </button>
                  </div>
              </div>
            ))}
            </Slider>
            <div className={classes.sectionTilte}>Thẻ mới phát hành {'>'}</div>
            <Slider {...settings} className={clsx("card", classes.sliderStyle)}>
              {newCards && newCards.map(card => (
                <div className={classes.sliderItem}>
                  <div className="imageSlide">
                    <img
                      className={classes.imageSlide}
                      src={getCardImage(card.id_int)}
                      alt="cashback"
                    />
                    <div className={classes.cardTitle}>{card.name}</div>
                    <div className={classes.cardbenefit}>{getCardBenefit(card.benefit_id)}</div>
                  </div>
                  <div className="floatAction">
                    <button
                      type="button"
                      onClick={() => chooseThisCard(card.id_int)}
                      className={classes.openCardBtn}
                    >
                      Mở thẻ
                    </button>
                    <button
                      type="button"
                      // onClick={() => props.setStep(17)}
                      className={classes.compareCardBtn}
                    >
                      So sánh
                    </button>
                  </div>
              </div>
            ))}
            </Slider>
            <div
              className={classes.showAllCard}
              onClick={() => props.setStep(16)}
            >
              Xem tất cả các thẻ tín dụng VPBank
            </div>
          </>
        )}
      </TabContext>
    </JarvisFormStyle>
  );
}
