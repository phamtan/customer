import React from 'react';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';


export default function Round2OCRGuide(props) {

	return (
		<JarvisFormStyle>
			<Header className="header" />
			<div className="roundTitle">BƯỚC 1:</div>
			<div className="roundName">THÔNG TIN CƠ BẢN</div>
			<div className="roundNamesub">Nhận diện khuôn mặt và giấy tờ tùy thân</div>
			<div className="roundNameDescription">Để thông tin nhận diện được chính xác!
Bạn vui lòng thực hiện đầy đủ theo yêu cầu đưa ra:</div>
			<div className="ocrguideContainer">
				<div className="ocrTitle">Các bước cần thực hiện</div>
				<div className="ocrStep">
					1. Chụp giấy tờ tùy thân mặt trước
			</div>
				<div className="ocrStep">
					Bạn cần chụp mặt trước CMND/CCCD hoặc CMT quân đội bằng camera của điện thoại
			</div>
				<div className="ocrStep">
					2. Chụp giấy tờ tùy thân mặt sau
			</div>
				<div className="ocrStep">
					3. Thực hiện hành động được yêu cầu trước camera
			</div>
			</div>
			<button onClick={() => props.setStep(3)} type="button" className="btn btnSubmit">
				Tiếp tục
      </button>
		</JarvisFormStyle>
	)
}


