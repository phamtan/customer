import React from 'react';
import JarvisFormStyle from './JarvisFormStyle';
import { Link } from 'react-router-dom';
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

const CITY = [
	{ value: 'hn', label: 'Hà Nội' },
	{ value: 'hcm', label: 'Hồ chí minh' },
	{ value: 'dn', label: 'Đà nẵng' },
	{ value: 'hp', label: 'Hải phòng' },
	{ value: 'bn', label: 'Bắc Ninh' },
	{ value: 'other', label: 'Khác' },
]

const NATIONAL = [
	{ value: 'vn', label: 'Việt nam' },
	{ value: 'hcm', label: 'England' },
	{ value: 'dn', label: 'American' },
	{ value: 'hp', label: 'Poland' },
	{ value: 'bn', label: 'Singapore' },
	{ value: 'other', label: 'China' },
]

const PLACE = [
	{ value: 'vn', label: 'Công an tỉnh' },
	{ value: 'hcm', label: 'Cục dữ liệu quốc gia về dân cư' },
	{ value: 'dn', label: 'Cục cư trú' },
]

const GENDER = [
	{ value: 'n', label: 'Nam' },
	{ value: 'nu', label: 'Nữ' },
]

const DISTRICT = [
	{ value: 'hn', label: 'Hoàng Mai' },
	{ value: 'hbt', label: 'Hai bà trưng' },
	{ value: 'lc', label: 'Lê chân' },
	{ value: 'hc', label: 'Hải châu' },
	{ value: 'ltn', label: 'Lê thanh nghị' },
	{ value: 'other', label: 'Khác' },
]

export default function Round1(props) {

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
			<div className="roundTitle">BƯỚC 1:</div>
			<div className="roundName">THÔNG TIN CƠ BẢN</div>
			<div className="confirmTitle">XÁC NHẬN THÔNG TIN</div>
			<form className="formWrapper" onSubmit={handleSubmit(onSubmitForm)}>
				<div className="formWrapper">
					<div className="form-group">
						<label>Họ tên</label>
						<input
							className="form-control formControl"
							name="fullName"
							placeholder="Họ tên"
							ref={register}
						/>
						{errors.fullName && (
							<span className="formError">{errors.fullName.message}</span>
						)}
					</div>
					<div className="form-group">
						<label>Quốc tịch</label>
						<Select name="employmentStatus" className="formControl" options={NATIONAL} />
						{errors.national && (
							<span className="formError">{errors.national.message}</span>
						)}
					</div>
					<div className="form-group">
						<label>Giới tính</label>
						<Select name="gender" className="formControl" options={GENDER} />
						{errors.gender && (
							<span className="formError">{errors.gender.message}</span>
						)}
					</div>

					<div className="form-group">
						<label>Số CMND</label>
						<input
							name="passportNumber"
							className="form-control formControl"
							placeholder="CMND"
							type="text"
							ref={register}
						/>
						{errors.passportNumber && (
							<span className="formError">{errors.passportNumber.message}</span>
						)}
					</div>

					<div className="form-group">
						<label>Ngày cấp</label>
						<input
							name="issueDate"
							className="form-control formControl"
							placeholder="Ngày cấp"
							type="text"
							ref={register}
						/>
						{errors.issueDate && (
							<span className="formError">{errors.issueDate.message}</span>
						)}
					</div>

					<div className="form-group">
						<label>Nơi cấp</label>
						<Select name="employmentStatus" className="formControl" options={PLACE} />
						{errors.issueDate && (
							<span className="formError">{errors.issueDate.message}</span>
						)}
					</div>

					<div className="form-group">
						<label>Địa chỉ thường trú</label>
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

					<div className="form-group">
						<label>Quận</label>
						<Select name="employmentStatus" className="formControl" options={DISTRICT} />
						{errors.permanentAddress && (
							<span className="formError">{errors.permanentAddress.message}</span>
						)}
					</div>

					<div className="form-group">
						<label>Thành phố</label>
						<Select name="employmentStatus" className="formControl" options={CITY} />
						{errors.permanentAddress && (
							<span className="formError">{errors.permanentAddress.message}</span>
						)}
					</div>
					<div className="form-group checkboxWrapper">
						<input
							name="permanentAddress.province"
							className="form-control checkboxControl"
							type="checkbox"
							ref={register}
							checked
						/> Địa chỉ thường trú trùng với địa chỉ hiện tại
					</div>
					<button onClick={() => props.setStep(6)} type="button" className="btn btnSubmit">
						Tiếp tục
        </button>
				</div>
			</form>
		</JarvisFormStyle>
	)
}


