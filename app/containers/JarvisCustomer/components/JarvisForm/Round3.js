import React from 'react';
import JarvisFormStyle from './JarvisFormStyle';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import Select from 'react-select'
import * as yup from 'yup';
import Header from './Header';

const schema = yup.object().shape({
	auth_email: yup
		.string()
		.email('This field must be a valid email')
		.required('Email is required'),
	password: yup.string().required('Password is required'),
});
const employmentStatus = [
	{ value: 'working', label: 'Đi làm' },
	{ value: 'retired', label: 'Thất nghiệp' },
	{ value: 'out', label: 'Nghỉ hưu' }
]

const company = [
	{ value: 'vin', label: 'Vingroup' },
	{ value: 'vpb', label: 'VPBank' },
	{ value: 'masan', label: 'Masan' },
	{ value: 'flc', label: 'FLC' },
	{ value: 'other', label: 'Khác' },
]

const Industry = [
	{ value: 'mm', label: 'May mặc' },
	{ value: 'vt', label: 'Vận tải' },
	{ value: 'nh', label: 'Ngân hàng' },
	{ value: 'qd', label: 'Quân đội' },
	{ value: 'ca', label: 'Công an' },
	{ value: 'other', label: 'Khác' },
]

const CITY = [
	{ value: 'hn', label: 'Hà Nội' },
	{ value: 'hcm', label: 'Hồ chí minh' },
	{ value: 'dn', label: 'Đà nẵng' },
	{ value: 'hp', label: 'Hải phòng' },
	{ value: 'bn', label: 'Bắc Ninh' },
	{ value: 'other', label: 'Khác' },
]

const DISTRICT = [
	{ value: 'hn', label: 'Hoàng Mai' },
	{ value: 'hbt', label: 'Hai bà trưng' },
	{ value: 'lc', label: 'Lê chân' },
	{ value: 'hc', label: 'Hải châu' },
	{ value: 'ltn', label: 'Lê thanh nghị' },
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
			<div className="confirmTitle">Thông tin việc làm</div>
			<form className="formWrapper" onSubmit={handleSubmit(onSubmitForm)}>
				<div className="formWrapper">
					<div className="form-group">
						<label>Tình trạng công việc hiện tại</label>
						<Select name="employmentStatus" className="formControl" options={employmentStatus} />
						{errors.employmentStatus && (
							<span className="formError">{errors.employmentStatus.message}</span>
						)}
					</div>
					<div className="form-group">
						<label>Công ty đang công tác</label>
						<Select name="company" className="formControl" options={company} />
						{errors.company && (
							<span className="formError">{errors.company.message}</span>
						)}
					</div>
					<div className="form-group">
						<label>Mã số thuế</label>
						<input
							name="taxNumber"
							className="form-control formControl"
							placeholder="Mã số thuế"
							type="text"
							ref={register}
						/>
						{errors.taxNumber && (
							<span className="formError">{errors.taxNumber.message}</span>
						)}
					</div>

					<div className="form-group">
						<label>Địa chỉ công ty</label>
						<input
							name="companyAddress.addressDetail"
							className="form-control formControl"
							placeholder="Địa chỉ công ty"
							type="text"
							ref={register}
						/>
						{errors.companyAddress && (
							<span className="formError">{errors.companyAddress.message}</span>
						)}
					</div>

					<div className="form-group">
						<label>Quận</label>
						<Select name="district" className="formControl" options={DISTRICT} />
						{errors.companyAddress && (
							<span className="formError">{errors.companyAddress.message}</span>
						)}
					</div>

					<div className="form-group">
						<label>Thành phố</label>
						<Select name="city" className="formControl" options={CITY} />
						{errors.companyAddress && (
							<span className="formError">{errors.companyAddress.message}</span>
						)}
					</div>
					<div className="form-group">
						<label>Số Điện thoại cố định</label>
						<input
							name="passportNumber"
							className="form-control formControl"
							placeholder="Số điện thoại"
							type="text"
							ref={register}
						/>
						{errors.passportNumber && (
							<span className="formError">{errors.passportNumber.message}</span>
						)}
					</div>

					<div className="form-group">
						<label>Số máy lẻ</label>
						<input
							name="issueDate"
							className="form-control formControl"
							placeholder="Ext"
							type="text"
							ref={register}
						/>
						{errors.issueDate && (
							<span className="formError">{errors.issueDate.message}</span>
						)}
					</div>

					<div className="form-group">
						<label>Lĩnh vực công việc</label>
						<Select name="industry" className="formControl" options={Industry} />
						{errors.industry && (
							<span className="formError">{errors.industry.message}</span>
						)}
					</div>
					<button onClick={() => props.setStep(9)} type="button" className="btn btnSubmit">
						Tiếp tục
        </button>
				</div>
			</form>
		</JarvisFormStyle>
	)
}


