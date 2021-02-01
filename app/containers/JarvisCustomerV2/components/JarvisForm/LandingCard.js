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
import cashbackIcon from 'images/benefit/cashbackicon.svg';
import loyaltyIcon from 'images/benefit/loyaltyicon.svg';
import healthIcon from 'images/benefit/health.svg';
import shopeeIcon from 'images/benefit/shopee.svg';
import mobifoneIcon from 'images/benefit/mobifone.svg';
import travelIcon from 'images/benefit/travel.svg';
import withdrawIcon from 'images/benefit/withdraw.svg';
import shopeesuper from 'images/cards/shopeesuper.png';
import stepupCard from 'images/cards/step-up-card.png';
import ladyCard from 'images/cards/lady-card.png';
import theshopee from 'images/cards/theshopee.png';
import platinumTravel from 'images/cards/platinum-travel.png';
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
    paddingLeft: '16px',
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
    paddingLeft: '16px',
  },
  openCardBtn: {
    width: '90%',
    height: '38px',
    borderRadius: '4px',
    backgroundColor: '#028547',
    border: 'none',
    color: 'white',
    paddingLeft: '8px',
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
  sliderItem: {
    width: '190px !important',
    margin: '16px 3px 36px 0',
  },
  imageSlide: {
    width: '198px',
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
              Chọn loại thẻ theo lợi ích {'>'}
            </div>
            <Slider {...settings} className={classes.sliderStyle}>
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
            <Slider {...settings} className={classes.sliderStyle}>
              <div className={classes.sliderItem}>
                <div className="imageSlide">
                  <img
                    className={classes.imageSlide}
                    src={shopeesuper}
                    alt="cashback"
                  />
                </div>
                <div className="floatAction">
                  <button
                    type="button"
                    onClick={() => chooseThisCard(18)}
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
              <div className={classes.sliderItem}>
                <div className="imageSlide">
                  <img
                    className={classes.imageSlide}
                    src={stepupCard}
                    alt="loyalty"
                  />
                </div>
                <div className="floatAction">
                  <button
                    type="button"
                    onClick={() => chooseThisCard(3)}
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
              <div className={classes.sliderItem}>
                <div className="imageSlide">
                  <img
                    className={classes.imageSlide}
                    src={ladyCard}
                    alt="health"
                  />
                </div>
                <div className="floatAction">
                  <button
                    type="button"
                    onClick={() => chooseThisCard(2)}
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
                  <img src={shopeesuper} alt="cashback" />
                </div>
                <div className="floatAction">
                  <button
                    type="button"
                    onClick={() => chooseThisCard(18)}
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
                  <img src={theshopee} alt="loyalty" />
                </div>
                <div className="floatAction">
                  <button
                    type="button"
                    onClick={() => chooseThisCard(17)}
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
                  <img src={platinumTravel} alt="health" />
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
