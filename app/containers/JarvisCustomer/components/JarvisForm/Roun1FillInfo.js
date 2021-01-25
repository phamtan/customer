/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import _ from 'lodash';
import ReactSelect from 'react-select';
import moment from 'moment';
import Header from './Header';
import JarvisFormStyle from './JarvisFormStyle';
import * as Actions from '../../actions';

const CITY = [
  { value: 'hn', label: 'Hà Nội' },
  { value: 'hcm', label: 'Hồ chí minh' },
  { value: 'dn', label: 'Đà nẵng' },
  { value: 'hp', label: 'Hải phòng' },
  { value: 'bn', label: 'Bắc Ninh' },
  { value: 'other', label: 'Khác' },
];

const NATIONAL = [
  { value: 'vn', label: 'Việt Nam' },
  { value: 'hcm', label: 'England' },
  { value: 'dn', label: 'American' },
  { value: 'hp', label: 'Poland' },
  { value: 'bn', label: 'Singapore' },
  { value: 'other', label: 'China' },
];

const PLACE = [
  { value: 'vn', label: 'Công an tỉnh' },
  { value: 'hcm', label: 'Cục dữ liệu quốc gia về dân cư' },
  { value: 'dn', label: 'Cục cư trú' },
];

const GENDER = [
  { value: 'male', label: 'Nam' },
  { value: 'female', label: 'Nữ' },
];

const DISTRICT = [
  { value: 'hn', label: 'Hoàng Mai' },
  { value: 'hbt', label: 'Hai bà trưng' },
  { value: 'lc', label: 'Lê chân' },
  { value: 'hc', label: 'Hải châu' },
  { value: 'ltn', label: 'Lê thanh nghị' },
  { value: 'other', label: 'Khác' },
];

const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  national: yup
    .object()
    .nullable()
    .required('Quốc tịch là bắt buộc'),
  gender: yup
    .object()
    .nullable()
    .required('Bạn chưa chọn giới tính'),
  passportNumber: yup.string().required('Bạn chưa nhập số giấy tờ'),
  issueDate: yup.string().required('Bạn chưa nhập số giấy tờ'),
  permanentAddress: yup.object({
    addressDetail: yup.string().required('Bạn chưa nhập địa chỉ chi tiết'),
    district: yup.object().required('Bạn chưa chọn quận'),
    province: yup.object().required('Bạn chưa chọn thành phố'),
  }),
  placeOfIssue: yup
    .object()
    .nullable()
    .required('Bạn chưa chọn nơi cấp giấy tờ'),
});
export default function Round1(props) {
  const jarvisCustomer = _.get(props, 'jarvisCustomer.jarvisCustomer', {});
  const { register, handleSubmit, errors, control } = useForm({
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: {
      national: {
        value: 'vn',
        label: 'Việt Nam',
      },
      fullName: jarvisCustomer.fullName,
      gender: {
        value: 'female',
        label: 'Nữ',
      },
      passportNumber: '123250524',
      issueDate: moment()
        .subtract(2, 'years')
        .format('yyyy-MM-DD'),
      placeOfIssue: {
        value: 'hcm',
        label: 'Cục dữ liệu quốc gia về dân cư',
      },
    },
    resolver: yupResolver(schema),
  });

  function onSubmitForm(values) {
    props.dispatch(Actions.saveData(values));
    props.setStep(6);
  }

  return (
    <JarvisFormStyle>
      <Header className="header" step={2} />
      <div className="roundTitle">BƯỚC 1:</div>
      <div className="roundName">THÔNG TIN CƠ BẢN</div>
      <div className="confirmTitle">XÁC NHẬN THÔNG TIN</div>
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
            <label>Quốc tịch</label>
            <Controller
              as={ReactSelect}
              options={NATIONAL}
              name="national"
              isClearable
              control={control}
            />

            {errors.national && (
              <span className="formError">{errors.national.message}</span>
            )}
          </div>
          <div className="form-group">
            <label>Giới tính</label>
            <Controller
              name="gender"
              control={control}
              render={({ value, onChange }) => (
                <ReactSelect
                  className="formControl"
                  options={GENDER}
                  onChange={e => onChange(e)}
                  value={value}
                />
              )}
            />
            {errors.gender && (
              <span className="formError">{errors.gender.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Số CMND</label>
            <input
              name="passportNumber"
              className="form-control formControl"
              placeholder="CMND"
              type="number"
              ref={register}
            />
            {errors.passportNumber && (
              <span className="formError">{errors.passportNumber.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Ngày cấp</label>
            <input
              name="issueDate"
              className="form-control formControl"
              placeholder="Ngày cấp"
              type="date"
              ref={register}
            />
            {errors.issueDate && (
              <span className="formError">{errors.issueDate.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Nơi cấp</label>
            <Controller
              name="placeOfIssue"
              control={control}
              render={({ value, onChange }) => (
                <ReactSelect
                  className="formControl"
                  options={PLACE}
                  onChange={e => onChange(e)}
                  value={value}
                />
              )}
            />
            {errors.placeOfIssue && (
              <span className="formError">{errors.placeOfIssue.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Địa chỉ thường trú</label>
            <input
              name="permanentAddress.addressDetail"
              className="form-control formControl"
              placeholder="Địa chỉ thường trú"
              type="text"
              ref={register}
            />
            {errors.permanentAddress &&
              errors.permanentAddress.addressDetail && (
              <span className="formError">
                {errors.permanentAddress.addressDetail.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Thành phố</label>
            <Controller
              name="permanentAddress.province"
              control={control}
              render={({ value, onChange }) => (
                <ReactSelect
                  className="formControl"
                  options={CITY}
                  onChange={e => onChange(e)}
                  value={value}
                />
              )}
            />
            {errors.permanentAddress && errors.permanentAddress.province && (
              <span className="formError">
                {errors.permanentAddress.province.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Quận</label>
            <Controller
              name="permanentAddress.district"
              control={control}
              render={({ value, onChange }) => (
                <ReactSelect
                  className="formControl"
                  options={DISTRICT}
                  onChange={e => onChange(e)}
                  value={value}
                />
              )}
            />
            {errors.permanentAddress && errors.permanentAddress.district && (
              <span className="formError">
                {errors.permanentAddress.district.message}
              </span>
            )}
          </div>
          <div className="form-group checkboxWrapper">
            <input
              name="currentIsPermanent"
              className="form-control checkboxControl"
              type="checkbox"
              ref={register}
              defaultChecked
            />{' '}
            Địa chỉ thường trú trùng với địa chỉ hiện tại
          </div>
          <button type="submit" className="btn btnSubmit">
            Tiếp tục
          </button>
        </div>
      </form>
    </JarvisFormStyle>
  );
}
