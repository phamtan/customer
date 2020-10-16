import React, { useState } from 'react';
import JarvisFormStyle from './JarvisFormStyle';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import logo from 'images/logo.png';
import Modal from 'react-bootstrap/Modal'
import Header from './Header';
import registerSuccess from 'images/register-success.svg';

const schema = yup.object().shape({
	auth_email: yup
		.string()
		.email('This field must be a valid email')
		.required('Email is required'),
	password: yup.string().required('Password is required'),
});

export default function ConfirmDocument(props) {

	const { register, handleSubmit, errors } = useForm({
		reValidateMode: 'onChange',
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues: {},
		resolver: yupResolver(schema),
	});

	function onSubmitForm() {

	}
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<JarvisFormStyle>
			<Header className="header" />
			<div className="roundTitle">BƯỚC 5:</div>
			<div className="roundName">NỘP HỒ SƠ</div>
			<div className="confirmTitle">Hồ sơ của bạn cần bổ sung các giấy tờ bản cứng, bạn muốn sử dụng hình thức nào dưới đây để thực hiện?</div>
			<form onSubmit={handleSubmit(onSubmitForm)}>
				<div className="virtualcardConfirm">Chọn hình thức nộp giấy tờ</div>
				<div className="formWrapper">
					<div className="radioWrapper">
						<input
							className="form-control radioControl"
							name="fullName"
							type="radio"
							ref={register}
						/> Chi nhánh
						</div>
					<div className="radioWrapper">
						<input
							className="form-control radioControl"
							name="fullName"
							type="radio"
							ref={register}
						/> Field Sale
						{errors.fullName && (
							<span className="formError">{errors.fullName.message}</span>
						)}
					</div>

					<div className="docRequired">
						<i>Với hình thức này, nhân viên của VPBank sẽ liên lạc với bạn trong giây lát và sẽ tới gặp bạn để thu hồ sơ. Các giấy tờ cần chuẩn bị:</i>
						<b>- CMND</b>
						<b>- Bảng sao kê lương</b>
						<b>- Mã số thuế</b>
						<b>- Bản SYLL trích ngang</b>
						<b>- Giấy đăng ký kết hôn</b>
						<b>- Hộ khẩu</b>
					</div>

					<button onClick={() => props.setStep(14)} type="button" className="btn btnSubmit">
						Tiếp tục
        </button>
				</div>
			</form>
		</JarvisFormStyle>
	)
}


