import React from 'react';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';


export default function Round2OCRGuide(props) {

	function handleTakePhoto(dataUri) {
		// Do stuff with the photo...
		console.log('takePhoto');
	}

	return (
		<JarvisFormStyle>
			<Header className="header" />
			<div className="ocrFrontTitle">Chụp giấy tờ tuỳ thân mặt trước</div>
			<div className="ocrSubtitle">Đưa mặt trước GTTT của bạn lên trước camera và bấm chụp</div>
			<div className="ocrFrame">
				<Camera
					onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
				/>
			</div>
			<div className="ocrFrontTitle">Chụp giấy tờ tuỳ thân mặt sau</div>
			<div className="ocrSubtitle">Đưa mặt sau GTTT của bạn lên trước camera và bấm chụp</div>
			<div className="ocrFrame">
				<Camera
					onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
				/>
			</div>
			<button onClick={() => props.setStep(4)} type="button" className="btn btnSubmit">
				Tiếp tục
      </button>
		</JarvisFormStyle>
	)
}


