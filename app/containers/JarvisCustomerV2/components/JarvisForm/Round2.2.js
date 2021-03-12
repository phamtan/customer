/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState, useCallback, useEffect } from 'react';
import _ from 'lodash';
import { useFormik } from 'formik';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import debounce from 'lodash.debounce';
import moment from 'moment';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';
import StepApp from './StepApp';
import * as Actions from '../../actions';

const filter = createFilterOptions();

const useStyles = makeStyles(theme => ({
  formContainer: {
    width: '100%',
    maxWidth: '470px',
    backgroundColor: 'white',
    marginTop: '16px',
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

export default function Round3(props) {
  const classes = useStyles();
  const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', {});
  const provinces = _.get(props, 'jarvisCustomerV2.provinces', []);
  const selections = _.get(props, 'jarvisCustomerV2.selections', []);
  const companies = _.get(props, 'jarvisCustomerV2.companies', []);
  const [district, setDistrict] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [showOtherCompany, setShowOtherCompany] = useState(false);
  const [searchCompany, setSearchCompany] = useState('');

  const validate = values => {
    const errors = {};
    if (!values.nameOfEmployer) {
      errors.nameOfEmployer = 'Bạn chưa chọn công ty đang làm việc';
    }

    if (values.nameOfEmployer && values.nameOfEmployer === 'others') {
      if (!values.employerNameOther) {
        errors.employerNameOther = 'Bạn chưa nhập tên công ty';
      }
    }
    const reg = /[`~@!#$^%&*()_+=\\\-[\]';,./{}|"":<>?]/g;
    if (!values.employerAddressLine) {
      errors.employerAddressLine = 'Bạn chưa nhập địa chỉ công ty';
    } else if (
      values.employerAddressLine &&
      reg.test(values.employerAddressLine)
    ) {
      errors.employerAddressLine =
        'Xin lỗi quý khách, Địa chỉ không chứa kí tự đặc biệt';
    }

    if (!values.employerProvince) {
      errors.employerProvince = 'Bạn chưa chọn Tỉnh/Thành phố';
    }

    if (!values.employerDistrict) {
      errors.employerDistrict = 'Bạn chưa chọn Thành phố/Quận huyện';
    }

    if (!values.landlinePhoneNo) {
      errors.landlinePhoneNo = 'Bạn chưa nhập số điện thoại công ty';
    } else if (
      values.landlinePhoneNo &&
      !/^[0-9]+$/i.test(values.landlinePhoneNo)
    ) {
      errors.landlinePhoneNo = 'Số điện thoại chỉ bao gồm số';
    }

    if (values.internalPhoneNo && !/^[0-9]+$/i.test(values.internalPhoneNo)) {
      errors.internalPhoneNo = 'Số máy lẻ chỉ bao gồm số';
    }

    if (!values.typeCompany) {
      errors.typeCompany = 'Bạn chưa nhập loại hình công ty';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: jarvisCustomer || {},
    validate,
    onSubmit: onSubmitForm,
  });

  function removeUnicode(str) {
    return (str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  }

  useEffect(() => {
    setCompanyList([...companies]);
  }, [companies]);

  useEffect(() => {
    if (jarvisCustomer) {
      if (jarvisCustomer.employerProvince && provinces) {
        const district = district;
        const province = provinces.filter(
          pv => pv.code === jarvisCustomer.employerProvince,
        )[0];
        if (province && province.districts) {
          setDistrict(province.districts);
        }
      }
      if (
        jarvisCustomer.nameOfEmployer &&
        jarvisCustomer.nameOfEmployer !== 'others'
      ) {
        setSearchCompany(removeUnicode(jarvisCustomer.companyName));
        debouncedSearch(removeUnicode(jarvisCustomer.companyName));
      }
    }
  }, [jarvisCustomer]);

  function onSubmitForm(values) {
    const valuesSubmit = Object.assign(jarvisCustomer, values);
    valuesSubmit.processStep = 'Work_Form_R_2_2';
    valuesSubmit.dob = moment(valuesSubmit.dob, 'DD/MM/YYYY')
      .utc()
      .isValid()
      ? moment(valuesSubmit.dob, 'DD/MM/YYYY').format('YYYY-MM-DDTHH:mm:ss.SSS')
      : null;
    return new Promise((resolve, reject) => {
      props.dispatch(Actions.saveDataApp(valuesSubmit, resolve, reject));
    })
      .then(() =>
        new Promise((res, rej) => {
          props.dispatch(
            Actions.checkLosResult(
              {
                appId: jarvisCustomer.applicationId,
                round: 'Check_1',
              },
              res,
              rej,
            ),
          );
        }).then(result => {
          if (result.status === 'PASS' && result.data.pa === 'N') {
            props.history.push('/v2/waiting');
          } else if (result.status === 'PASS' && result.data.pa === 'Y') {
            props.history.push('/v2/round3');
          } else if (
            result.status === 'Canceled' ||
            result.status === 'Rejected'
          ) {
            props.history.push('/v2/reject');
          } else {
            props.history.push('/v2/regis-done');
          }
        }),
      )
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

  const debouncedSearch = useCallback(
    debounce(
      nextValue => props.dispatch(Actions.getCompaniesSearch(nextValue)),
      1000,
    ),
    [],
  );

  function loadCompanies(val) {
    formik.setFieldValue('nameOfEmployer', val);
    setSearchCompany(val);
    debouncedSearch(val);
  }

  function chooseCompany(val) {
    if (val === 'others') {
      setShowOtherCompany(true);
    } else {
      setShowOtherCompany(false);
    }
  }

  function getDistrictSelected(value) {
    const item = district.find(opt => {
      if (opt.code === value) return { value: opt.code, label: opt.name };
    });
    return { value: item && item.code, label: item && item.name } || {};
  }

  function getCompanySelected(value) {
    if (value === 'others') {
      return {
        value: 'others',
        label: 'Khác',
      };
    }
    const item =
      companies &&
      companies.find(opt => {
        if (opt.code === value) return { value: opt.code, label: opt.name };
      });
    return item ? { value: item && item.code, label: item && item.name } : null;
  }

  return (
    <JarvisFormStyle>
      <Header className="header" step={3} />
      <StepApp step={1} />
      <div className={classes.formContainer}>
        <div className={classes.titleHeader}>Thông tin công việc</div>
        <form onSubmit={formik.handleSubmit}>
          <div className="formWrapper">
            <div className="form-group">
              <Autocomplete
                id="country-select-demo"
                name="nameOfEmployer"
                style={{ width: '100%' }}
                options={
                  companyList &&
                  companyList.map(company => ({
                    value: company.code,
                    label: company.name,
                  }))
                }
                value={getCompanySelected(formik.values.nameOfEmployer)}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  // Suggest the creation of a new value
                  if (params.inputValue !== '') {
                    filtered.push({
                      value: 'others',
                      label: 'Khác',
                    });
                  }

                  return filtered;
                }}
                classes={{
                  option: classes.option,
                }}
                onChange={(_event, newValue) => {
                  if (newValue && newValue.value) {
                    formik.setFieldValue('nameOfEmployer', newValue.value);
                    chooseCompany(newValue.value);
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
                    onChange={ev => loadCompanies(ev.target.value)}
                  />
                )}
              />
              {formik.errors.nameOfEmployer &&
                formik.touched.nameOfEmployer && (
                  <span className="formError">
                    {formik.errors.nameOfEmployer}
                  </span>
                )}
            </div>

            {showOtherCompany && (
              <div className="form-group">
                <TextField
                  name="employerNameOther"
                  fullWidth
                  variant="outlined"
                  label="Tên công ty"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.employerNameOther}
                />
                {formik.errors.employerNameOther &&
                  formik.touched.employerNameOther && (
                    <span className="formError">
                      {formik.errors.employerNameOther}
                    </span>
                  )}
              </div>
            )}

            <div className="form-group">
              <TextField
                name="employerAddressLine"
                fullWidth
                variant="outlined"
                label="Địa chỉ công ty"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.employerAddressLine}
              />
              {formik.errors.employerAddressLine &&
                formik.touched.employerAddressLine && (
                  <span className="formError">
                    {formik.errors.employerAddressLine}
                  </span>
                )}
            </div>

            <div className="form-group">
              <Autocomplete
                name="employerProvince"
                style={{ width: '100%' }}
                options={provinces.map(province => ({
                  value: province.code,
                  label: province.name,
                }))}
                value={
                  provinces &&
                  formik.values.employerProvince &&
                  provinces
                    .filter(
                      province =>
                        province.code === formik.values.employerProvince,
                    )
                    .map(province => ({
                      value: province.code,
                      label: province.name,
                    }))[0]
                }
                classes={{
                  option: classes.option,
                }}
                autoHighlight
                onChange={(_event, newValue) => {
                  changeProvince(newValue);
                  formik.setFieldValue('employerProvince', newValue.value);
                }}
                getOptionLabel={option => option.label}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Tỉnh/Thành phố"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              {formik.errors.employerProvince &&
                formik.touched.employerProvince && (
                  <span className="formError">
                    {formik.errors.employerProvince}
                  </span>
                )}
            </div>

            <div className="form-group">
              <Autocomplete
                name="employerDistrict"
                style={{ width: '100%' }}
                options={district.map(dis => ({
                  value: dis.code || '',
                  label: dis.name || '',
                }))}
                value={getDistrictSelected(formik.values.employerDistrict)}
                classes={{
                  option: classes.option,
                }}
                onChange={(_event, newValue) => {
                  formik.setFieldValue('employerDistrict', newValue.value);
                }}
                autoHighlight
                getOptionLabel={option => option.label}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Quận/Huyện/Thành phố"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              {formik.errors.employerDistrict &&
                formik.touched.employerDistrict && (
                  <span className="formError">
                    {formik.errors.employerDistrict}
                  </span>
                )}
            </div>

            <div className="form-group">
              <TextField
                name="landlinePhoneNo"
                fullWidth
                variant="outlined"
                label="Số Điện thoại cố định"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.landlinePhoneNo}
              />
              {formik.errors.landlinePhoneNo &&
                formik.touched.landlinePhoneNo && (
                  <span className="formError">
                    {formik.errors.landlinePhoneNo}
                  </span>
                )}
            </div>

            <div className="form-group">
              <TextField
                name="internalPhoneNo"
                fullWidth
                variant="outlined"
                label="Số máy lẻ"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.internalPhoneNo}
              />
              {formik.errors.internalPhoneNo &&
                formik.touched.internalPhoneNo && (
                  <span className="formError">
                    {formik.errors.internalPhoneNo}
                  </span>
                )}
            </div>

            <div className="form-group">
              <Autocomplete
                name="typeCompany"
                style={{ width: '100%' }}
                options={
                  selections &&
                  selections
                    .filter(selection => selection.category === 'TYPEOFCOMPANY')
                    .map(selection => ({
                      value: selection.code || '',
                      label: selection.nameVI || '',
                    }))
                }
                value={
                  selections &&
                  formik.values.typeCompany &&
                  selections
                    .filter(
                      selection =>
                        selection.category === 'TYPEOFCOMPANY' &&
                        selection.code === formik.values.typeCompany,
                    )
                    .map(selection => ({
                      value: selection.code || '',
                      label: selection.nameVI || '',
                    }))[0]
                }
                classes={{
                  option: classes.option,
                }}
                autoHighlight
                onChange={(_event, newValue) => {
                  formik.setFieldValue('typeCompany', newValue.value);
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
              {formik.errors.typeCompany && formik.touched.typeCompany && (
                <span className="formError">{formik.errors.typeCompany}</span>
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
