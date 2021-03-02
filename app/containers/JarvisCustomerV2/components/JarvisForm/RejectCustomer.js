import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import rejectCard from 'images/reject-card.svg';

const useStyles = makeStyles(theme => ({
  waitingCheckContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  waitingImg: {
    width: '100%',
    marginTop: '32px',
    display: 'flex',
    justifyContent: 'center',
  },
  waitingTitle: {
    fontFamily: 'Roboto',
    fontSize: '24px',
    marginTop: '16px',
    color: '#cf6679',
  },
  waitingText: {
    width: '90%',
    fontFamily: 'Roboto',
    fontSize: '16px',
    marginTop: '8px',
    textAlign: 'center',
  },
  viewAll: {
    width: '100%',
    fontSize: '14px',
    fontWeight: '500',
    color: '#02743e',
    marginTop: '50px',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
}));

export default function RejectCustomer(props) {
  const classes = useStyles();

  return (
    <div className={classes.waitingCheckContainer}>
      <div className={classes.waitingImg}>
        <img src={rejectCard} alt="logo" />
      </div>
      <div className={classes.waitingTitle}>Xin lỗi quý khách</div>
      <div className={classes.waitingText}>
        Thông tin đăng ký của quý Khách không đáp ứng điều kiện tín dụng của
        VPBank.
      </div>
    </div>
  );
}
