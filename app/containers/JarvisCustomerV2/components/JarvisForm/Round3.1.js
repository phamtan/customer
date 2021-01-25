/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import _ from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import Select from 'react-select';
import * as yup from 'yup';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';
import BackButton from './BackButton';
import * as Actions from '../../actions';

const MARITAL = [
  { value: 'kh', label: 'Kết hôn' },
  { value: 'dt', label: 'Độc thân' },
  { value: 'lh', label: 'Ly hôn' },
  { value: 'other', label: 'Khác' },
];

const REFERENCE = [
  { value: 'b', label: 'Bố/ Bố vợ' },
  { value: 'm', label: 'Mẹ/ Mẹ vợ' },
  { value: 'a', label: 'Anh trai' },
  { value: 'e', label: 'Em gái' },
  { value: 'c', label: 'Chị gái' },
  { value: 'v', label: 'Vợ' },
  { value: 'bb', label: 'Bạn bè' },
  { value: 'other', label: 'Khác' },
];

const schema = yup.object().shape({
  maritalStatus: yup.object().required('Bạn chưa chọn tình trạng hôn nhân'),
  nameOfReference: yup.string().required('Bạn chưa nhập tên người tham chiếu'),
  typeOfReference: yup
    .object()
    .required('Bạn chưa chọn mối quan hệ với người tham chiếu'),
  phoneOfReference: yup
    .string()
    .required('Bạn chưa nhập số điện thoại người tham chiếu'),
});
export default function Round3(props) {
  const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', {});
  const { register, handleSubmit, errors, control } = useForm({
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: jarvisCustomer,
    resolver: yupResolver(schema),
  });

  function onSubmitForm(values) {
    props.dispatch(Actions.saveData(values));
    props.setStep(10);
  }

  function goBack() {
    props.setStep(8);
  }

  return (
    <JarvisFormStyle>
      <Header className="header" step={3} />
      <BackButton className="btnBack" goBack={goBack} />
      <div className="roundTitle">BƯỚC 3:</div>
      <div className="roundName">XÁC NHẬN THÔNG TIN</div>
      <form className="formWrapper" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="formWrapper">
          <div className="form-group">
            <label>Tình trạng kết hôn</label>
            <Controller
              name="maritalStatus"
              control={control}
              render={props => (
                <Select
                  className="formControl"
                  options={MARITAL}
                  onChange={e => props.onChange(e)}
                  value={props.value}
                />
              )}
            />
            {errors.maritalStatus && (
              <span className="formError">{errors.maritalStatus.message}</span>
            )}
          </div>
          <div className="form-group">
            <label>Họ tên người tham chiếu</label>
            <input
              name="nameOfReference"
              className="form-control formControl"
              placeholder=""
              type="text"
              ref={register}
            />
            {errors.nameOfReference && (
              <span className="formError">
                {errors.nameOfReference.message}
              </span>
            )}
          </div>
          <div className="form-group">
            <label>Mối quan hệ người tham chiếu với chủ thẻ</label>
            <Controller
              name="typeOfReference"
              control={control}
              render={props => (
                <Select
                  className="formControl"
                  options={REFERENCE}
                  onChange={e => props.onChange(e)}
                  value={props.value}
                />
              )}
            />
            {errors.typeOfReference && (
              <span className="formError">
                {errors.typeOfReference.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Số điện thoại</label>
            <input
              name="phoneOfReference"
              className="form-control formControl"
              placeholder=""
              type="number"
              ref={register}
            />
            {errors.phoneOfReference && (
              <span className="formError">
                {errors.phoneOfReference.message}
              </span>
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
