/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import * as yup from 'yup';
import _ from 'lodash';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';
import * as Actions from '../../actions';

const useStyles = makeStyles(() => ({
  formContainer: {
    width: '100%',
    backgroundColor: 'white',
    minHeight: '100vh',
    marginTop: '18px',
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
  const [otpValues, setOTPValues] = useState(Array(6).fill(""));
  

  const classes = useStyles();

  function handleOtpChange(value, index) {
    let currentOtp = [...otpValues];
    currentOtp[index] = value;
    setOTPValues(currentOtp);
  }

  function onSubmitForm() {
    return new Promise((resolve, reject) => {
     props.dispatch(Actions.verifyOtp({
        phoneOrEmail: jarvisCustomer.mobileNumber,
        otpNumber: otpValues.join(""),
      }, resolve, reject))
    }).then(() => {
      props.setStep(5);  
    }).catch(() => {
      props.handleShoMessage({
        message: 'Lỗi xác thực OTP',
        severity: 'error',
      });
    });
    
  }

  return (
    <JarvisFormStyle>
      <Header className="header" step={1} showStep />
      <div className={classes.formContainer}>
        <div className={classes.titleHeader}>Nhập mã OTP</div>
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
                    name="otp"
                    ref={register}
                    type="number"
                    variant="outlined"
                    InputProps={{
                      className: classes.otpItem,
                    }}
                    onInput={(e)=>{ 
                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,1)
                    }}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                  />
                ))}
              <span className={classes.separate}>-</span>
              {Array(3)
                .fill('')
                .map((_, index) => (
                  <TextField
                    key={`otp-${index+3}`}
                    name="otp"
                    ref={register}
                    type="number"
                    variant="outlined"
                    InputProps={{
                      className: classes.otpItem,
                    }}
                    onInput={(e)=>{ 
                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,1)
                    }}
                    onChange={(e) => handleOtpChange(e.target.value, index+3)}
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
