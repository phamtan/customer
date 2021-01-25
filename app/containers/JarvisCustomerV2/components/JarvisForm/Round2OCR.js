/* eslint-disable react/prop-types */
/* eslint-disable no-redeclare */
import React, { useState, useEffect, useRef } from 'react';
// import Camera from 'react-html5-camera-photo';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Camera, Preview } from 'camera-component/camera-document';
import ocrframe from 'images/ocrframe.png';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';
import 'react-html5-camera-photo/build/css/index.css';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    backgroundColor: 'black',
    // backgroundImage: `url(${ocrframe} )`,
    backgroundSize: 'cover',
    height: '100%',
    minHeight: '100vh',
  },
  titleHeader: {
    fontSize: '20px',
    width: '100%',
    textAlign: 'center',
    marginTop: '24px',
    marginBottom: '16px',
    color: 'white',
  },
  cameraContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '16px',
    marginBottom: '24px',
    marginTop: '110px',
  },
  dividerStyle: {
    color: '#117f8a',
    backgroundColor: '#117f8a',
    width: '100%',
  },
  cardName: {
    color: '#117f8a',
    marginTop: '18px',
    marginBottom: '18px',
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameStyle: {
    paddingTop: '10px',
    paddingLeft: '4px',
    color: '#028547',
  },
  guiline: {
    width: '100%',
    fontSize: '16px',
    color: 'black',
    textAlign: 'center',
    marginTop: '7px',
  },
  action: {
    width: '382px',
    height: '46px',
    margin: '28px 16px 28px',
    borderRadius: '4px',
    backgroundColor: '#028547',
    color: 'white',
    fontSize: '14px',
    border: 'none',
    textTransform: 'uppercase',
  },
  actionRetry: {
    width: '382px',
    height: '46px',
    marginLeft: '16px',
    borderRadius: '4px',
    // backgroundColor: '#028547',
    color: 'white',
    fontSize: '14px',
    // border: 'none',
    textTransform: 'uppercase',
    background: 'transparent',
    border: '1px solid',
  },
  backIcon: {
    color: 'white',
    marginTop: '18px',
    marginLeft: '16px',
    width: '24px',
  },
}));

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: 'environment' },
};
export default function Round2OCRGuide(props) {
  const [allowCamera, setAllowCamera] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(true);
  const [cardImage, setCardImage] = useState();
  const classes = useStyles();
  const cameraRef = useRef();

  useEffect(() => {
    async function enableVideoStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(
          CAPTURE_OPTIONS,
        );
        setMediaStream(stream);
        setAllowCamera(stream.active);
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

  function handleTakePhoto(blob) {
    // Do stuff with the photo...
    setCardImage(blob);
    props.setStep(21);
  }

  return (
    <JarvisFormStyle>
      <div className={classes.container}>
        <div>
          <ArrowBackIosIcon className={classes.backIcon} />
        </div>
        {isCameraOpen && (
          <div className={classes.cameraContainer}>
            <Camera
              onCapture={blob => handleTakePhoto(blob)}
              onClear={() => setCardImage(undefined)}
              ref={cameraRef}
              title="Chứng minh thư mặt trước"
            />
          </div>
        )}
      </div>
    </JarvisFormStyle>
  );
}
