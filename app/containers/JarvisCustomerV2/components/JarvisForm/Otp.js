/* eslint-disable react/no-array-index-key */
/* eslint-disable no-return-assign */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import * as yup from 'yup';
import _ from 'lodash';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';
import StepApp from './StepApp';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  formContainer: {
    width: '100%',
    maxWidth: '470px',
    backgroundColor: 'white',
    minHeight: '100vh',
    marginTop: '18px',
    [theme.breakpoints.up('md')]: {
      marginTop: '0px',
      marginBottom: '32px',
      borderRadius: '0px',
    },
  },
  titleHeader: {
    fontSize: '24px',
    width: '100%',
    textAlign: 'left',
    paddingLeft: '16px',
    marginTop: '16px',
    marginBottom: '16px',
  },
  secondHeader: {
    fontSize: '16px',
    width: '100%',
    textAlign: 'left',
    paddingLeft: '16px',
  },
  action: {
    width: '100%',
    height: '46px',
    borderRadius: '4px',
    paddingLeft: '16px',
    paddingRight: '16px',
    marginTop: '132px',
    backgroundColor: '#028547',
    color: 'white',
    fontSize: '14px',
    border: 'none',
    textTransform: 'uppercase',
  },
  otpItem: {
    width: '40px',
    height: '56px',
    borderRadius: '8px',
    // backgroundColor: '#e0e0e0',
    margin: '4px',
    border: 'none',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      width: '50px',
    },
  },
  otpContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '44px',
  },
  separate: {
    marginLeft: '5px',
    marginRight: '5px',
    width: '5px',
    textAlign: 'center',
  },
}));

const schema = yup.object().shape({
  auth_email: yup
    .string()
    .email('This field must be a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function OTP(props) {
  const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', {});
  const { register, handleSubmit, errors } = useForm({
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const [activeInput, setActiveInput] = useState(0);

  // Define state otpValues = array with <length> items with default value = ""
  const [otpValues, setOTPValues] = useState(Array(6).fill(''));
  const inputRef = useRef(Array(6).fill(''));

  const classes = useStyles();

  function handleOtpChange(value, index) {
    if (value) {
      const currentOtp = [...otpValues];
      currentOtp[index] = value;
      setOTPValues(currentOtp);
      const nextSibling = document.querySelector(
        `input[name=otp-${index + 1}]`,
      );
      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }
  }

  function onSubmitForm() {
    return new Promise((resolve, reject) => {
      props.dispatch(
        Actions.verifyOtp(
          {
            phoneOrEmail: jarvisCustomer.mobileNumber,
            otpNumber: otpValues.join(''),
          },
          resolve,
          reject,
        ),
      );
    })
      .then(
        () =>
          // if (jarvisCustomer.message) {
          new Promise((res, rej) => {
            props.dispatch(
              Actions.getDetailApp(
                {
                  custId: jarvisCustomer.id,
                },
                res,
                rej,
              ),
            );
          }).then(result => {
            // if (result.processStep === 'BasicStep') {
            //   props.history.push('/v2/liveness-guiline');
            // } else if (result.processStep === 'Work_Form_R_2') {
            //   props.history.push('/v2/round2-1');
            // } else if (result.processStep === 'Work_Form_R_2_2') {
            //   props.history.push('/v2/round2-2');
            // } else if (result.processStep === 'Work_Form_R_3') {
            //   props.history.push('/v2/round3');
            // } else {
            //   props.history.push('/v2/round1');
            // }
            props.history.push('/v2/round1');
          }),
        // }
        // props.setStep(17);
      )
      .catch(() => {
        props.handleShoMessage({
          message: 'Lỗi xác thực OTP',
          severity: 'error',
        });
      });
  }

  return (
    <JarvisFormStyle>
      <Header className="header" step={1} />
      <StepApp step={0} />
      <div className={classes.formContainer}>
        <div className={classes.titleHeader}>Nhập mã OTP</div>
        {jarvisCustomer.message && (
          <div className={classes.secondHeader}>Chào mừng bạn quay trở lại</div>
        )}
        <div className={classes.secondHeader}>
          Điền mã OTP đã được gửi tới số {jarvisCustomer.mobileNumber}{' '}
        </div>
        <form className="formWrapper" onSubmit={handleSubmit(onSubmitForm)}>
          <div className="formWrapper">
            <div className={classes.otpContainer}>
              {Array(3)
                .fill('')
                .map((_, index) => (
                  <TextField
                    key={`otp-${index}`}
                    name={`otp-${index}`}
                    ref={inputRef[index]}
                    onFocus={e => (e.target.value = '')}
                    // ref={register}
                    type="number"
                    variant="outlined"
                    InputProps={{
                      className: classes.otpItem,
                    }}
                    // onInput={(e)=>{
                    //     e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(1,1)
                    // }}
                    onChange={e => handleOtpChange(e.target.value, index)}
                  />
                ))}
              <span className={classes.separate}>-</span>
              {Array(3)
                .fill('')
                .map((_, index) => (
                  <TextField
                    key={`otp-${index + 3}`}
                    name={`otp-${index + 3}`}
                    onFocus={e => (e.target.value = '')}
                    // ref={register}
                    ref={inputRef[index + 3]}
                    type="number"
                    variant="outlined"
                    InputProps={{
                      className: classes.otpItem,
                    }}
                    // onInput={(e)=>{
                    //     e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(1,1)
                    // }}
                    onChange={e => handleOtpChange(e.target.value, index + 3)}
                  />
                ))}

              {errors.otp && (
                <span className="formError">{errors.otp.message}</span>
              )}
            </div>

            <button
              onClick={() => onSubmitForm()}
              type="button"
              className={classes.action}
            >
              Tiếp tục
            </button>
          </div>
        </form>
      </div>
    </JarvisFormStyle>
  );
}
