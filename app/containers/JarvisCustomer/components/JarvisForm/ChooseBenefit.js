import React, { useState, useEffect } from 'react';
import JarvisFormStyle from './JarvisFormStyle';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import cashback from 'images/cashback.png';
import money from 'images/money.png';
import reward from 'images/reward.png';
import travel from 'images/travel.png';
import * as yup from 'yup';
import Header from './Header';

const schema = yup.object().shape({
	auth_email: yup
		.string()
		.email('This field must be a valid email')
		.required('Email is required'),
	password: yup.string().required('Password is required'),
});

export default function Round2Confirm(props) {

	const { register, handleSubmit, errors } = useForm({
		reValidateMode: 'onChange',
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues: {},
		resolver: yupResolver(schema),
	});

	function onSubmitForm() {

	}

	const [checkLimit, setCheckLimit] = useState(1);
	useEffect(() => {
		setTimeout(() => {
			setCheckLimit(checkLimit + 1);
		}, 1000);
	});

	return (
		<JarvisFormStyle>
			<Header className="header" />
			<div className="benefitTitle">Chọn loại thẻ</div>
			<div className="benefitText">Đa dạng lựa chọn, tối đa lợi ích </div>
			<div className="benefitDescription">
				1. Chọn lợi ích bạn muốn có cho thẻ của mình
			</div>
			<div className="benefitWrapper">
				<div className="benefitItem">
					<img src={reward} />
					<span>Điểm thưởng</span>
				</div>
				<div className="benefitItem">
					<img src={money} />
					<span>Rút tiền mặt</span>
				</div>
			</div>
			<div className="benefitWrapper">
				<div className="benefitItem">
					<img src={travel} />
					<span>Vé máy bay miễn phí</span>
				</div>
				<div className="benefitItem">
					<img src={cashback} />
					<span>Hoàn tiền</span>
				</div>
			</div>
		</JarvisFormStyle>
	)
}


