import React from 'react';
import JarvisFormStyle from './JarvisFormStyle';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import Header from './Header';
import _ from "lodash";
import * as Actions from '../../actions';

const schema = yup.object().shape({
	confirmValidateDocs: yup
		.string()
		.required('Bạn chưa xác nhận'),
});

export default function Round2Confirm(props) {
	const jarvisCustomer = _.get(props, 'jarvisCustomer.jarvisCustomer', {});
	const { register, handleSubmit, errors, control } = useForm({
		reValidateMode: 'onChange',
		shouldFocusError: true,
		shouldUnregister: true,
		defaultValues: jarvisCustomer,
		resolver: yupResolver(schema),
	});

	function onSubmitForm(values) {
		props.setStep(7);
		props.dispatch(Actions.saveData(values));
	}

	return (
		<JarvisFormStyle>
			<Header className="header" />
			<div className="roundTitle">BƯỚC 2:</div>
			<div className="roundName">CHỨNG MINH THU NHẬP & KIỂM TRA HẠN MỨC</div>
			<form onSubmit={handleSubmit(onSubmitForm)}>
				<div className="confirmNote">
					<div>- Cung cấp sao kê bảng lương ít nhất 3 tháng gần nhất</div>
					<div>- Bản sao kê phải có dấu đỏ của ngân hàng</div>
				</div>
				<div className="virtualcardConfirm">Bạn có đảm bảo cung cấp được sao kê chứng minh thu nhập như yêu cầu không?</div>
				<div className="formWrapper">
					{/* <div className="radioWrapper">
						<input
							className="form-control radioControl"
							name="confirmValidateDocs"
							type="radio"
							ref={register}
						/> Có
						</div>
					<div className="radioWrapper">
						<input
							className="form-control radioControl"
							name="confirmValidateDocs"
							type="radio"
							ref={register}
						/> Không
					</div> */}
					<Controller
						name="confirmValidateDocs"
						control={control}
						render={props => (
							<RadioGroup aria-label="gender" name="confirmValidateDocs" value={props.value} >
								<FormControlLabel value="1" control={<Radio />} label="Có" onChange={props.onChange} />
								<FormControlLabel value="2" control={<Radio />} label="Không" onChange={props.onChange} />
							</RadioGroup>
						)}
					/>
					<div>
						{errors.confirmValidateDocs && (
							<span className="formError">{errors.confirmValidateDocs.message}</span>
						)}
					</div>

					<button type="submit" className="btn btnSubmit">
						Tiếp tục
        			</button>
				</div>
			</form>
		</JarvisFormStyle>
	)
}


