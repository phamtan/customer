/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import XRegExp from 'xregexp';
import Header from './Header';
import StepApp from './StepApp';
import JarvisFormStyle from './JarvisFormStyle';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  formContainer: {
    width: '100%',
    maxWidth: '470px',
    backgroundColor: 'white',
    minHeight: '100vh',
    marginTop: '16px',
    [theme.breakpoints.up('md')]: {
      marginTop: '0px',
      marginBottom: '32px',
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
    width: '99%',
    margin: 'auto',
    height: '46px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#028547',
    color: 'white',
    fontSize: '14px',
    border: 'none',
    textTransform: 'uppercase',
    marginBottom: '24px',
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
  formSubItemContainer: {
    display: 'flex',
    marginBottom: '1rem',
    alignItems: 'center',
  },
  formSubItem: {
    width: '100%',
  }
}));


const DOCUMENT_TYPE = [
  { value: 'PV', label: 'Hộ chiếu' },
  { value: 'IC', label: 'CMND/CCCD' },
  { value: 'ICM', label: 'CMND Quân Đội' },
];

function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
      .toUpperCase()
      .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;
}

export default function Round1(props) {
  const classes = useStyles();
  const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', null);
  const provinces = _.get(props, 'jarvisCustomerV2.provinces', []);
  const selections = _.get(props, 'jarvisCustomerV2.selections', []);
  const countries = _.get(props, 'jarvisCustomerV2.countries', []);
  const [district, setDistrict] = useState([]);
  const [currentDistrict, setCurrentDistrict] = useState([]);
  const [showPermanentAddress, setShowPermaneAddress] = useState(
    jarvisCustomer.currentIsPermanent === "0");
  // const [isMobile] = useState(
  //   /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  //     navigator.userAgent,
  //   ),
  // );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Bạn chưa nhập email';
    } else if (
      !/^[a-zA-Z0-9!#$%&’*+/=?^_{|}~-]+(?:\.[a-zA-Z0-9!#$%&’*+/=?^_{|}~-]+)*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/i.test(
        values.email,
      )
    ) {
      errors.email = 'Email không đúng định dạng';
    }
    if (!values.fullName) {
      errors.fullName = 'Bạn chưa nhập họ tên';
    } else if (values.fullName.trim().split(' ').length < 2) {
      errors.fullName =
        'Xin lỗi quý khách, phần họ tên không đúng định dạng';
    } else if (!XRegExp('^[\\pL\\s]+$').test(values.fullName)) {
      errors.fullName =
        'Xin lỗi quý khách, phần họ tên không chứa số hoặc kí tự đặc biệt';
    }
    if (!values.mobileNumber) {
      errors.mobileNumber = 'Bạn chưa nhập số điện thoại';
    } else if (values.mobileNumber && values.mobileNumber.length > 10) {
      errors.mobileNumber = 'Số điện thoại chỉ từ 10 số';
    } else if (
      values.mobileNumber &&
      !/^[0-9]+$/i.test(values.mobileNumber)
    ) {
      errors.mobileNumber = 'Số điện thoại chỉ bao gồm số';
    }

    if (!values.dob) {
      errors.dob = 'Bạn chưa nhập ngày sinh'
    } else if (values.dob) {
      const doDob = moment(values.dob, 'DD/MM/YYYY');
      const currentYear = moment();
      if (doDob.year()) {
        const diffYears = currentYear.diff(doDob, 'years', true);
        if (diffYears > 65 || diffYears < 18) {
          errors.dob =
            'Xin lỗi quý khách, Tuổi không được nhỏ hơn 18 và lớn hơn 65';
        }
      } else {
        errors.dob =
           'Xin lỗi quý khách, phần nhập ngày sinh sai định dạng';
      }
    }

    if (!values.nationality) {
      errors.nationality = 'Bạn chưa chọn quốc tịch'
    } else if (values.nationality && values.nationality !== 'VN') {
      errors.nationality =
        'Xin lỗi quý khách, Hiện tại hệ thống chưa hỗ trợ người nước ngoài';
    }

    const listCustomerIdentityDTO = [];

    if (!values.documentType) {
      errors.documentType = 'Bạn chưa chọn loại giấy tờ';
    }

    if (!values.documentNumber) {
      errors.documentNumber = 'Bạn chưa nhập số giấy tờ';
    } 

    if (
      values.documentType &&
      values.documentNumber &&
      values.documentType !== 'PV'
    ) {
      const documentLength = values.documentNumber.length;
      if (
        values.documentType === 'ICM' &&
        (documentLength !== 8 && documentLength !== 12)
      ) {
        errors.documentNumber =
          'Xin lỗi quý khách, số CMT quý khách vừa điền không hợp lệ';
      }
      if (
        values.documentType === 'IC' &&
        values.documentNumber &&
        !/^(\.|\d)\d*$/.test(values.documentNumber)
      ) {
        errors.documentNumber =
          'Xin lỗi quý khách, số CMT quý khách vừa điền không hợp lệ';
      }
      if (
        values.documentType === 'IC' &&
        (documentLength !== 9 && documentLength !== 12)
      ) {
        errors.documentNumber =
          'Xin lỗi quý khách, số CMT quý khách vừa điền không hợp lệ';
      }
    } else if (
      values.documentType === 'PV' &&
      (!values.listCustomerIdentityDTO ||
      (!values.listCustomerIdentityDTO[0] ||
        !values.listCustomerIdentityDTO[0].documentNumber) &&
      (!values.listCustomerIdentityDTO[1] ||
        !values.listCustomerIdentityDTO[1].documentNumber))
    ) {
      listCustomerIdentityDTO.splice(0, 0, {
        documentNumber:
          'Xin lỗi quý khách, Bạn cần nhập ít nhất 1 số chứng minh thư',
      });
      errors.listCustomerIdentityDTO = listCustomerIdentityDTO;
    } else if (
      values.documentType === 'PV' &&
      (!values.listCustomerIdentityDTO ||
      values.listCustomerIdentityDTO[0] &&
      values.listCustomerIdentityDTO[0] === 'PV' &&
      values.listCustomerIdentityDTO[1] &&
      !values.listCustomerIdentityDTO[1].documentNumber)
    ) {
      listCustomerIdentityDTO.splice(0, 0, {
        documentNumber:
          'Xin lỗi quý khách, Bạn cần nhập ít nhất 1 số chứng minh thư',
      });
      errors.listCustomerIdentityDTO = listCustomerIdentityDTO;
    } else if (
      values.documentType === 'PV' &&
      values.listCustomerIdentityDTO &&
             values.listCustomerIdentityDTO[0] &&
             values.listCustomerIdentityDTO[0].documentType ===
               'PV' &&
               values.listCustomerIdentityDTO[1] && 
             values.listCustomerIdentityDTO[1].documentType === 'PV'
    ) {
      errors.documentNumber =
               'Xin lỗi quý khách, Bạn cần nhập ít nhất 1 số chứng minh thư';
    }

    if (values.documentType === 'PV' && values.documentNumber) {
      const documentLength = values.documentNumber;
      if (documentLength < 8 || documentLength > 13) {
        errors.documentNumber =
          'Xin lỗi quý khách, Hộ chiếu quý khách vừa nhập không hợp lệ';
      }
    }

    if (
      values.listCustomerIdentityDTO &&
      values.listCustomerIdentityDTO[0] &&
      values.listCustomerIdentityDTO[0].documentType === 'PV' &&
      values.listCustomerIdentityDTO[0] &&
      values.listCustomerIdentityDTO[0].documentNumber
    ) {
      const documentLength =
        values.listCustomerIdentityDTO[0].documentNumber;
      if (documentLength < 8 || documentLength > 13) {
        listCustomerIdentityDTO.splice(1, 0, {
          documentNumber:
            'Xin lỗi quý khách, Bạn cần nhập ít nhất 1 số chứng minh thư',
        });
        errors.listCustomerIdentityDTO = listCustomerIdentityDTO;
      }
    }

    if (
      values.listCustomerIdentityDTO &&
      values.listCustomerIdentityDTO[1] &&
      values.listCustomerIdentityDTO[1].documentType === 'PV' &&
      values.listCustomerIdentityDTO[1] &&
      values.listCustomerIdentityDTO[1].documentNumber
    ) {
      const documentLength =
        values.listCustomerIdentityDTO[1].documentNumber;
      if (documentLength < 8 || documentLength > 13) {
        listCustomerIdentityDTO.splice(0, 0, {
          documentNumber:
            'Xin lỗi quý khách, Bạn cần nhập ít nhất 1 số chứng minh thư',
        });
        errors.listCustomerIdentityDTO = listCustomerIdentityDTO;
      }
    }

    if (values.docIssuedDate) {
      const doIssue = moment(values.docIssuedDate, 'DD/MM/YYYY');
      const currentYear = moment();
      const diffYears = currentYear.diff(doIssue, 'years', true);
      if (diffYears > 15 && values.documentType !== 'PV') {
        errors.docIssuedDate =
          'Xin lỗi quý khách, CMND quá hạn 15 năm không được chấp nhận';
      } else if (
        diffYears > 10 &&
               values.documentType === 'PV'
      ) {
        errors.docIssuedDate =
                 'Xin lỗi quý khách, Hộ chiếu quá hạn 10 năm không được chấp nhận';
      } else if (!doIssue.year()) {
        errors.docIssuedDate =
                 'Xin lỗi quý khách, Ngày cấp không đúng định dạng';
      }
    }

    if (!values.docIssuedPlace) {
      errors.docIssuedPlace = 'Xin lỗi quý khách, Bạn chưa chọn nơi cấp';
    } 

    const reg = /[`~@!#$^%&*()_+=\\\-[\]';,./{}|"":<>?]/g;

    if (!values.permanentAddressLine1) {
      errors.permanentAddressLine1 =
        'Xin lỗi quý khách, Bạn chưa nhập địa chỉ thường trú';
    } else if (
      values.permanentAddressLine1 &&
             reg.test(values.permanentAddressLine1)
    ) {
      errors.permanentAddressLine1 =
               'Xin lỗi quý khách, Địa chỉ không có kí tự đặc biệt';
    } 
    

    if (!values.permanentProvince) {
      errors.permanentProvince =
        'Xin lỗi quý khách, Bạn chưa nhập địa chỉ thường trú';
    } 

    if (!values.permanentDistrict) {
      errors.permanentDistrict =
        'Xin lỗi quý khách, Bạn chưa nhập địa chỉ thường trú';
    } 

    if (
      values.currentIsPermanent &&
      values.currentIsPermanent === '0' &&
      !values.currentAddressLine1
    ) {
      errors.currentAddressLine1 =
        'Xin lỗi quý khách, Bạn chưa nhập địa chỉ hiện tại';
    } else if (
      values.currentIsPermanent &&
             values.currentIsPermanent === '0' &&
             values.currentAddressLine1 &&
             reg.test(values.currentAddressLine1)
    ) {
      errors.currentAddressLine1 =
               'Xin lỗi quý khách, Địa chỉ không có kí tự đặc biệt';
    }

    if (
      values.currentIsPermanent &&
      values.currentIsPermanent === '0' &&
      !values.currentProvince
    ) {
      errors.currentProvince =
        'Xin lỗi quý khách, Bạn chưa nhập địa chỉ hiện tại';
    } 

    if (
      values.currentIsPermanent &&
      values.currentIsPermanent === '0' &&
      !values.currentDistrict
    ) {
      errors.currentDistrict =
        'Xin lỗi quý khách, Bạn chưa nhập địa chỉ hiện tại';
    } 
    
    return errors;
  };

  const formik = useFormik({
    initialValues: jarvisCustomer || {},
    validate,
    onSubmit: onSubmitForm,
  });

  useEffect(() => {
    if (jarvisCustomer) {
      if (jarvisCustomer.permanentProvince && provinces) {
        const province = provinces.filter(
          pv => pv.code === jarvisCustomer.permanentProvince,
        )[0];
        if (province && province.districts) {
          setDistrict(province.districts);
        }
        
      }
      if (jarvisCustomer.currentProvince && provinces) {
        const province = provinces.filter(
          pv => pv.code === jarvisCustomer.currentProvince,
        )[0];
        if (province && province.districts) {
          setCurrentDistrict(province.districts);
        }
      }
    }
  }, [jarvisCustomer]);

  useEffect(() => {
    if (jarvisCustomer && jarvisCustomer.permanentProvince && provinces) {
      const province = provinces.filter(
        pv => pv.code === jarvisCustomer.permanentProvince,
      )[0];
      setDistrict(province.districts);
    }
  }, [provinces]);

  function changeProvince(e) {
    const province = provinces.filter(pv => pv.code === e.value)[0];
    setDistrict(province.districts);
  }

  function changeCurrentProvince(e) {
    const province = provinces.filter(pv => pv.code === e.value)[0];
    setCurrentDistrict(province.districts);
  }

  function changeCurrentIsPermanent(e) {
    if(e === "1") {
      setShowPermaneAddress(false);
    } else {
      setShowPermaneAddress(true);
    }
  }

  function onSubmitForm(values) {
    const valuesSubmit = Object.assign(jarvisCustomer, values);
    valuesSubmit.dob = moment(valuesSubmit.dob, 'DD/MM/YYYY')
      .utc()
      .isValid()
      ? moment(valuesSubmit.dob, 'DD/MM/YYYY').format(
        'YYYY-MM-DDTHH:mm:ss.SSS',
      )
      : null;
    if (values.docIssuedDate && typeof values.docIssuedDate !== 'string') {
      valuesSubmit.docIssuedDate = valuesSubmit.docIssuedDate.format('DD/MM/YYYY');
    }
    
    valuesSubmit.processStep = 'Work_Form_R_1';
    return new Promise((resolve, reject) => {
      props.dispatch(Actions.saveDataApp(valuesSubmit, resolve, reject));
    }).then((result) => new Promise((resolve, reject) => {
      props.dispatch(
        Actions.checkLosRound1(
          {
            jarvisId: result.jarvisId,
          },
          resolve,
          reject,
        ),
      );
    }).then(() => {
      props.history.push('/v2/waiting');
    })).catch(() => {
      props.handleShoMessage({
        message: 'Có lỗi xảy ra',
        severity: 'error',
      });
    });
    
  }

  function getDocumentSelected(value) {
    const item = DOCUMENT_TYPE.find(opt => {
      if (opt.value === value)
        return { value: opt.value, label: opt.label };
    });
    return { value: item && item.value || '', label: item && item.label || '' } || null;
  }

  function getDistrictSelected(options, value) {
    const item = options.find(opt => {
      if (opt.code === value)
        return { value: opt.code, label: opt.name };
    });
    return item && item.code ? { value: item && item.code || '', label: item && item.name || '' } : null;
  }

  function getCountrySelected(value) {
    const item = countries && countries.find(opt => {
      if (opt.isoCode === value)
        return { value: opt.isoCode, label: opt.vi };
    });
    return item && item.isoCode ? { value: item && item.isoCode || '', label: item && item.vi || '' } : null;
  }

  function getCurrentProvinceSelected(value) {
    const item =
      provinces &&
      provinces.find(opt => {
        if (opt.code === value)
          return { value: opt.code, label: opt.name };
      });
    return item && item.code ? { value: item && item.code, label: item && item.name } : null;
  }

  function getCurrentDistrictSelected(value) {
    const item =
      currentDistrict &&
      currentDistrict.find(opt => {
        if (opt.code === value) return { value: opt.code, label: opt.name };
      });
    return item && item.code ? { value: item && item.code, label: item && item.name } : null;
  }

  function getPlaceIssueSelected(value) {
    const item = selections && selections.find(opt => {
      if (opt.category === 'PLACEOFISSUE' && opt.code === value)
        return { value: opt.code, label: opt.nameVI };
    });
    return { value: item && item.code, label: item && item.nameVI } || {};
  }

  const dateFormatter = str => str;

  return (
    <JarvisFormStyle>
      <Header className="header" step={2} />
      <StepApp />
      <div className={classes.formContainer}>
        <div className={classes.titleHeader}>Thông tin cá nhân</div>
        <form onSubmit={formik.handleSubmit}>
          <div className="formWrapper">
            <div className="form-group">
              <TextField
                name="fullName"
                fullWidth
                variant="outlined"
                label="Họ tên"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
                placeholder="Nguyễn văn A"
              />
              {formik.errors.fullName && formik.touched.fullName && (
                <span className="formError">{formik.errors.fullName}</span>
              )}
            </div>
            <div className="form-group">
              <TextField
                name="mobileNumber"
                fullWidth
                variant="outlined"
                label="Số điện thoại"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={classes.inputSytle}
                placeholder="09765444"
                classes={{
                  root: classes.inputStyle,
                }}
                value={formik.values.mobileNumber}
              />
              {formik.errors.mobileNumber && formik.touched.mobileNumber && (
                <span className="formError">
                  {formik.errors.mobileNumber}
                </span>
              )}
            </div>

            <div className="form-group">
              <TextField
                name="email"
                fullWidth
                variant="outlined"
                label="Email"
                className={classes.inputSytle}
                classes={{
                  root: classes.inputStyle,
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <span className="formError">{formik.errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <MuiPickersUtilsProvider
                utils={MomentUtils}
                libInstance={moment}
              >
                <KeyboardDatePicker
                  autoOk
                  name="dob"
                  variant="inline"
                  inputVariant="outlined"
                  label="Ngày sinh"
                  format="DD/MM/YYYY"
                  defaultValue={
                    formik.values.dob &&
                    moment(formik.values.dob, 'DD/MM/YYYY').isValid()
                      ? formik.values.dob
                      : null
                  }
                  value={formik.values.dob}
                  InputAdornmentProps={{ position: 'end' }}
                  rifmFormatter={dateFormatter}
                  onChange={date => formik.setFieldValue('dob', date)}
                  invalidDateMessage=""
                  minDateMessage=""
                  maxDateMessage=""
                  disableFuture
                  fullWidth
                />
              </MuiPickersUtilsProvider>
              {formik.errors.dob && (
                <span className="formError">{formik.errors.dob}</span>
              )}
            </div>

            <div className="form-group">
              <FormControl
                component="fieldset"
                name="gender"
                value={formik.values.gender}
              >
                <FormLabel component="legend" className={classes.labelStyle}>
                  Giới tính
                </FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  onChange={e =>
                    formik.setFieldValue('gender', e.target.value)
                  }
                  className={classes.genderContainer}
                  value={formik.values.gender}
                >
                  <FormControlLabel
                    value="M"
                    control={<Radio />}
                    label="Nam"
                  />
                  <FormControlLabel
                    value="F"
                    control={<Radio />}
                    label="Nữ"
                  />
                </RadioGroup>
              </FormControl>
              {formik.errors.gender && formik.touched.gender && (
                <span className="formError">{formik.errors.gender}</span>
              )}
            </div>

            <div className="form-group">
              <Autocomplete
                id="country-select-demo"
                style={{ width: '100%' }}
                name="nationality"
                options={
                  countries &&
                  countries.map(country => ({
                    value: country.isoCode,
                    label: country.vi,
                    code: country.isoCode,
                  }))
                }
                value={
                  countries && getCountrySelected(formik.values.nationality)
                }
                getOptionSelected={(option, val) => option.name === val.name}
                classes={{
                  option: classes.option,
                }}
                onChange={(event, newValue) => {
                  if (newValue) {
                    formik.setFieldValue('nationality', newValue.value);
                  }
                }}
                autoHighlight
                getOptionLabel={option => (option ? option.label : '')}
                renderOption={option => (
                  <React.Fragment>
                    <span>{countryToFlag(option.code)}</span>
                    {option.label}
                  </React.Fragment>
                )}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Quốc gia"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'off', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              {formik.errors.nationality && formik.touched.nationality && (
                <span className="formError">{formik.errors.nationality}</span>
              )}
            </div>

            <div className="form-group">
              <Autocomplete
                style={{ width: '100%' }}
                options={DOCUMENT_TYPE || ['']}
                name="documentType"
                classes={{
                  option: classes.option,
                }}
                onChange={(event, newValue) => {
                  formik.setFieldValue('documentType', newValue.value);
                }}
                value={getDocumentSelected(formik.values.documentType)}
                autoHighlight
                getOptionLabel={option => (option ? option.label : '')}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Loại giấy tờ"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              {formik.errors.documentType && formik.touched.documentType && (
                <span className="formError">
                  {formik.errors.documentType}
                </span>
              )}
            </div>
            <div className={classes.formSubItemContainer}>
              <SubdirectoryArrowRightIcon />
              <div className={classes.formSubItem}>
                <TextField
                  name="documentNumber"
                  onChange={formik.handleChange}
                  value={formik.values.documentNumber}
                  type="text"
                  fullWidth
                  variant="outlined"
                  label="Số giấy tờ"
                />
                {formik.errors.documentNumber &&
                  formik.touched.documentNumber && (
                    <span className="formError">
                      {formik.errors.documentNumber}
                    </span>
                  )}
              </div>
            </div>

            <div className={classes.formSubItemContainer}>
              <SubdirectoryArrowRightIcon />
              <div className={classes.formSubItem}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    label="Ngày cấp"
                    format="DD/MM/YYYY"
                    name="docIssuedDate"
                    value={
                      formik.values.docIssuedDate &&
                      moment(
                        formik.values.docIssuedDate,
                        'DD/MM/YYYY',
                      ).isValid()
                        ? formik.values.docIssuedDate
                        : null
                    }
                    defaultValue={
                      formik.values.docIssuedDate &&
                      moment(
                        formik.values.docIssuedDate,
                        'DD/MM/YYYY',
                      ).isValid()
                        ? formik.values.docIssuedDate
                        : null
                    }
                    InputAdornmentProps={{ position: 'end' }}
                    onChange={date => {
                      formik.setFieldValue('docIssuedDate', date);
                    }}
                    fullWidth
                    invalidDateMessage=""
                    minDateMessage=""
                    maxDateMessage=""
                    disableFuture
                  />
                </MuiPickersUtilsProvider>
                {formik.errors.docIssuedDate &&
                  formik.touched.docIssuedDate && (
                    <span className="formError">
                      {formik.errors.docIssuedDate}
                    </span>
                  )}
              </div>
            </div>

            <div className={classes.formSubItemContainer}>
              <SubdirectoryArrowRightIcon />
              <div className={classes.formSubItem}>
                <Autocomplete
                  name="docIssuedPlace"
                  style={{ width: '100%' }}
                  options={
                    (selections &&
                      selections
                        .filter(
                          selection =>
                            selection.category &&
                            selection.category === 'PLACEOFISSUE',
                        )
                        .map(selection => ({
                          value: selection.code || '',
                          label: selection.nameVI || '',
                        }))) || ['']
                  }
                  value={getPlaceIssueSelected(formik.values.docIssuedPlace)}
                  classes={{
                    option: classes.option,
                  }}
                  onChange={(event, newValue) => {
                    // onChange(newValue.value);
                    formik.setFieldValue('docIssuedPlace', newValue.value);
                  }}
                  autoHighlight
                  getOptionLabel={option => (option ? option.label : '')}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Nơi cấp"
                      variant="outlined"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
                {formik.errors.docIssuedPlace &&
                  formik.touched.docIssuedPlace && (
                    <span className="formError">
                      {formik.errors.docIssuedPlace}
                    </span>
                  )}
              </div>
            </div>

            <div className="form-group">
              <Autocomplete
                style={{ width: '100%' }}
                options={DOCUMENT_TYPE}
                name={`listCustomerIdentityDTO[${0}].documentType`}
                classes={{
                  option: classes.option,
                }}
                onChange={(event, newValue) => {
                  formik.setFieldValue(
                    `listCustomerIdentityDTO[${0}].documentType`,
                    newValue.value,
                  );
                }}
                value={getDocumentSelected(
                  formik.values.listCustomerIdentityDTO &&
                    formik.values.listCustomerIdentityDTO[0] &&
                    formik.values.listCustomerIdentityDTO[0].documentType
                    ? formik.values.listCustomerIdentityDTO[0].documentType
                    : null,
                )}
                autoHighlight
                getOptionLabel={option => (option ? option.label : '')}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Loại giấy tờ thứ 2"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              {formik.errors.listCustomerIdentityDTO &&
                formik.errors.listCustomerIdentityDTO[0] &&
                formik.errors.listCustomerIdentityDTO[0].documentType && (
                  <span className="formError">
                    {formik.errors.listCustomerIdentityDTO[0].documentType}
                  </span>
                )}
            </div>

            <div className={classes.formSubItemContainer}>
              <SubdirectoryArrowRightIcon />
              <div className={classes.formSubItem}>
                <TextField
                  name={`listCustomerIdentityDTO[${1}].documentNumber`}
                  onChange={formik.handleChange}
                  value={
                    formik.values.listCustomerIdentityDTO &&
                    formik.values.listCustomerIdentityDTO[0]
                      ? formik.values.listCustomerIdentityDTO[0]
                          .documentNumber
                      : ''
                  }
                  type="text"
                  fullWidth
                  variant="outlined"
                  label="Số giấy tờ thứ 2"
                />
                {formik.errors.listCustomerIdentityDTO &&
                  formik.errors.listCustomerIdentityDTO[0] &&
                  formik.errors.listCustomerIdentityDTO[0].documentNumber && (
                    <span className="formError">
                      {
                        formik.errors.listCustomerIdentityDTO[0]
                          .documentNumber
                      }
                    </span>
                  )}
              </div>
            </div>

            <div className="form-group">
              <Autocomplete
                style={{ width: '100%' }}
                options={DOCUMENT_TYPE || ['']}
                name={`listCustomerIdentityDTO[${1}].documentType`}
                classes={{
                  option: classes.option,
                }}
                onChange={(event, newValue) => {
                  formik.setFieldValue(
                    `listCustomerIdentityDTO[${1}].documentType`,
                    newValue.value,
                  );
                }}
                value={getDocumentSelected(
                  formik.values.listCustomerIdentityDTO &&
                    formik.values.listCustomerIdentityDTO[1]
                    ? formik.values.listCustomerIdentityDTO[1].documentType
                    : null,
                )}
                autoHighlight
                getOptionLabel={option => (option ? option.label : '')}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Loại giấy tờ thứ 3"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              {formik.errors.listCustomerIdentityDTO &&
                formik.errors.listCustomerIdentityDTO[1] &&
                formik.errors.listCustomerIdentityDTO[1].documentType && (
                  <span className="formError">
                    {formik.errors.listCustomerIdentityDTO[1].documentType}
                  </span>
                )}
            </div>

            <div className={classes.formSubItemContainer}>
              <SubdirectoryArrowRightIcon />
              <div className={classes.formSubItem}>
                <TextField
                  name={`listCustomerIdentityDTO[${1}].documentNumber`}
                  onChange={formik.handleChange}
                  value={
                    formik.values.listCustomerIdentityDTO &&
                    formik.values.listCustomerIdentityDTO[1]
                      ? formik.values.listCustomerIdentityDTO[1]
                          .documentNumber
                      : ''
                  }
                  type="text"
                  fullWidth
                  variant="outlined"
                  label="Số giấy tờ thứ 3"
                />
                {formik.errors.listCustomerIdentityDTO &&
                  formik.errors.listCustomerIdentityDTO[1] &&
                  formik.errors.listCustomerIdentityDTO[1].documentNumber && (
                    <span className="formError">
                      {
                        formik.errors.listCustomerIdentityDTO[1]
                          .documentNumber
                      }
                    </span>
                  )}
              </div>
            </div>

            <div className="form-group">
              <TextField
                name="permanentAddressLine1"
                type="text"
                fullWidth
                variant="outlined"
                label="Địa chỉ thường trú"
                onChange={formik.handleChange}
                value={formik.values.permanentAddressLine1}
              />
              {formik.errors.permanentAddressLine1 &&
                formik.touched.permanentAddressLine1 && (
                  <span className="formError">
                    {formik.errors.permanentAddressLine1}
                  </span>
                )}
            </div>

            <div className={classes.formSubItemContainer}>
              <SubdirectoryArrowRightIcon />
              <div className={classes.formSubItem}>
                <Autocomplete
                  style={{ width: '100%' }}
                  name="permanentProvince"
                  options={provinces.map(province => ({
                    value: province.code,
                    label: province.name,
                  }))}
                  classes={{
                    option: classes.option,
                  }}
                  value={
                    (provinces &&
                      formik.values.permanentProvince &&
                      provinces
                        .filter(
                          province =>
                            province.code === formik.values.permanentProvince,
                        )
                        .map(province => ({
                          value: province.code,
                          label: province.name,
                        }))[0]) ||
                    null
                  }
                  autoHighlight
                  onChange={(event, newValue) => {
                    changeProvince(newValue);
                    formik.setFieldValue('permanentProvince', newValue.value);
                  }}
                  getOptionLabel={option => (option ? option.label : '')}
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
                {formik.errors.permanentProvince &&
                  formik.touched.permanentProvince && (
                    <span className="formError">
                      {formik.errors.permanentProvince}
                    </span>
                  )}
              </div>
            </div>

            <div className={classes.formSubItemContainer}>
              <SubdirectoryArrowRightIcon />
              <div className={classes.formSubItem}>
                <Autocomplete
                  style={{ width: '100%' }}
                  name="permanentProvince"
                  options={
                    (district &&
                      district.map(dis => ({
                        value: dis.code,
                        label: dis.name,
                      }))) || ['']
                  }
                  value={
                    getDistrictSelected(
                      district,
                      formik.values.permanentDistrict,
                    ) || null
                  }
                  classes={{
                    option: classes.option,
                  }}
                  onChange={(event, newValue) => {
                    // onChange(newValue.value);
                    formik.setFieldValue('permanentDistrict', newValue.value);
                  }}
                  autoHighlight
                  getOptionLabel={option => (option ? option.label : '')}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Quận/Huyện/Thành Phố"
                      variant="outlined"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
                {formik.errors.permanentDistrict &&
                  formik.touched.permanentDistrict && (
                    <span className="formError">
                      {formik.errors.permanentDistrict}
                    </span>
                  )}
              </div>
            </div>
            <div
              className="form-group checkboxWrapper"
              name="currentIsPermanent"
            >
              <FormControl
                component="fieldset"
                name="currentIsPermanent"
                value={formik.values.currentIsPermanent}
              >
                <FormLabel component="legend" className={classes.labelStyle}>
                  Địa chỉ thường trú trùng với địa chỉ hiện tại
                </FormLabel>
                <RadioGroup
                  aria-label="currentIsPermanent"
                  name="currentIsPermanent"
                  value={formik.values.currentIsPermanent}
                  onChange={e => {
                    changeCurrentIsPermanent(e.target.value);
                    formik.setFieldValue(
                      'currentIsPermanent',
                      e.target.value,
                    );
                  }}
                  className={classes.genderContainer}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Có"
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="Không"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            {showPermanentAddress && (
              <>
                <div className="form-group">
                  <TextField
                    name="currentAddressLine1"
                    type="text"
                    fullWidth
                    variant="outlined"
                    label="Địa chỉ hiện tại"
                    onChange={formik.handleChange}
                    value={formik.values.currentAddressLine1}
                  />
                  {formik.errors.currentAddressLine1 &&
                    formik.touched.currentAddressLine1 && (
                      <span className="formError">
                        {formik.errors.currentAddressLine1}
                      </span>
                    )}
                </div>

                <div className={classes.formSubItemContainer}>
                  <SubdirectoryArrowRightIcon />
                  <div className={classes.formSubItem}>
                    <Autocomplete
                      style={{ width: '100%' }}
                      options={
                        provinces.map(province => ({
                          value: province.code,
                          label: province.name,
                        })) || ['']
                      }
                      name="currentProvince"
                      value={
                        getCurrentProvinceSelected(
                          formik.values.currentProvince,
                        ) || null
                      }
                      classes={{
                        option: classes.option,
                      }}
                      autoHighlight
                      onChange={(event, newValue) => {
                        changeCurrentProvince(newValue);
                        formik.setFieldValue(
                          'currentProvince',
                          newValue.value,
                        );
                      }}
                      getOptionLabel={option => (option ? option.label : '')}
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
                    {formik.errors.currentProvince &&
                      formik.touched.currentProvince && (
                        <span className="formError">
                          {formik.errors.currentProvince}
                        </span>
                      )}
                  </div>
                </div>

                <div className={classes.formSubItemContainer}>
                  <SubdirectoryArrowRightIcon />
                  <div className={classes.formSubItem}>
                    <Autocomplete
                      style={{ width: '100%' }}
                      options={
                        (currentDistrict &&
                          currentDistrict.map(dis => ({
                            value: dis.code,
                            label: dis.name,
                          }))) || ['']
                      }
                      value={
                        getCurrentDistrictSelected(
                          formik.values.currentDistrict,
                        ) || null
                      }
                      classes={{
                        option: classes.option,
                      }}
                      onChange={(event, newValue) => {
                        // onChange(newValue.value);
                        formik.setFieldValue(
                          'currentDistrict',
                          newValue.value,
                        );
                      }}
                      autoHighlight
                      getOptionLabel={option => (option ? option.label : '')}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Quận/Huyện/Thành Phố"
                          variant="outlined"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                    {formik.errors.currentDistrict &&
                      formik.touched.currentDistrict && (
                        <span className="formError">
                          {formik.errors.currentDistrict}
                        </span>
                      )}
                  </div>
                </div>
              </>
            )}
            <button
              type="submit"
              className={classes.action}
              disabled={formik.isSubmitting}
            >
              Tiếp tục
            </button>
          </div>
        </form>
      </div>
    </JarvisFormStyle>
  );
}
