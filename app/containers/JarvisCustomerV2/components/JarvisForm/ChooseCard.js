/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import no1Card from 'images/cards/no1-card.png';
import ladyCard from 'images/cards/lady-card.png';
import stepUpCard from 'images/cards/step-up-card.png';
import mc2Card from 'images/cards/mc2-card.png';
import platinumCard from 'images/cards/platinum-card.png';
import titaniumCashbackCard from 'images/cards/titanium-cashback.png';
import platinumCashbackCard from 'images/cards/platinum-cashback.png';
import platinumTravelCard from 'images/cards/platinum-travel.png';
import vnaCard from 'images/cards/vna-card.png';
import ShopeeCard from 'images/cards/shopeesuper.png';
import CheckIcon from '@material-ui/icons/Check';
import InfoIcon from '@material-ui/icons/Info';
import _ from 'lodash';
import Header from './Header';
import BackButton from './BackButton';
import JarvisFormStyle from './JarvisFormStyle';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as Actions from '../../actions';

const useStyles = makeStyles(() => ({
  iconCheck: {
    color: '#1598cc !important',
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

export default function ChooseCard(props) {
  const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', {});
  const classes = useStyles();
  const [, setBenefit] = useState(1);
  const [cardList, setCardList] = useState(REWARD);
  const [card, setCard] = useState(cardList[0].id);
  const [otherCard, setOtherCard] = useState(cardList[0].id);

  useEffect(() => {
    if (jarvisCustomer) {
      if (jarvisCustomer.benefit === 1) {
        setCard({
          img: ShopeeCard,
          id: 1,
          name: 'Shopee super platinum',
          limit: 100000000,
          benefit: [
            'Tặng 1 Shopee E-Voucher trị giá 200,000 VND cho KH mở thẻ tín dụng Shopee Platinum và đạt tổng doanh số chi tiêu 1 triệu VND trở lên trong vòng 30 ngày kể từ ngày mở thẻ',
            'Tặng 1 mã hoàn 50% giá trị đơn hàng trên Shopee vào tháng sinh nhật. Giá trị hoàn dưới dạng Shopee Xu (tối đa 100,000 xu)',
            'Tặng 04 mã miễn phí vận chuyển (tối đa: 30.000 VND/mã) mỗi tháng, áp dụng cho cho đơn hàng từ 300,000 VND',
          ],
        });
        setOtherCard({
          img: platinumCard,
          id: 2,
          name: 'VPBank Platinum',
          limit: 200000000,
          benefit: [
            'Tặng điểm thưởng cho giao dịch tại siêu thị, cửa hàng tiện lợi, spa, làm đẹp, du lịch và ăn uống 1.000 VNĐ = 12 điểm',
            'Tặng điểm thưởng cho giao dịch còn lại 1.000 VNĐ = 6 điểm',
            'Miễn phí thường niên năm tiếp theo khi chi tiêu từ 90.000.000 VNĐ trở lên',
          ],
        });
      }
      if (jarvisCustomer.benefit === 2) {
        setCard({
          img: platinumCard,
          id: 2,
          name: 'VPBank platinum',
          limit: 200000000,
          benefit: [
            'Tặng điểm thưởng cho giao dịch tại siêu thị, cửa hàng tiện lợi, spa, làm đẹp, du lịch và ăn uống 1.000 VNĐ = 12 điểm',
            'Tặng điểm thưởng cho giao dịch còn lại 1.000 VNĐ = 6 điểm',
            'Miễn phí thường niên năm tiếp theo khi chi tiêu từ 90.000.000 VNĐ trở lên',
          ],
        });
        setOtherCard({
          img: mc2Card,
          id: 3,
          name: 'VPBank MC2',
          limit: 50000000,
          benefit: [
            'Tặng điểm thưởng cho giao dịch tại siêu thị 1.000 VNĐ = 6 điểm',
            'Tặng điểm thưởng cho giao dịch khác 1.000 VNĐ = 3 điểm',
            'Miễn phí thường niên cho năm tiếp theo khi chi tiêu từ 30.000.000 VNĐ trở lên',
          ],
        });
      }
      if (jarvisCustomer.benefit === 3) {
        setCard({
          img: ladyCard,
          id: 4,
          name: 'VPBank Lady',
          limit: 100000000,
          benefit: [
            'Hoàn tiền 6% cho các giao dịch thanh toán Bảo hiểm online',
            'Hoàn tiền 2% cho chi tiêu Giáo dục, Y tế & tại siêu thị (Lotte mart, Big C, Co.op mart, Vinmart)',
            'Hoàn tiền 0.3% cho các chi tiêu còn lại',
            'Hoàn tiền tối đa 600.000VNĐ/tháng',
          ],
        });
        setOtherCard({
          img: stepUpCard,
          id: 5,
          name: 'VPBank Stepup',
          limit: 200000000,
          benefit: [
            'Hoàn tiền 6% cho mua sắm Online (thời trang, công nghệ, sách báo), Grab, Be, Goviet',
            'Hoàn tiền 2% cho ăn uống, xem phim',
            'Hoàn tiền 0.3% cho các chi tiêu còn lại',
            'Hoàn tiền tối đa 600.000VNĐ/tháng',
          ],
        });
      }
      if (jarvisCustomer.benefit === 4) {
        setCard({
          img: platinumTravelCard,
          id: 6,
          name: 'VPBank platinum travel',
          limit: 100000000,
          benefit: [
            'Tặng 6 Travel Miles cho mỗi 1.000VNĐ chi tiêu bằng thẻ',
            'Nhân 1,5 dặm bay cho giao dịch bất kỳ khi tổng sao kê đạt mốc từ 45 triệu trở lên',
            'Nhân đôi Travel Miles cho các giao dịch chi tiêu du lịch, cửa hàng miễn thuế, ăn uống, siêu thị, và giao dịch POS tại nước ngoài',
          ],
        });
        setOtherCard({
          img: vnaCard,
          name: 'VNA',
          limit: 100000000,
          id: 7,
          benefit: [
            'Tích dặm Bông Sen Vàng đối với chi tiêu trong nước 29.000 VNĐ = 1 dặm',
            'Nhân 1,5 dặm bay với chi tiêu quốc tế 29.000 VNĐ = 1,5 dặm',
            'Tặng dặm Bông Sen Vàng khi chi tiêu từ 300 triệu trở lên mỗi năm',
          ],
        });
      }
    }
  }, [jarvisCustomer]);

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

  function chooseThisCard(cardId) {
    const values = {};
    values.card = cardId.id;
    values.selectedCard = cardId;
    values.limitType = '1';
    props.dispatch(Actions.saveData(values));
    props.setStep(996);
  }

  function goBack() {
    props.setStep(998);
  }

  return (
    <JarvisFormStyle>
      <Header className="header" />
      <BackButton className="btnBack" goBack={goBack} />
      <div className="benefitTitle">Chọn loại thẻ</div>
      <div className="benefitText">
        Thẻ tín dụng VPBank phù hợp nhất cho bạn
      </div>
      <div className="benefitDescription">
        1. Thẻ {card ? card.name : ''} là thẻ tín dụng phù hợp nhất cho bạn
      </div>
      <div className="CardWrapper">
        <div className="benefitItem" onClick={() => changeCardList(1)}>
          <img src={card ? card.img : ''} />
        </div>
      </div>
      <button
        type="button"
        onClick={() => chooseThisCard(card)}
        className="btn btnOpen"
      >
        Đăng kí ngay
      </button>
      <div className="titleOther">Quyền lợi</div>
      {card &&
        card.benefit &&
        card.benefit.map(ben => (
          <div className="cardBenefit">
            <CheckIcon className={classes.iconCheck} />
            <span>{ben}</span>
          </div>
        ))}
      <hr className="divider2" />
      <div className="titleOther">Điều kiện</div>
      <div className="cardBenefit">
        <InfoIcon className={classes.iconCheck} />
        <span>
          Cá nhân, là người Việt Nam hoặc người nước ngoài đang sống tại Việt
          Nam, tuổi từ 22 đến 60 tại thời điểm nộp hồ sơ
        </span>
      </div>
      <div className="cardBenefit">
        <InfoIcon className={classes.iconCheck} />
        <span>
          Thu nhập từ 4.500.000 VNĐ/tháng tùy thuộc vào loại thẻ lựa chọn
        </span>
      </div>
      <hr className="divider" />
      <div className="titleOther">Những lựa chọn khác dành cho bạn</div>
      <div className="otherCardWrapper">
        <img src={otherCard ? otherCard.img : ''} />
        <div>
          <div className="nameCard">{otherCard ? otherCard.name : ''}</div>
          <button
            type="button"
            onClick={() => chooseThisCard(otherCard)}
            className="btn btnOpenCard"
          >
            Đăng kí
          </button>
          <a className="learnMore">Tìm hiểu thêm</a>
        </div>
      </div>
      <div className="titleOther">Quyền lợi</div>
      <div className="cardBenefitContainer">
        {otherCard &&
          otherCard.benefit &&
          otherCard.benefit.map(ben => (
            <div className="cardBenefit">
              <CheckIcon className={classes.iconCheck} />
              <span>{ben}</span>
            </div>
          ))}
      </div>
      <hr className="divider2" />
      <div className="titleOther">Điều kiện</div>
      <div className="cardBenefit">
        <InfoIcon className={classes.iconCheck} />
        <span>
          Cá nhân, là người Việt Nam hoặc người nước ngoài đang sống tại Việt
          Nam, tuổi từ 22 đến 60 tại thời điểm nộp hồ sơ
        </span>
      </div>
      <div className="cardBenefit2">
        <InfoIcon className={classes.iconCheck} />
        <span>
          Thu nhập từ 4.500.000 VNĐ/tháng tùy thuộc vào loại thẻ lựa chọn
        </span>
      </div>
    </JarvisFormStyle>
  );
}
