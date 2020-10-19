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
			<div className="ocrFrontTitle">Liveness</div>
			<div className="ocrSubtitle">Vui lòng nhìn vào camera và thực hiện theo các yêu cầu</div>
			<div className="ocrFrame">
				<Camera
					onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
					isDisplayStartCameraError={true}
					idealResolution={{ width: 640, height: 480 }}
				/>
			</div>
			<button onClick={() => props.setStep(5)} type="button" className="btn btnSubmit">
				Tiếp tục
      </button>
		</JarvisFormStyle>
	)
}


