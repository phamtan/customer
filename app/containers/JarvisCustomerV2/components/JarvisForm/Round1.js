/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import XRegExp from 'xregexp';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';
import * as Actions from '../../actions';

const useStyles = makeStyles(() => ({
  formContainer: {
    width: '100%',
    backgroundColor: 'white',
    marginTop: '18px',
    height: '100vh',
  },
  titleHeader: {
    fontSize: '24px',
    width: '100%',
    textAlign: 'center',
    marginTop: '16px',
    marginBottom: '24px',
  },
  cardStyle: {
    width: '95%',
    marginLeft: '16px',
    marginRight: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '16px',
  },
  titleCard: {
    marginBottom: '48px',
  },
  cardContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '16px',
    marginBottom: '24px',
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
    width: '100%',
    margin: 'auto',
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
  },
  inputSytle: {
    fontSize: '16px',
  },
}));

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required('Bạn chưa nhập họ tên')
    .matches(XRegExp('^[\\pL\\s]+$'), 'Tên không chứa ký tự đặc biệt'),
  mobileNumber: yup
    .string()
    .required('Bạn chưa nhập số điện thoại')
    .length(10, 'số điện thoại gồm 10 số')
    .matches(XRegExp('^[\\d]+$'), 'Số điện thoại chỉ bao gồm số'),
  email: yup
    .string()
    .required('Bạn chưa nhập email')
    .email('Email không đúng định dạng'),
});

export default function Round1(props) {
  const { handleSubmit, errors, control } = useForm({
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const classes = useStyles();

  function onSubmitForm(values) {
    return new Promise((resolve, reject) => {
      props.dispatch(Actions.saveData(values, resolve, reject));
    })
      .then(() => {
        props.setStep(1);
      })
      .catch(() => {
        props.handleShoMessage({
          message: 'Có lỗi xảy ra vui lòng thử lại',
          severity: 'error',
        });
      });
  }

  return (
    <JarvisFormStyle>
      <Header className="header" step={1} showStep />
      <div className={classes.formContainer}>
        <div className={classes.titleHeader}>
          <div>Xin chào!</div>
          <div>Nhập thông tin của bạn để mở thẻ tín dụng mới.</div>
        </div>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="formWrapper">
            <div className="form-group">
              <Controller
                as={TextField}
                name="fullName"
                fullWidth
                variant="outlined"
                label="Họ tên"
                control={control}
                className={classes.inputSytle}
                classes={{
                  root: classes.inputStyle,
                }}
              />
              {errors.fullName && (
                <span className="formError">{errors.fullName.message}</span>
              )}
            </div>
            <div className="form-group">
              <Controller
                as={TextField}
                name="mobileNumber"
                fullWidth
                variant="outlined"
                label="Số điện thoại"
                control={control}
                className={classes.inputSytle}
                classes={{
                  root: classes.inputStyle,
                }}
              />
              {errors.mobileNumber && (
                <span className="formError">{errors.mobileNumber.message}</span>
              )}
            </div>

            <div className="form-group">
              <Controller
                as={TextField}
                name="email"
                fullWidth
                variant="outlined"
                label="Email"
                control={control}
                className={classes.inputSytle}
                classes={{
                  root: classes.inputStyle,
                }}
              />
              {errors.email && (
                <span className="formError">{errors.email.message}</span>
              )}
            </div>

            <button type="submit" className={classes.action}>
              Tiếp tục
            </button>
          </div>
        </form>
      </div>
    </JarvisFormStyle>
  );
}
