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

export default function RegisterVirtualCard(props) {

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
			<div className="roundTitle">BƯỚC 4:</div>
			<div className="roundName">CHỌN LOẠI THẺ</div>
			<div className="confirmTitle">Mở thẻ ảo</div>
			<form onSubmit={handleSubmit(onSubmitForm)}>
				<div className="formWrapper">
					<div className="form-group">
						<label>Hạn mức thẻ ảo</label>
						<input
							className="form-control formControl"
							name="virtualLimit"
							placeholder="Hạn mức"
							ref={register}
						/>
						{errors.virtualLimit && (
							<span className="formError">{errors.virtualLimit.message}</span>
						)}
					</div>
				</div>
				<div className="virtualcardConfirm">Bạn có muốn mở và sử dụng VPBank Online không?</div>
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

					<button onClick={() => props.setStep(13)} type="button" className="btn btnSubmit">
						Tiếp tục
        </button>
				</div>
			</form>
		</JarvisFormStyle>
	)
}


