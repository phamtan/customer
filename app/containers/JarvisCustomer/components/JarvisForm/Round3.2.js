import React from 'react';
import JarvisFormStyle from './JarvisFormStyle';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import Select from 'react-select';
import Header from './Header';

const schema = yup.object().shape({
	auth_email: yup
		.string()
		.email('This field must be a valid email')
		.required('Email is required'),
	password: yup.string().required('Password is required'),
});

const QUESTION = [
	{ value: 'htm', label: 'Họ tên mẹ' },
	{ value: 'mg', label: 'Nơi sinh ra của mẹ' },
	{ value: 'tth', label: 'Trường tiểu học của bạn là gì' },
]

const CARDS = [
	{ value: 'platinum', label: 'Platinum cashback' },
	{ value: 'mc2', label: 'MC2' },
	{ value: 'titanium', label: 'Titanium cashback' },
	{ value: 'travel', label: 'VP Travelmiles' },
	{ value: 'no1', label: 'VP No1' },
]

export default function Round3(props) {

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
			<div className="roundTitle">BƯỚC 3:</div>
			<div className="roundName">XÁC NHẬN THÔNG TIN</div>
			<div className="confirmTitle">Thông tin khác</div>
			<form className="formWrapper" onSubmit={handleSubmit(onSubmitForm)}>
				<div className="formWrapper">
					<div className="form-group">
						<label>Câu hỏi bảo mật</label>
						<Select name="employmentStatus" className="formControl" options={QUESTION} />
						{errors.fullName && (
							<span className="formError">{errors.fullName.message}</span>
						)}
					</div>
					<div className="form-group">
						<label>Trả lời câu hỏi bảo mật</label>
						<input
							name="national"
							className="form-control formControl"
							placeholder="Quốc tịch"
							type="text"
							ref={register}
						/>
						{errors.national && (
							<span className="formError">{errors.national.message}</span>
						)}
					</div>
					<div className="form-group">
						<label>Bạn có thuộc một trong các điều kiện sau không: là công dân Hoa Kỳ, có thẻ thường trú nhân tại Hoa Kỳ (Thẻ Xanh) hoặc là cá nhân cư trú tại Hoa Kỳ?</label>
						<input
							name="gender"
							className="form-control formControl"
							placeholder="Giới tính"
							type="text"
							ref={register}
						/>
						{errors.gender && (
							<span className="formError">{errors.gender.message}</span>
						)}
					</div>

					<div className="form-group">
						<label>Loại thẻ tín dụng</label>
						<Select name="employmentStatus" className="formControl" options={CARDS} />
						{errors.permanentAddress && (
							<span className="formError">{errors.permanentAddress.message}</span>
						)}
					</div>

					<div className="form-group">
						<label>Hạn mức đề nghị</label>
						<input
							name="permanentAddress.district"
							className="form-control formControl"
							placeholder="Hạn mức"
							type="text"
							ref={register}
						/>
						{errors.permanentAddress && (
							<span className="formError">{errors.permanentAddress.message}</span>
						)}
					</div>
					<button onClick={() => props.setStep(11)} type="button" className="btn btnSubmit">
						Tiếp tục
        </button>
				</div>
			</form>
		</JarvisFormStyle>
	)
}


