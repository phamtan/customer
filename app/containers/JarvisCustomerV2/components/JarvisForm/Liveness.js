/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable func-names */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-this-in-sfc */
import React, { useState, useEffect } from 'react';
// import Camera from 'react-html5-camera-photo';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FlipCameraIosOutlinedIcon from '@material-ui/icons/FlipCameraIosOutlined';
import RecordRTC from 'recordrtc';
import captureBtn from 'images/capture.svg';
import ocrframe from 'images/livenessframe.png';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cameraContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '16px',
    marginBottom: '24px',
  },
  backIcon: {
    color: 'white',
    position: 'absolute',
    top: '18px',
    left: '16px',
    width: '24px',
    zIndex: '10',
  },
  video: {
    position: 'fixed',
    minWidth: '100%',
    minHeight: '100%',
  },
  textGuidline: {
    width: '100%',
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.87)',
    marginBottom: '85px',
    position: 'absolute',
    top: '75%',
    zIndex: '10',
    [theme.breakpoints.down('xs')]: {
      fontSize: '18px',
    },
  },
  ovalShape: {
    width: '60%',
    height: '50%',
    position: 'absolute',
    top: '20%',
    zIndex: '100',
    border: '1px solid',
    borderRadius: '50%',
    boxShadow: '0px 0px 1px 2px rgba(0, 0, 0, 0.6)',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      top: '10%',
      width: '50%',
      height: '60%',
    },
    [theme.breakpoints.up('lg')]: {
      top: '10%',
      width: '30%',
      height: '60%',
    },
  },
  btnCapture: {
    marginTop: '20px',
    zIndex: '100',
    position: 'absolute',
    bottom: '30px',
  },
  changeCamera: {
    color: 'white',
    position: 'absolute',
    top: '18px',
    right: '16px',
    width: '36px',
    zIndex: '10',
  },
  divOverlay: {
    width: '69vw',
    height: '100vw',
    marginTop: '-80vw',
    borderRadius: '50%',
    border: 'solid 100vw rgba(6,6,6, 0.5)',
    boxSizing: 'content-box',
    position: 'fixed',
    [theme.breakpoints.up('sm')]: {
      marginTop: '-90vw',
      height: '80vw',
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: '-95vw',
      width: '20vw',
      height: '30vw',
    },
  }
}));

export default function VideoKYC(props) {
  const classes = useStyles();
  const [isMobile] = useState(
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    ),
  );
  const [isIpad] = useState(
    /ipad/i.test(navigator.userAgent) ||
      (/Macintosh/i.test(navigator.userAgent) && 'ontouchend' in document),
  );
  const [localMediaStream, setLocalMediaStream] = useState(null);
  const [useFrontCamera, setUseFrontCamera] = useState(null);
  const [recording, setRecording] = useState(false);
  const [process, setProcess] = useState(false);

  useEffect(() => {
    openCamera();
  }, []);

  function openCamera() {
    let option = {
      video: true,
    };
    if (isMobile) {
      option = {
        video: {
          facingMode: useFrontCamera ? 'user' : 'environment',
        },
      };
    } else if (isIpad) {
      option = {
        video: {
          facingMode: useFrontCamera ? 'user' : 'environment',
        },
      };
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia(option)
        .then(stream => {
          initCameraInfo(stream);
        })
        .catch(() => {
          showError();
        });
    } else if (navigator.getUserMedia) {
      navigator.getUserMedia(
        option,
        stream => {
          initCameraInfo(stream);
        },
        () => {
          showError();
        },
      );
    } else if (navigator.webkitGetUserMedia) {
      navigator.webkitGetUserMedia(
        option,
        stream => {
          initCameraInfo(stream);
        },
        () => {
          showError();
        },
      );
    } else if (navigator.mozGetUserMedia) {
      navigator.mozGetUserMedia(
        option,
        stream => {
          initCameraInfo(stream);
        },
        () => {
          showError();
        },
      );
    }
    return true;
  }

  function showError() {
    props.handleShoMessage({
      message: 'Bạn chỉ được chọn tối đa 2 thẻ',
      severity: 'error',
    });
  }

  function initCameraInfo(stream) {
    const video = document.querySelector('video');
    if (video) {
      video.setAttribute('autoplay', '');
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.srcObject = stream;
      video.play();
      setLocalMediaStream(stream);
    }
  }

  async function recordVideo() {
    const constraints = {
      video: { width: 360, height: 240 },
      audio: true,
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(async function(stream) {
        const recorder = RecordRTC(stream, constraints);
        recorder.startRecording();
        setRecording(true);
        const sleep = m => new Promise(r => setTimeout(r, m));
        await sleep(7000);

        recorder.stopRecording(function() {
          setRecording(false);
          setProcess(true);
          const blob = recorder.getBlob();
          props.dispatch(Actions.uploadLiveNess({
            video: blob,
            customerId: 29,
          }))
        });
      });
  }

  function restartCamera() {
    turnOffCamera();
    openCamera();
  }

  function turnOffCamera() {
    localMediaStream.getTracks().forEach(cam => cam.stop());
  }

  function changeCamera() {
    setUseFrontCamera(!useFrontCamera);
    restartCamera();
  }

  return (
    <div className={classes.container}>
      <div className={classes.cameraContainer}>
        <video id="myVideo" className={classes.video} />
      </div>
      <ArrowBackIosIcon className={classes.backIcon} />
      {isMobile && (
        <FlipCameraIosOutlinedIcon
          onClick={() => changeCamera()}
          className={classes.changeCamera}
        />
      )}
      <div className={classes.divOverlay} />
      <div className={classes.textGuidline}>
        {!recording && !process
          ? 'Để mặt bạn vừa trong hình oval'
          : 'Đang quay'}
      </div>
      {!process && (
        <img
          src={captureBtn}
          disabled={recording}
          alt="capture btn"
          className={classes.btnCapture}
          onClick={recordVideo}
        />
      )}
      <canvas style={{ display: 'none' }} />
    </div>
  );
}
