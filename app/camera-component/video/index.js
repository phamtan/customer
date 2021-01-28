import React, { useState, useEffect, useRef } from 'react';
// import Camera from 'react-html5-camera-photo';
import { makeStyles } from '@material-ui/core/styles';
import {
  RecordWebcam,
  useRecordWebcam,
  CAMERA_STATUS
} from "react-record-webcam";

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
    marginTop: '66px',
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


export default function VideoKYC(props) {
  const [allowCamera, setAllowCamera] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(true);
  const [cardImage, setCardImage] = useState();
  const classes = useStyles();
  const recordWebcam = useRecordWebcam(CAMERA_STATUS.OPEN);
  if (recordWebcam) {
    recordWebcam.openCamera;
  }
  
  recordWebcam.status === CAMERA_STATUS.OPEN; 
  
  return (
      <div className={classes.container}>
        <div>{recordWebcam.status}</div>
        {isCameraOpen && (
          <div className={classes.cameraContainer}>
            <div>
            <button
            disabled={
              recordWebcam.status === CAMERA_STATUS.CLOSED ||
              recordWebcam.status === CAMERA_STATUS.RECORDING ||
              recordWebcam.status === CAMERA_STATUS.PREVIEW
            }
            onClick={recordWebcam.start}
          >
            Start recording
          </button>
           <button
            onClick={recordWebcam.open}
          >
            OPen camera
          </button>
          <button
            disabled={recordWebcam.status !== CAMERA_STATUS.RECORDING}
            onClick={recordWebcam.stop}
          >
            Stop recording
          </button>
          <button
            disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
            onClick={recordWebcam.retake}
          >
            Retake
          </button>
          <button
            disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
            onClick={recordWebcam.download}
          >
            Download
          </button>
        </div>

            <video
              ref={recordWebcam.webcamRef}
              style={{
                display: `${
                  recordWebcam.status === CAMERA_STATUS.OPEN ||
                  recordWebcam.status === CAMERA_STATUS.RECORDING
                    ? "block"
                    : "none"
                }`
              }}
              autoPlay
              muted
            />
            <video
              ref={recordWebcam.previewRef}
              style={{
                display: `${
                  recordWebcam.status === CAMERA_STATUS.PREVIEW ? "block" : "none"
                }`
              }}
              autoPlay
              muted
              loop
            />
          </div>
        )}
      </div>
  );
}
