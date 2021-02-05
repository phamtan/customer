/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import _ from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';
import * as Actions from '../../actions';

const company = [
  { value: 'vin', label: 'Vingroup' },
  { value: 'vpb', label: 'VPBank' },
  { value: 'masan', label: 'Masan' },
  { value: 'flc', label: 'FLC' },
  { value: 'other', label: 'Khác' },
];

const useStyles = makeStyles(() => ({
  formContainer: {
    width: '100%',
    backgroundColor: 'white',
    minHeight: '100vh',
    marginTop: '16px',
  },
  titleHeader: {
    fontSize: '24px',
    width: '100%',
    textAlign: 'left',
    paddingLeft: '16px',
    marginTop: '16px',
    marginBottom: '36px',
  },
  secondHeader: {
    fontSize: '16px',
    width: '100%',
    textAlign: 'center',
    paddingLeft: '16px',
    paddingRight: '24px',
  },
  action: {
    width: '100%',
    height: '46px',
    borderRadius: '4px',
    paddingLeft: '16px',
    paddingRight: '16px',
    marginTop: '16px',
    marginBottom: '16px',
    backgroundColor: '#028547',
    color: 'white',
    fontSize: '14px',
    border: 'none',
    textTransform: 'uppercase',
  },
  genderContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  lableStyle: {
    fontSize: '16px',
  },
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
}));

const schema = yup.object().shape({
  // employmentStatus: yup.object().required('Bạn chưa chọn tình trạng công việc'),
  // company: yup.object().required('Bạn chưa chọn công ty'),
  // companyAddress: yup.object({
  //   addressDetail: yup.string().required('Bạn chưa nhập địa chỉ chi tiết'),
  //   district: yup.object().required('Bạn chưa chọn quận'),
  //   province: yup.object().required('Bạn chưa chọn thành phố'),
  // }),
  // taxNumber: yup.string().required('Bạn chưa nhập mã số thuế công ty'),
  // companyPhone: yup.string().required('Bạn chưa nhập số điện thoại công ty'),
  // industry: yup.object().required('Bạn chưa chọn lĩnh vực công việc'),
});
export default function Round3(props) {
  const classes = useStyles();
  const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', {});
  const provinces = _.get(props, 'jarvisCustomerV2.provinces', []);
  const selections = _.get(props, 'jarvisCustomerV2.selections', []);
  const companies = _.get(props, 'jarvisCustomerV2.companies', []);
  const [district, setDistrict] = useState([]);
  const { handleSubmit, errors, control } = useForm({
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: {
      ...jarvisCustomer,
    },
    resolver: yupResolver(schema),
  });

  function onSubmitForm(values) {
    const valuesSubmit = [...values];
    valuesSubmit.docIssuedDate = moment(values.docIssuedDate).format(
      'DD/MM/YYYY',
    );
    valuesSubmit.dob = moment(values.dob).format('YYYY-MM-DDTHH:mm:ss.SSS');
    return new Promise((resolve, reject) => {
      props.dispatch(Actions.saveDataApp(valuesSubmit, resolve, reject));
    })
      .then(() => {
        props.setStep(23);
      })
      .catch(() => {
        props.handleShoMessage({
          message: 'Có lỗi xảy ra',
          severity: 'error',
        });
      });
  }

  function changeProvince(e) {
    const province = provinces.filter(province => province.code === e.value)[0];
    setDistrict(province.districts);
  }

  function loadCompanies(val) {
    props.dispatch(Actions.getCompaniesSearch(val));
  }

  return (
    <JarvisFormStyle>
      <Header className="header" step={3} showStep />
      <div className={classes.formContainer}>
        <div className={classes.titleHeader}>Thông tin công việc</div>
        <form className="formWrapper" onSubmit={handleSubmit(onSubmitForm)}>
          <div className="formWrapper">
            <div className="form-group">
              <Controller
                name="nameOfEmployer"
                control={control}
                render={({ value, onChange }) => (
                  <Autocomplete
                    id="country-select-demo"
                    style={{ width: '90vw' }}
                    options={
                      companies &&
                      companies.map(company => ({
                        value: company.code,
                        label: company.name,
                      }))
                    }
                    classes={{
                      option: classes.option,
                    }}
                    onChange={(_event, newValue) => {
                      if (newValue) {
                        onChange(newValue.value);
                      }
                    }}
                    autoHighlight
                    getOptionLabel={option => option.label}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Công ty đang công tác"
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                        }}
                        onChange={ev => {
                          if (
                            ev.target.value !== '' ||
                            ev.target.value !== null
                          ) {
                            // _.debounce(() => {
                            loadCompanies(ev.target.value);
                            // }, 1000);
                          }
                        }}
                      />
                    )}
                  />
                )}
              />
              {errors.nameOfEmployer && (
                <span className="formError">
                  {errors.nameOfEmployer.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <Controller
                as={TextField}
                name="employerAddressLine"
                fullWidth
                variant="outlined"
                label="Địa chỉ công ty"
                control={control}
              />
              {errors.employerAddressLine && (
                <span className="formError">
                  {errors.employerAddressLine.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <Controller
                name="employerProvince"
                control={control}
                render={({ value, onChange }) => (
                  <Autocomplete
                    style={{ width: '90vw' }}
                    options={provinces.map(province => ({
                      value: province.code,
                      label: province.name,
                    }))}
                    classes={{
                      option: classes.option,
                    }}
                    autoHighlight
                    onChange={(_event, newValue) => {
                      changeProvince(newValue);
                      onChange(newValue.value);
                    }}
                    getOptionLabel={option => option.label}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Thành phố"
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                )}
              />
              {errors.permanentProvince && (
                <span className="formError">
                  {errors.permanentProvince.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <Controller
                name="employerDistrict"
                control={control}
                render={({ value, onChange }) => (
                  <Autocomplete
                    style={{ width: '90vw' }}
                    options={
                      district &&
                      district.map(dis => ({
                        value: dis.code,
                        label: dis.name,
                      }))
                    }
                    classes={{
                      option: classes.option,
                    }}
                    onChange={(_event, newValue) => {
                      onChange(newValue.value);
                    }}
                    autoHighlight
                    getOptionLabel={option => option.label}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Quận"
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                )}
              />
              {errors.permanentDistrict && (
                <span className="formError">
                  {errors.permanentDistrict.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <Controller
                as={TextField}
                name="companyPhone"
                fullWidth
                variant="outlined"
                label="Số Điện thoại cố định"
                control={control}
              />
              {errors.companyPhone && (
                <span className="formError">{errors.companyPhone.message}</span>
              )}
            </div>

            <div className="form-group">
              <Controller
                as={TextField}
                name="companyPhone"
                fullWidth
                variant="outlined"
                label="Số máy lẻ"
                control={control}
              />
              {errors.ext && (
                <span className="formError">{errors.ext.message}</span>
              )}
            </div>

            <div className="form-group">
              <Controller
                name="typeCompany"
                control={control}
                render={({ value, onChange }) => (
                  <Autocomplete
                    style={{ width: '90vw' }}
                    options={
                      selections &&
                      selections
                        .filter(
                          selection => selection.category === 'TYPEOFCOMPANY',
                        )
                        .map(selection => ({
                          value: selection.code,
                          label: selection.nameVi,
                        }))
                    }
                    classes={{
                      option: classes.option,
                    }}
                    autoHighlight
                    onChange={(_event, newValue) => {
                      onChange(newValue.value);
                    }}
                    getOptionLabel={option => option.label}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Loại hình công ty"
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                        }}
                      />
                    )}
                  />
                )}
              />
              {errors.industry && (
                <span className="formError">{errors.industry.message}</span>
              )}
            </div>
            <div className="form-group">
              <Controller
                name="position"
                control={control}
                render={({ value, onChange }) => (
                  <Autocomplete
                    style={{ width: '90vw' }}
                    options={
                      selections &&
                      selections
                        .filter(
                          selection => selection.category === 'OCCUPATION',
                        )
                        .map(selection => ({
                          value: selection.code,
                          label: selection.nameVi,
                        }))
                    }
                    classes={{
                      option: classes.option,
                    }}
                    autoHighlight
                    onChange={(_event, newValue) => {
                      onChange(newValue.value);
                    }}
                    getOptionLabel={option => option.label}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Vị trí hiện tại"
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                        }}
                      />
                    )}
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
      </div>
    </JarvisFormStyle>
  );
}
