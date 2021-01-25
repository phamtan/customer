/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import documentcomplete from 'images/documentcomplete.svg';
import checkdone from 'images/checkdone.svg';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';
import * as Actions from '../../actions';

const useStyles = makeStyles(() => ({
  formContainer: {
    width: '100%',
    backgroundColor: 'white',
    minHeight: '100vh',
  },
  guilineImg: {
    width: '100%',
    textAlign: 'center',
    marginTop: '24px',
  },
  titleHeader: {
    fontSize: '24px',
    width: '100%',
    textAlign: 'center',
    marginTop: '16px',
    marginBottom: '24px',
  },
  secondHeader: {
    fontSize: '16px',
    width: '100%',
    textAlign: 'center',
    paddingLeft: '16px',
    paddingRight: '24px',
  },
  dividerStyle: {
    color: '#117f8a',
    backgroundColor: '#117f8a',
    width: '100%',
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
    width: '382px',
    height: '46px',
    borderRadius: '4px',
    marginLeft: '16px',
    marginRight: '16px',
    marginTop: '132px',
    backgroundColor: '#028547',
    color: 'white',
    fontSize: '14px',
    border: 'none',
    textTransform: 'uppercase',
  },
  inputSytle: {
    fontSize: '16px',
  },
  selectDocumentType: {
    width: '382px',
    height: '70px',
    margin: '18px 16px 16px',
    padding: '23px 16px',
    borderRadius: '8px',
    backgroundColor: '#e4e4e4',
  },
}));

export default function UploadDocumentSuccess(props) {
  const classes = useStyles();

  return (
    <JarvisFormStyle>
      <Header className="header" step={1} />
      <div className={classes.formContainer}>
        <div className={classes.guilineImg}>
          <img src={documentcomplete} alt="document type" />
        </div>
        <div className={classes.guilineImg}>
          <img src={checkdone} alt="document type" />
        </div>
        <div className={classes.titleHeader}>Cung cấp giấy tờ thành công</div>
        <div className={classes.secondHeader}>
          Bạn hãy <b>kiểm tra lại thông tin cá nhân</b> của mình ở trang sau,
          nếu có trường thông tin nào chưa đúng, hãy sửa lại.
        </div>
        <button type="button" className={classes.action}>
          Tiếp tục
        </button>
      </div>
    </JarvisFormStyle>
  );
}
