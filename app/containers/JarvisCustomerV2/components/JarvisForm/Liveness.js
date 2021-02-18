/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable func-names */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-this-in-sfc */
import React, { useState, useEffect } from 'react';
// import Camera from 'react-html5-camera-photo';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FlipCameraIosOutlinedIcon from '@material-ui/icons/FlipCameraIosOutlined';
import RecordRTC from 'recordrtc';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import Slider from '@material-ui/core/Slider';
import _ from 'lodash';
import captureBtn from 'images/capture.svg';
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
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogPaper: {
    margin: '16px',
  },
}));

const styles = theme => ({
  root: {
    margin: 0,
    // padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const PrettoSlider = withStyles({
  root: {
    width: '90%',
    margin: 'auto',
    color: '#52af77',
    height: 36,
  },
  thumb: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    width: 48,
    backgroundColor: '#fff',
    border: '2px solid #979797',
    marginTop: 0,
    marginLeft: 0,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
    '& .arrow': {
      // display: inline-block !important;
      height: 24,
      width: 24,
      color: 'black',
      // backgroundColor: '#000000',
      marginLeft: 1,
      marginRight: 1,
    },
    borderRadius: 0,
  },
  active: {
    height: 36,
  },
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 36,
    borderRadius: 2,
  },
  rail: {
    height: 36,
    borderRadius: 2,
  },
})(Slider);

function CustomThumbComponent(props) {
  return (
    <span {...props}>
      <AccessAlarmIcon className="arrow" />
    </span>
  );
}

export default function VideoKYC(props) {
  const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', {});
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
  const [open, setOpen] = React.useState(false);

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
      type: 'video',
    };
    if (localMediaStream) {
      const stream = localMediaStream;
      const recorder = RecordRTC(stream, constraints);
      recorder.startRecording();
      setRecording(true);
      const sleep = m => new Promise(r => setTimeout(r, m));
      await sleep(7000);

      recorder.stopRecording(function() {
        setRecording(false);
        setProcess(true);
        const blob = recorder.getBlob();
        // eslint-disable-next-line no-unused-vars
        const callLiveness = new Promise((resolve, reject) => {
          props.dispatch(
            Actions.uploadLiveNess(
              {
                video: blob,
                customerId: jarvisCustomer.id,
              },
              resolve,
              reject,
            ),
          );
        })
          .then(res => {
            // props.setStep(19);
            const response = JSON.parse(res.body);
            if (
              res &&
              res.body &&
              response.is_live &&
              !response.is_deepfake &&
              res.statusCodeValue === 200
            ) {
              props.setStep(19);
              turnOffCamera();
            } else {
              setOpen(true);
            }
          })
          .catch(() => {
            props.handleShoMessage({
              message: 'Có lỗi xảy ra vui lòng thử lại',
              severity: 'error',
            });
          });
      });
    }
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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.cameraContainer}>
        <video id="myVideo" className={classes.video} playsInline />
      </div>
      <ArrowBackIosIcon
        className={classes.backIcon}
        onClick={() => props.setStep(17)}
      />
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
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        classes={{
          paper: classes.dialogPaper,
        }}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Thông báo hình ảnh cần khắc phục
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Hình ảnh của bạn quá tối, chúng tôi không thể nhận diện được gương
            mặt, vui lòng di chuyển tới vị trí nhiều ánh sáng hơn và chụp lại.
            <div>
              <div>Tôi đồng ý</div>
              <PrettoSlider
                valueLabelDisplay="none"
                aria-label="pretto slider"
                defaultValue={0}
                min={0}
                max={100}
                ThumbComponent={CustomThumbComponent}
              />
            </div>
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}
