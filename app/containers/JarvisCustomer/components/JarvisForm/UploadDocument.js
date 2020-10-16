import React, { useState } from 'react';
import JarvisFormStyle from './JarvisFormStyle';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import documentIcon from 'images/documentIcon.svg';
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
	const [show, setShow] = useState(false);
	const [appform, setAppform] = useState();
	const [idProof, setIdProof] = useState();
	const [addProof, setAddProof] = useState();
	const [financeProof, setFinanceProof] = useState();
	const [employmentProof, setEmploymentProof] = useState();
	const [signature, setSignature] = useState();

	function onSubmitForm() {

	}
	function upload(event, type) {
		if (type === "appform") {
			setAppform(URL.createObjectURL(event.target.files[0]));
		} else if (type === "idProof") {
			setIdProof(URL.createObjectURL(event.target.files[0]));
		} else if (type === "addProof") {
			setAddProof(URL.createObjectURL(event.target.files[0]));
		} else if (type === "financeProof") {
			setFinanceProof(URL.createObjectURL(event.target.files[0]));
		} else if (type === "employmentProof") {
			setEmploymentProof(URL.createObjectURL(event.target.files[0]));
		} else if (type === "signature") {
			setSignature(URL.createObjectURL(event.target.files[0]));
		}
	}


	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<JarvisFormStyle>
			<Header className="header" />
			<div className="roundTitle">BƯỚC 5:</div>
			<div className="roundName">NỘP HỒ SƠ</div>
			<div className="confirmTitle">Hồ sơ của bạn cần bổ sung các giấy tờ bản cứng, bạn muốn sử dụng hình thức nào dưới đây để thực hiện?</div>
			<form className="documentWrapper" onSubmit={handleSubmit(onSubmitForm)}>
				<div className="uploadItem"><img src={documentIcon} />Đề nghị mở thẻ</div>
				<div className="uploadImg">
					<img src={appform} />
					<input type="file" id="appformfile" onChange={(e) => upload(e, "appform")} style={{ display: "none" }} />
					<label className="uploadButton" htmlFor="appformfile">Upload</label>
				</div>
				<div className="uploadItem"><img src={documentIcon} />Chứng minh thông tin cá nhân *</div>
				<div className="uploadImg">
					<img src={idProof} />
					<input type="file" id="idProoffile" onChange={(e) => upload(e, "idProof")} style={{ display: "none" }} />
					<label className="uploadButton" htmlFor="idProoffile">Upload</label>
				</div>
				<div className="uploadItem"><img src={documentIcon} />Chứng minh nơi ở hiện tại</div>
				<div className="uploadImg">
					<img src={addProof} />
					<input type="file" id="addProoffile" onChange={(e) => upload(e, "addProof")} style={{ display: "none" }} />
					<label className="uploadButton" htmlFor="addProoffile">Upload</label>
				</div>
				<div className="uploadItem"><img src={documentIcon} />Chứng minh tài chính</div>
				<div className="uploadImg">
					<img src={financeProof} />
					<input type="file" id="financeProoffile" onChange={(e) => upload(e, "financeProof")} style={{ display: "none" }} />
					<label className="uploadButton" htmlFor="financeProoffile">Upload</label>
				</div>
				<div className="uploadItem"><img src={documentIcon} />Chứng minh công việc</div>
				<div className="uploadImg">
					<img src={employmentProof} />
					<input type="file" id="employmentProoffile" onChange={(e) => upload(e, "employmentProof")} style={{ display: "none" }} />
					<label className="uploadButton" htmlFor="employmentProofile">Upload</label>
				</div>
				<div className="uploadItem"><img src={documentIcon} />Chữ ký</div>
				<div className="uploadImg">
					<img src={signature} />
					<input type="file" id="signaturefile" onChange={(e) => upload(e, "signature")} style={{ display: "none" }} />
					<label className="uploadButton" htmlFor="signaturefile">Upload</label>
				</div>

				<button type="button" onClick={handleShow} className="btn btnSubmit">
					Tiếp tục
    			</button>
			</form>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
				dialogClassName="successDialog"
				size="lg"
			>
				<Modal.Body >
					<div className="title">Hoàn thành</div>
					<img className="imgSuccess" src={registerSuccess} />
					<div className="successTitle">Xin chúc mừng!</div>
					<div className="successText">
						Bạn đã hoàn tất 5 bước mở thẻ nhanh với VPBank,
	hồ sơ của bạn đã được tiếp nhận bởi ngân hàng, chúng tôi sẽ thông báo cho bạn khi có kết quả qua tin nhắn và email.
					</div>
					<div className="questionTitle">Câu hỏi thường gặp</div>
					<div className="question">Tôi cần làm gì để mở thẻ tín dụng VPBank?</div>
					<div className="question">Những loại giấy tờ gì tôi cần chuẩn bị để nộp</div>
					<div className="question">Hồ sơ của tôi sẽ được xét duyệt trong bao lâu?</div>
					<button onClick={() => props.setStep(0)} type="button" className="btn btnSubmit">
						Tiếp tục
        </button>
				</Modal.Body>
			</Modal>
		</JarvisFormStyle>
	)
}


