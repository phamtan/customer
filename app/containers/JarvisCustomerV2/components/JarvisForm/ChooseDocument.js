/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import chooseDocument from 'images/chooseDocument.svg';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  formContainer: {
    width: '100%',
    backgroundColor: 'white',
    marginTop: '18px',
    minHeight: '100vh',
    maxWidth: '470px',
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
    marginLeft: '16px',
    marginTop: '16px',
    marginBottom: '24px',
  },
  secondHeader: {
    fontSize: '16px',
    width: '100%',
    textAlign: 'left',
    marginLeft: '16px',
    marginTop: '16px',
    marginBottom: '24px',
  },
  dividerStyle: {
    color: '#117f8a',
    backgroundColor: '#117f8a',
    width: '100%',
  },
  guiline: {
    width: '100%',
    height: '16px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#02743e',
    marginLeft: '23px',
    textTransform: 'uppercase',
  },
  action: {
    width: '100%',
    height: '46px',
    margin: '28px 6px 28px',
    padding: '15px 159.4px 15px 105.6px',
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
  selectDocumentType: {
    width: '90%',
    height: '70px',
    margin: 'auto',
    marginTop: '16px',
    marginBottom: '16px',
    padding: '23px 16px',
    borderRadius: '8px',
    backgroundColor: '#e4e4e4',
  },
}));

export default function Round1(props) {
  const classes = useStyles();

  return (
    <JarvisFormStyle>
      <Header className="header" step={1} />
      <div className={classes.formContainer}>
        <div className={classes.guilineImg}>
          <img src={chooseDocument} alt="document type" />
        </div>
        <div className={classes.titleHeader}>Chọn loại giấy tờ tùy thân</div>
        <div className={classes.secondHeader} onClick={() => props.setStep(20)}>
          Nộp giấy tờ để chứng minh nhân thân của bạn
        </div>
        <div
          className={classes.selectDocumentType}
          onClick={() => props.setStep(20)}
        >
          Chứng minh nhân dân/ Căn cước công dân
        </div>
        <div className={classes.selectDocumentType}>Hộ chiếu</div>
        <div className={classes.guiline} onClick={() => props.setStep(5)}>
          Tôi sẽ cung cấp giấy tờ tùy thân sau
        </div>
      </div>
    </JarvisFormStyle>
  );
}
