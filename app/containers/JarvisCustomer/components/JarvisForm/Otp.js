import React from 'react';
import JarvisFormStyle from './JarvisFormStyle';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import Header from './Header';

const schema = yup.object().shape({
  auth_email: yup
    .string()
    .email('This field must be a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function OTP(props) {

  const { register, handleSubmit, errors } = useForm({
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  function onSubmitForm() {

  }

  return (
    <JarvisFormStyle>
      <Header className="header" />
      <div className="roundTitle">BƯỚC 1:</div>
      <div className="roundName">THÔNG TIN CƠ BẢN</div>
      <div className="otpTitle">NHẬP MÃ OTP</div>
      <form className="formWrapper" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="formWrapper">
          <div className="form-group">
            <label>Điền mã OTP</label>
            <input
              className="form-control otpControl"
              name="otp"
              ref={register}
              size={6}
              maxlength={6}
            />
            {errors.otp && (
              <span className="formError">{errors.otp.message}</span>
            )}
          </div>

          <button onClick={() => props.setStep(2)} type="button" className="btn btnSubmit">
            Tiếp tục
        </button>
        </div>
      </form>
    </JarvisFormStyle>
  )
}


