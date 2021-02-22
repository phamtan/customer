import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import backGroundGreen from 'images/backgroundgreen.png';
import congrat from 'images/congrat.svg';

const useStyles = makeStyles(theme => ({
  waitingCheckContainer: {
    maxWidth: '470px',
    margin: 'auto',
    backgroundImage: `url(${backGroundGreen})`,
    backgroundSize: 'contain',
    backgroundColor: 'white',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  waitingImg: {
    width: '100%',
    marginTop: '21px',
    paddingLeft: '32px',
    paddingRight: '32px',
    display: 'flex',
    justifyContent: 'center',
  },
  waitingTitle: {
    fontFamily: 'Roboto',
    fontSize: '24px',
    marginTop: '24px',
    lineHeight: '1.33',
    letterSpacing: '0.18px',
    color: 'white',
  },
  limitText: {
    fontFamily: 'Roboto',
    fontSize: '46px',
    marginTop: '8px',
    lineHeight: '1.33',
    letterSpacing: '0.18px',
    color: 'white',
    [theme.breakpoints.down(400)]: {
      fontSize: '40px',
    },
  },
  waitingText: {
    width: '90%',
    fontFamily: 'Roboto',
    fontSize: '16px',
    marginTop: '24px',
    textAlign: 'center',
  },
  action: {
    width: '90%',
    height: '46px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    backgroundColor: '#028547',
    color: 'white',
    fontSize: '14px',
    border: 'none',
    textTransform: 'uppercase',
    marginTop: '24px',
  },
}));

export default function CheckLimitDone(props) {
  const classes = useStyles();

  return (
    <div className={classes.waitingCheckContainer}>
      <div className={classes.waitingTitle}>Kết quả kiểm tra hạn mức</div>
      <div className={classes.limitText}>30.000.000 VND</div>
      <div className={classes.waitingImg}>
        <img src={congrat} alt="logo" />
      </div>
      <div className={classes.waitingText}>
        Xin chúc mừng, <b>hạn mức</b> của bạn tại VPBank là{' '}
        <b>30,000,000 VNĐ</b>. Bạn có thể <b>mở thẻ tín dụng</b> hoặc{' '}
        <b>vay tiêu dùng</b> với hạn mức này
      </div>
      <button
        type="button"
        onClick={() => props.setStep(9)}
        className={classes.action}
      >
        Tiếp tục
      </button>
    </div>
  );
}
