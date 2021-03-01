/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import livenessguidline from 'images/livenessguidline.svg';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';

const useStyles = makeStyles(theme => ({
  formContainer: {
    width: '100%',
    maxWidth: '470px',
    backgroundColor: 'white',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      marginTop: '16px',
      marginBottom: '32px',
      borderRadius: '4px',
    },
  },
  guilineImg: {
    width: '100%',
    textAlign: 'center',
    marginTop: '10px',
  },
  titleHeader: {
    fontSize: '24px',
    width: '100%',
    textAlign: 'left',
    paddingLeft: '16px',
    marginTop: '16px',
    marginBottom: '24px',
  },
  secondHeader: {
    width: '100%',
    fontSize: '16px',
    width: '100%',
    textAlign: 'left',
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  dividerStyle: {
    color: '#d8d8d8',
    backgroundColor: '#d8d8d8',
    width: '80%',
    marginTop: '16px',
    marginBottom: '24px',
    marginLeft: '10%',
    marginRight: '10%',
  },
  guiline: {
    width: '315px',
    height: '16px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#02743e',
    marginLeft: '23px',
    textTransform: 'uppercase',
  },
  action: {
    width: '93%',
    height: '46px',
    marginTop: '30px',
    borderRadius: '4px',
    backgroundColor: '#028547',
    color: 'white',
    fontSize: '14px',
    border: 'none',
    textTransform: 'uppercase',
  },
  inputSytle: {
    fontSize: '16px',
  },
  guilineRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '8px',
    marginBottom: '8px',
  },
  guilineIcon: {
    width: '34px',
    height: '34px',
    marginLeft: '16px',
  },
}));

export default function LivenessGuiline(props) {
  const classes = useStyles();

  return (
    <JarvisFormStyle>
      <Header className="header" step={1} />
      <div className={classes.formContainer}>
        <div className={classes.titleHeader}>Xác thực</div>
        <div className={classes.secondHeader}>
          Chúng tôi sẽ so sánh ảnh selfie của bạn với ảnh trong chứng minh thư
          nhân dân bạn cung cấp
        </div>
        <div className={classes.guilineImg}>
          <img src={livenessguidline} alt="document type" />
        </div>
        <Divider className={classes.dividerStyle} />
        <div className={classes.guilineRow}>
          <AccountCircleOutlinedIcon className={classes.guilineIcon} />
          <div className={classes.secondHeader} onClick={() => props.setStep(5)}>Hãy nhìn thẳng vào camera</div>
        </div>
        <div className={classes.guilineRow}>
          <EmojiEmotionsOutlinedIcon className={classes.guilineIcon} />
          <div className={classes.secondHeader}>
            Nếu đeo kính, hãy chắc chắn rằng chúng tôi có thể nhìn thấy mắt bạn
            rõ ràng
          </div>
        </div>
        <button
          type="button"
          className={classes.action}
          onClick={() => props.setStep(18)}
        >
          Tôi đã hiểu, tiếp tục
        </button>
      </div>
    </JarvisFormStyle>
  );
}
