/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import chooseDocument from 'images/chooseDocument.svg';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';
import * as Actions from '../../actions';

const useStyles = makeStyles(() => ({
  formContainer: {
    width: '100%',
    backgroundColor: 'white',
    marginTop: '18px',
    minHeight: '100vh',
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
    width: '382px',
    height: '70px',
    margin: '18px 16px 16px',
    padding: '23px 16px',
    borderRadius: '8px',
    backgroundColor: '#e4e4e4',
  },
}));

const schema = yup.object().shape({
  fullName: yup.string().required('Bạn chưa nhập họ tên'),
  phone: yup.string().required('Bạn chưa nhập số điện thoại'),
  email: yup
    .string()
    .required('Bạn chưa nhập email')
    .email('Email không đúng định dạng'),
});

export default function Round1(props) {
  const { register, handleSubmit, errors } = useForm({
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const classes = useStyles();

  function onSubmitForm(values) {
    props.dispatch(Actions.saveData(values));
    props.setStep(1);
  }

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
