/* eslint-disable react/prop-types */
/* eslint-disable no-redeclare */
import React, { useRef, useState } from 'react';
// import Camera from 'react-html5-camera-photo';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Camera } from 'camera-component/camera-document';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import moment from 'moment';
import JarvisFormStyle from './JarvisFormStyle';
import 'react-html5-camera-photo/build/css/index.css';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  pageContainer: {
    width: '100%',
    marginTop: '18px',
    minHeight: '100vh',
    maxWidth: '470px',
    [theme.breakpoints.up('md')]: {
      marginTop: '16px',
      marginBottom: '32px',
      borderRadius: '4px',
    },
  },
  container: {
    width: '100%',
    backgroundColor: 'black',
    // backgroundImage: `url(${ocrframe} )`,
    backgroundSize: 'cover',
    height: '100%',
    minHeight: '100vh',
    [theme.breakpoints.up('md')]: {
      borderRadius: '4px',
    },
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
    marginBottom: '16px',
  },
  backIcon: {
    color: 'white',
    marginTop: '18px',
    marginLeft: '16px',
    width: '24px',
  },
}));

const styles = theme => ({
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

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: 'environment' },
};
export default function Round2OCRGuide(props) {
  const classes = useStyles();
  const cameraRef = useRef();
  const [isCameraOpen, setIsCameraOpen] = useState(true);
  const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', {});
  const [open, setOpen] = React.useState(false);

  function handleTakePhoto(blob) {
    // Do stuff with the photo...
    // setCardImage(blob);
    return new Promise((resolve, reject) => {
      props.dispatch(
        Actions.uploadOCRFront(
          {
            imgFront: blob,
            customerId: jarvisCustomer.id,
          },
          resolve,
          reject,
        ),
      );
    })
      .then(res => {
        const response = JSON.parse(res.body);
        if (res.statusCodeValue === 200) {
          const valueSubmit = jarvisCustomer;
          if (response.data && response.data[0] && response.data[0].id) {
            valueSubmit.documentNumber = response.data[0].id;
            valueSubmit.fullName = response.data[0].name;
            const { dob } = response.data[0];
            if (!!dob && dob !== 'N/A') {
              const formatDate = dob.includes('-')
                ? 'DD-MM-YYYY'
                : 'DD/MM/YYYY';
              const dobConvert = moment(dob, formatDate).format('DD/MM/YYYY');
              valueSubmit.dob = dobConvert;
            }
            valueSubmit.permanentAddressLine1 = response.data[0].address;
          }
          props.dispatch(Actions.saveRawData(valueSubmit));
          props.setStep(21);
          // turnOffCamera();
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
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <JarvisFormStyle>
      <div className={classes.pageContainer}>
        <div className={classes.container}>
          <div>
            <ArrowBackIosIcon
              className={classes.backIcon}
              onClick={() => props.setStep(19)}
            />
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
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Thông báo hình ảnh cần khắc phục
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              Hình ảnh của bạn quá tối, chúng tôi không thể nhận diện được gương
              mặt, vui lòng di chuyển tới vị trí nhiều ánh sáng hơn và chụp lại.
            </Typography>
          </DialogContent>
        </Dialog>
      </div>
    </JarvisFormStyle>
  );
}
