import React from 'react';
import JarvisFormStyle from './JarvisFormStyle';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import Select from 'react-select';
import * as yup from 'yup';
import Header from './Header';

const schema = yup.object().shape({
	auth_email: yup
		.string()
		.email('This field must be a valid email')
		.required('Email is required'),
	password: yup.string().required('Password is required'),
});

const MARITAL = [
	{ value: 'kh', label: 'Kết hôn' },
	{ value: 'dt', label: 'Độc thân' },
	{ value: 'lh', label: 'Ly hôn' },
	{ value: 'other', label: 'Khác' },
]

const REFERENCE = [
	{ value: 'b', label: 'Bố/ Bố vợ' },
	{ value: 'm', label: 'Mẹ/ Mẹ vợ' },
	{ value: 'a', label: 'Anh trai' },
	{ value: 'e', label: 'Em gái' },
	{ value: 'c', label: 'Chị gái' },
	{ value: 'v', label: 'Vợ' },
	{ value: 'bb', label: 'Bạn bè' },
	{ value: 'other', label: 'Khác' },
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
			<div className="confirmTitle">Thông tin tham chiếu và hôn nhân</div>
			<form className="formWrapper" onSubmit={handleSubmit(onSubmitForm)}>
				<div className="formWrapper">
					<div className="form-group">
						<label>Tình trạng kết hôn</label>
						<Select name="employmentStatus" className="formControl" options={MARITAL} />
						{errors.fullName && (
							<span className="formError">{errors.fullName.message}</span>
						)}
					</div>
					<div className="form-group">
						<label>Họ tên người tham chiếu</label>
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
						<label>Mối quan hệ người tham chiếu với chủ thẻ</label>
						<Select name="employmentStatus" className="formControl" options={REFERENCE} />
						{errors.gender && (
							<span className="formError">{errors.gender.message}</span>
						)}
					</div>

					<div className="form-group">
						<label>Số điện thoại</label>
						<input
							name="permanentAddress.addressDetail"
							className="form-control formControl"
							placeholder="Địa chỉ thường trú"
							type="text"
							ref={register}
						/>
						{errors.permanentAddress && (
							<span className="formError">{errors.permanentAddress.message}</span>
						)}
					</div>


					<button onClick={() => props.setStep(10)} type="button" className="btn btnSubmit">
						Tiếp tục
        </button>
				</div>
			</form>
		</JarvisFormStyle>
	)
}


