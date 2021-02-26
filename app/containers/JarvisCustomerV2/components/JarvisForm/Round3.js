/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState, useCallback, useEffect } from 'react';
import _ from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
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
import * as Actions from '../../actions';

const filter = createFilterOptions();

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
  const [companyList, setCompanyList] = useState([]);
  const [showOtherCompany, setShowOtherCompany] = useState(false);
  const [searchCompany, setSearchCompany] = useState('');
  const { handleSubmit, errors, control, formState } = useForm({
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: {
      ...jarvisCustomer,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // if (companies) {
    //   companies.push({ code: 'others', name: 'Khác' });
    // }
    setCompanyList([...companies]);
  }, [companies]);

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

  const debouncedSearch = useCallback(
    debounce(
      nextValue => props.dispatch(Actions.getCompaniesSearch(nextValue)),
      1000,
    ),
    [],
  );

  function loadCompanies(val) {
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
                      companyList &&
                      companyList.map(company => ({
                        value: company.code,
                        label: company.name,
                      }))
                    }
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
                      if (newValue) {
                        onChange(newValue.value);
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
                )}
              />
              {errors.nameOfEmployer && (
                <span className="formError">
                  {errors.nameOfEmployer.message}
                </span>
              )}
            </div>

            {showOtherCompany && (
              <div className="form-group">
                <Controller
                  as={TextField}
                  name="employerNameOther"
                  fullWidth
                  variant="outlined"
                  label="Tên công ty"
                  control={control}
                />
                {errors.employerNameOther && (
                  <span className="formError">
                    {errors.employerNameOther.message}
                  </span>
                )}
              </div>
            )}

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
                name="landlinePhoneNo"
                fullWidth
                variant="outlined"
                label="Số Điện thoại cố định"
                control={control}
              />
              {errors.landlinePhoneNo && (
                <span className="formError">
                  {errors.landlinePhoneNo.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <Controller
                as={TextField}
                name="internalPhoneNo"
                fullWidth
                variant="outlined"
                label="Số máy lẻ"
                control={control}
              />
              {errors.internalPhoneNo && (
                <span className="formError">
                  {errors.internalPhoneNo.message}
                </span>
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
                          label: selection.nameVI,
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
                          label: selection.nameVI,
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
            <button
              type="submit"
              className="btn btnSubmit"
              disabled={formState.isSubmitting}
            >
              Tiếp tục
            </button>
          </div>
        </form>
      </div>
    </JarvisFormStyle>
  );
}
