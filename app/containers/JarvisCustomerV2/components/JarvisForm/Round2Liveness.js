import React, { useState, useEffect } from 'react';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const CAPTURE_OPTIONS = {
	audio: false,
	video: { facingMode: "environment" }
};
export default function Round2OCRGuide(props) {
	const [allowCamera, setAllowCamera] = useState(false);
	const [mediaStream, setMediaStream] = useState(null);

	useEffect(() => {
		async function enableVideoStream() {
			try {
				const stream = await navigator.mediaDevices.getUserMedia(
					CAPTURE_OPTIONS
				);
				setMediaStream(stream);
				setAllowCamera(stream.active)
			} catch (err) {
				// Handle the error
			}
		}

		if (!mediaStream) {
			enableVideoStream();
		} else {
			return function cleanup() {
				mediaStream.getTracks().forEach(track => {
					track.stop();
				});
			};
		}
	}, [mediaStream, CAPTURE_OPTIONS]);

	function handleTakePhoto(dataUri) {
		// Do stuff with the photo...
		console.log('takePhoto');
	}

	return (
		<JarvisFormStyle>
			<Header className="header" />
			<div className="ocrFrontTitle">Định danh khách hàng</div>
			<div className="ocrSubtitle">Vui lòng nhìn vào camera và thực hiện theo các yêu cầu</div>
			<div className="ocrFrame">
				{allowCamera &&
					<Camera
						onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
						isDisplayStartCameraError={true}
						idealResolution={{ width: 640, height: 480 }}
					/>
				}
			</div>
			<button onClick={() => props.setStep(5)} type="button" className="btn btnSubmit">
				Tiếp tục
      </button>
		</JarvisFormStyle>
	)
}


