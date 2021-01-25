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

const employmentStatus = [
  { value: 'working', label: 'Đi làm' },
  { value: 'retired', label: 'Thất nghiệp' },
  { value: 'out', label: 'Nghỉ hưu' },
];

const company = [
  { value: 'vin', label: 'Vingroup' },
  { value: 'vpb', label: 'VPBank' },
  { value: 'masan', label: 'Masan' },
  { value: 'flc', label: 'FLC' },
  { value: 'other', label: 'Khác' },
];

const Industry = [
  { value: 'mm', label: 'May mặc' },
  { value: 'vt', label: 'Vận tải' },
  { value: 'nh', label: 'Ngân hàng' },
  { value: 'qd', label: 'Quân đội' },
  { value: 'ca', label: 'Công an' },
  { value: 'other', label: 'Khác' },
];

const CITY = [
  { value: 'hn', label: 'Hà Nội' },
  { value: 'hcm', label: 'Hồ chí minh' },
  { value: 'dn', label: 'Đà nẵng' },
  { value: 'hp', label: 'Hải phòng' },
  { value: 'bn', label: 'Bắc Ninh' },
  { value: 'other', label: 'Khác' },
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
  employmentStatus: yup.object().required('Bạn chưa chọn tình trạng công việc'),
  company: yup.object().required('Bạn chưa chọn công ty'),
  companyAddress: yup.object({
    addressDetail: yup.string().required('Bạn chưa nhập địa chỉ chi tiết'),
    district: yup.object().required('Bạn chưa chọn quận'),
    province: yup.object().required('Bạn chưa chọn thành phố'),
  }),
  taxNumber: yup.string().required('Bạn chưa nhập mã số thuế công ty'),
  companyPhone: yup.string().required('Bạn chưa nhập số điện thoại công ty'),
  industry: yup.object().required('Bạn chưa chọn lĩnh vực công việc'),
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
    props.setStep(9);
  }

  function goBack() {
    props.setStep(5);
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
            <label>Tình trạng công việc hiện tại</label>
            <Controller
              name="employmentStatus"
              control={control}
              render={({ value, onChange }) => (
                <Select
                  className="formControl"
                  options={employmentStatus}
                  onChange={e => onChange(e)}
                  name="employmentStatus"
                  value={value}
                />
              )}
            />
            {errors.employmentStatus && (
              <span className="formError">
                {errors.employmentStatus.message}
              </span>
            )}
          </div>
          <div className="form-group">
            <label>Công ty đang công tác</label>
            <Controller
              name="company"
              control={control}
              render={props => (
                <Select
                  className="formControl"
                  options={company}
                  onChange={e => props.onChange(e)}
                  value={props.value}
                />
              )}
            />
            {errors.company && (
              <span className="formError">{errors.company.message}</span>
            )}
          </div>
          <div className="form-group">
            <label>Mã số thuế</label>
            <input
              name="taxNumber"
              className="form-control formControl"
              placeholder="Mã số thuế"
              type="text"
              ref={register}
            />
            {errors.taxNumber && (
              <span className="formError">{errors.taxNumber.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Địa chỉ công ty</label>
            <input
              name="companyAddress.addressDetail"
              className="form-control formControl"
              placeholder="Địa chỉ công ty"
              type="text"
              ref={register}
            />
            {errors.companyAddress && errors.companyAddress.addressDetail && (
              <span className="formError">
                {errors.companyAddress.addressDetail.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Quận</label>
            <Controller
              name="companyAddress.district"
              control={control}
              render={props => (
                <Select
                  className="formControl"
                  options={DISTRICT}
                  onChange={e => props.onChange(e)}
                  value={props.value}
                />
              )}
            />
            {errors.companyAddress && errors.companyAddress.district && (
              <span className="formError">
                {errors.companyAddress.district.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Thành phố</label>
            <Controller
              name="companyAddress.province"
              control={control}
              render={props => (
                <Select
                  className="formControl"
                  options={CITY}
                  onChange={e => props.onChange(e)}
                  value={props.value}
                />
              )}
            />
            {errors.companyAddress && errors.companyAddress.province && (
              <span className="formError">
                {errors.companyAddress.province.message}
              </span>
            )}
          </div>
          <div className="form-group">
            <label>Số Điện thoại cố định</label>
            <input
              name="companyPhone"
              className="form-control formControl"
              placeholder="Số điện thoại"
              type="number"
              ref={register}
            />
            {errors.companyPhone && (
              <span className="formError">{errors.companyPhone.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Số máy lẻ</label>
            <input
              name="ext"
              className="form-control formControl"
              placeholder="Ext"
              type="number"
              ref={register}
            />
            {errors.issueDate && (
              <span className="formError">{errors.issueDate.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Lĩnh vực công việc</label>
            <Controller
              name="industry"
              control={control}
              render={props => (
                <Select
                  className="formControl"
                  options={Industry}
                  onChange={e => props.onChange(e)}
                  value={props.value}
                />
              )}
            />
            {errors.industry && (
              <span className="formError">{errors.industry.message}</span>
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
