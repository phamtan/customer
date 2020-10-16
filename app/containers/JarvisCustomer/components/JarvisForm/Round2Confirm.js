import React from 'react';
import JarvisFormStyle from './JarvisFormStyle';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
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

	return (
		<JarvisFormStyle>
			<Header className="header" />
			<div className="roundTitle">BƯỚC 2:</div>
			<div className="roundName">CHỨNG MINH THU NHẬP & KIỂM TRA HẠN MỨC</div>
			<form onSubmit={handleSubmit(onSubmitForm)}>
				<div className="redNote">
					<div>- Để chứng minh thu nhập bạn cần cung cấp sao kê bảng lương ít nhất 3 tháng</div>
					<div>- Bản sao kê phải có dấu đỏ của ngân hàng và không được trước thời điểm tháng 1 năm 2020</div>
					<div>- Chúng tôi sẽ chưa yêu cầu ngay tại thời điểm này, nhưng bạn cần chuẩn bị để nộp sau này</div>
				</div>
				<div className="virtualcardConfirm">Bạn có đảm bảo cung cấp được sao kê chứng minh thu nhập như yêu cầu không?</div>
				<div className="formWrapper">
					<div className="radioWrapper">
						<input
							className="form-control radioControl"
							name="fullName"
							type="radio"
							ref={register}
						/> Có
						</div>
					<div className="radioWrapper">
						<input
							className="form-control radioControl"
							name="fullName"
							type="radio"
							ref={register}
						/> Không
						{errors.fullName && (
							<span className="formError">{errors.fullName.message}</span>
						)}
					</div>

					<button onClick={() => props.setStep(7)} type="button" className="btn btnSubmit">
						Tiếp tục
        			</button>
				</div>
			</form>
		</JarvisFormStyle>
	)
}


