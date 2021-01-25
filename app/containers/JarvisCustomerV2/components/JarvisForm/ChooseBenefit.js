import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import cashback from 'images/cashback.png';
import money from 'images/money.png';
import reward from 'images/reward.png';
import travel from 'images/travel.png';
import no1Card from 'images/cards/no1-card.png';
import mc2Card from 'images/cards/mc2-card.png';
import platinumCard from 'images/cards/platinum-card.png';
import titaniumCashbackCard from 'images/cards/titanium-cashback.png';
import platinumCashbackCard from 'images/cards/platinum-cashback.png';
import platinumTravelCard from 'images/cards/platinum-travel.png';
import vnaCard from 'images/cards/vna-card.png';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as Actions from '../../actions';

const CASHBACK = [
	{ img: titaniumCashbackCard, id: 'titaniumcb' },
	{ img: platinumCashbackCard, id: 'platinumcb' },
]

const TRAVEL = [
	{ img: platinumTravelCard, id: 'platinumtravel' },
	{ img: vnaCard, id: 'vna' },
]

const REWARD = [
	{ img: mc2Card, id: 'mc2' },
	{ img: platinumCard, id: 'platinum' },
]

const MONEY = [
	{ img: no1Card, id: 'no1' },
]


export default function Round2Confirm(props) {


	const ref = useRef({});

	const [checkLimit, setCheckLimit] = useState(1);
	const [benefit, setBenefit] = useState(1);
	const [cardList, setCardList] = useState(REWARD);
	const [card, setCard] = useState(cardList[0].id);


	const settings = {
		className: "center",
		centerMode: true,
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		afterChange: (current) => setCard(cardList[current].id),
	};

	function changeCardList(benefit) {
		setBenefit(benefit)
		if (benefit === 1) {
			setCardList(REWARD)
			setCard(REWARD[0].id)
		}
		if (benefit === 2) {
			setCardList(MONEY)
			setCard(MONEY[0].id)
		}
		if (benefit === 3) {
			setCardList(TRAVEL)
			setCard(TRAVEL[0].id)
		}
		if (benefit === 4) {
			setCardList(CASHBACK)
			setCard(CASHBACK[0].id)
		}
	}

	function chooseThisCard() {
		let values = {}
		values.card = card
		props.dispatch(Actions.saveData(values));
		props.setStep(0)
	}

	return (
		<JarvisFormStyle>
			<Header className="header" />
			<div className="benefitTitle">Chọn loại thẻ</div>
			<div className="benefitText">Đa dạng lựa chọn, tối đa lợi ích </div>
			<div className="benefitDescription">
				1. Chọn lợi ích bạn muốn có cho thẻ của mình
			</div>
			<div className="benefitWrapper">
				<div
					className={`benefitItem`}
					onClick={() => changeCardList(1)}
				>
					<div className={`${benefit === 1 ? 'active' : ''}`}>
						<img src={reward} />
					</div>
					<span>Điểm thưởng</span>
				</div>
				<div
					className={`benefitItem`}
					onClick={() => changeCardList(2)}
				>
					<div className={`${benefit === 2 ? 'active' : ''}`}>
						<img src={money} />
					</div>
					<span>Rút tiền mặt</span>
				</div>
			</div>
			<div className="benefitWrapper">
				<div
					className={`benefitItem`}
					onClick={() => changeCardList(3)}
				>
					<div className={`${benefit === 3 ? 'active' : ''}`}>
						<img src={travel} />
					</div>
					<span>Vé máy bay miễn phí</span>
				</div>
				<div
					className={`benefitItem`}
					onClick={() => changeCardList(4)}
				>
					<div className={`${benefit === 4 ? 'active' : ''}`}>
						<img src={cashback} />
					</div>
					<span>Hoàn tiền</span>
				</div>
			</div>
			<div className="benefitDescription">2. Chọn loại thẻ</div>
			<div className="sliderWrapper">
				<Slider ref={ref} {...settings}>
					{cardList.map((item, index) => {
						return (
							<div className="slideItem">
								<img src={item.img} />
							</div>
						)
					})}
				</Slider>
				<div className="cardBenefit">
					<div className="cardBenefitItem">
						<div className="benefitPercent">6%</div>
						<div className="cardBenefitDescription">Hoàn tiền cho mua sắm Online (thời trang, công nghệ, sách báo), Grab, Be, Goviet</div>
					</div>
					<div className="cardBenefitItem">
						<div className="benefitPercent">2%</div>
						<div className="cardBenefitDescription">Hoàn tiền cho ăn uống, xem phim</div>
					</div>
					<div className="cardBenefitItem">
						<div className="benefitPercent">0.3%</div>
						<div className="cardBenefitDescription">Cho các chi tiêu còn lại</div>
					</div>
					<div className="cardBenefitItem">
						<div className="benefitPercent">600K</div>
						<div className="cardBenefitDescription">Hoàn tiền tối đa 600.000VNĐ/tháng</div>
					</div>
				</div>
				<button type="button" onClick={() => chooseThisCard()} className="btn btnSubmit">
					Tiếp tục
        		</button>
			</div>
		</JarvisFormStyle>
	)
}


