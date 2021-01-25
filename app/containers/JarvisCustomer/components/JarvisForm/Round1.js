/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';
import * as Actions from '../../actions';

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

  function onSubmitForm(values) {
    props.dispatch(Actions.saveData(values));
    props.setStep(1);
  }

  return (
    <JarvisFormStyle>
      <Header className="header" step={1} />
      <div className="roundTitle">BƯỚC 1:</div>
      <div className="roundName">THÔNG TIN CƠ BẢN</div>
      <form className="formWrapper" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="formWrapper">
          <div className="form-group">
            <label>Họ tên</label>
            <input
              className="form-control formControl"
              name="fullName"
              placeholder="Họ tên"
              ref={register}
            />
            {errors.fullName && (
              <span className="formError">{errors.fullName.message}</span>
            )}
          </div>
          <div className="form-group">
            <label>Số điện thoại</label>
            <input
              name="phone"
              className="form-control formControl"
              placeholder="Số ĐT"
              type="text"
              ref={register}
            />
            {errors.phone && (
              <span className="formError">{errors.phone.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              className="form-control formControl"
              placeholder="Email"
              type="text"
              ref={register}
            />
            {errors.email && (
              <span className="formError">{errors.email.message}</span>
            )}
          </div>

          <button type="submit" className="btn btnSubmit">
            Tiếp tục
          </button>
        </div>
      </form>
    </JarvisFormStyle>
  );
}
