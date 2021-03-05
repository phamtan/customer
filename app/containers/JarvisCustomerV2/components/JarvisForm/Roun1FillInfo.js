/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {useEffect, useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
}));


const DOCUMENT_TYPE = [
  { value: 'PV', label: 'Hộ chiếu' },
  { value: 'IC', label: 'CMND/CCCD' },
  { value: 'ICM', label: 'CMND Quân Đội' },
];

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required('Bạn chưa nhập họ tên')
    .test(
      `test-name`,
      'Xin lỗi quý khách, phần họ tên không đúng định dạng',
      value => {
        if (value.split(' ').length < 2) {
          return false;
        }
        return true;
      },
    )
    .max(100, 'Tên không vượt quá 100 kí tự')
    .matches(XRegExp('^[\\pL\\s]+$'), 'Tên không chứa ký tự đặc biệt'),
  mobileNumber: yup
    .string()
    .required('Bạn chưa nhập số điện thoại')
    .length(10, 'số điện thoại gồm 10 số')
    .matches(XRegExp('^[\\d]+$'), 'Số điện thoại chỉ bao gồm số'),
  email: yup
    .string()
    .required('Bạn chưa nhập email')
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      'Email không đúng định dạng',
    ),
  dob: yup
    .string()
    .required('Bạn chưa nhập ngày sinh')
    .test(
      `test-dob`,
      'Xin lỗi quý khách, Tuổi không được nhỏ hơn 18 và lớn hơn 65',
      value => {
        const doDob = moment(value);
        const currentYear = moment();
        if (doDob.year()) {
          const diffYears = currentYear.diff(doDob, 'years', true);
          if (diffYears > 65 || diffYears < 18) {
            return false;
          }
        }
        return true;
      },
    )
    .nullable(),
  gender: yup.string().required('Bạn chưa nhập giới tính'),
  nationality: yup
    .string()
    .required('Bạn chưa nhập quốc tịch')
    .test(
      `test-nationality`,
      'Xin lỗi quý khách, Hiện tại hệ thống chưa hỗ trợ người nước ngoài',
      value => {
        if (value && value !== 'VN') {
          return false;
        }
        return true;
      },
    ),
  documentType: yup.string().required('Bạn chưa chọn loại giấy tờ'),
  documentNumber: yup.string().required('Bạn chưa nhập số giấy tờ'),
  docIssuedDate: yup
    .string()
    .required('Bạn chưa nhập ngày cấp')
    .nullable(),
  docIssuedPlace: yup
    .string()
    .required('Bạn chưa chọn nơi cấp')
    .nullable(),
  permanentAddressLine1: yup
    .string()
    .required('Bạn chưa nhập địa chỉ thường trú'),
  permanentProvince: yup
    .string()
    .required('Bạn chưa chọn Tỉnh thành phố thường trú'),
  permanentDistrict: yup.string().required('Bạn chưa chọn quận huyện'),
  currentAddLine1: yup.string().when('currentIsPermanent', {
    is: '0',
    then: s => s.required('Bạn chưa nhập địa chỉ hiện tại'),
  }),
  currentProvince: yup.string().when('currentIsPermanent', {
    is: '0',
    then: s => s.required('Bạn chưa nhập thành phố hiện tại'),
  }),
  currentDistrict: yup.string().when('currentIsPermanent', {
    is: '0',
    then: s => s.required('Bạn chưa nhập quận huyện hiện tại'),
  }),
});

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
  const [showPermanentAddress, setShowPermaneAddress] = useState(false);
  const [isMobile] = useState(
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    ),
  );
  const { handleSubmit, errors, control, reset, formState, watch } = useForm({
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: {
      id: '',
      nationality: 'VN',
      fullName: '',
      email: '',
      mobileNumber: '',
      gender: 'F',
      currentIsPermanent: '0',
      documentNumber: '',
      permanentDistrict: '',
      permanentProvince: '',
      permanentAddressLine1: '',
      docIssuedPlace: null,
      dob: null,
      docIssuedDate: null,
      issueDate: moment()
        .subtract(2, 'years')
        .format('yyyy-MM-DD'),
      placeOfIssue: '',
    },
    resolver: yupResolver(schema),
  });

  const watchAllFields = watch();

  console.log(watchAllFields);

  // useEffect(() => {
  //   if (!jarvisCustomer) {
  //     props.history.push('/v2');
  //   }
  // }, []);

  useEffect(() => {
    if (jarvisCustomer) {
      reset(jarvisCustomer);
      if (jarvisCustomer.permanentProvince && provinces) {
        const province = provinces.filter(
          pv => pv.code === jarvisCustomer.permanentProvince,
        )[0];
        if (province && province.districts) {
          setDistrict(province.districts);
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
    valuesSubmit.docIssuedDate = moment(valuesSubmit.docIssuedDate).format(
      'DD/MM/YYYY',
    );
    valuesSubmit.dob = moment(valuesSubmit.dob).format(
      'YYYY-MM-DDTHH:mm:ss.SSS',
    );
    valuesSubmit.processStep = 'Work_Form_R_1';
    return new Promise((resolve, reject) => {
      props.dispatch(
        Actions.checkLosRound1(valuesSubmit, resolve, reject),
      );
    }).then(() => {
      props.history.push('/v2/waiting');
    }).catch(() => {
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
    return { value: item && item.value, label: item && item.label } || {};
  }

  return (
    <JarvisFormStyle>
      <Header className="header" step={2} />
      <StepApp />
      <div className={classes.formContainer}>
        <div className={classes.titleHeader}>Thông tin cá nhân</div>
        <form className="formWrapper" onSubmit={handleSubmit(onSubmitForm)}>
          <div className="formWrapper">
            <div className="form-group">
              <Controller
                as={TextField}
                name="fullName"
                fullWidth
                variant="outlined"
                label="Họ tên"
                control={control}
              />
              {errors.fullName && (
                <span className="formError">{errors.fullName.message}</span>
              )}
            </div>
            <div className="form-group">
              <Controller
                as={TextField}
                name="mobileNumber"
                fullWidth
                variant="outlined"
                label="Số điện thoại"
                control={control}
                className={classes.inputSytle}
                classes={{
                  root: classes.inputStyle,
                }}
              />
              {errors.mobileNumber && (
                <span className="formError">
                  {errors.mobileNumber.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <Controller
                as={TextField}
                name="email"
                fullWidth
                variant="outlined"
                label="Email"
                control={control}
                className={classes.inputSytle}
                classes={{
                  root: classes.inputStyle,
                }}
              />
              {errors.email && (
                <span className="formError">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              {/* <Controller as={TextField} name="dob" type="date" fullWidth variant="outlined" label="Ngày sinh" control={control} /> */}
              <Controller
                name="dob"
                control={control}
                render={({ value, onChange }) => (
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                      autoOk
                      variant="inline"
                      inputVariant="outlined"
                      label="Ngày sinh"
                      format="DD/MM/YYYY"
                      value={value}
                      InputAdornmentProps={{ position: 'end' }}
                      onChange={date => onChange(date)}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                )}
              />
              {errors.dob && (
                <span className="formError">{errors.dob.message}</span>
              )}
            </div>

            <div className="form-group">
              <Controller
                name="gender"
                control={control}
                render={({ value, onChange }) => (
                  <FormControl component="fieldset">
                    <FormLabel
                      component="legend"
                      className={classes.labelStyle}
                    >
                      Giới tính
                    </FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      name="gender"
                      value={value}
                      onChange={e => onChange(e.target.value)}
                      className={classes.genderContainer}
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
                )}
              />
              {errors.gender && (
                <span className="formError">{errors.gender.message}</span>
              )}
            </div>

            <div className="form-group">
              <Controller
                name="nationality"
                control={control}
                render={({ value, onChange }) => (
                  <Autocomplete
                    id="country-select-demo"
                    style={{ width: '100%' }}
                    options={
                      countries &&
                      countries.map(country => ({
                        value: country.isoCode,
                        label: country.vi,
                        code: country.isoCode,
                      }))
                    }
                    value={
                      countries &&
                      value &&
                      countries
                        .filter(country => country.isoCode === value)
                        .map(country => ({
                          value: country.isoCode,
                          label: country.vi,
                          code: country.isoCode,
                        }))[0]
                    }
                    getOptionSelected={(option, val) =>
                      option.name === val.name
                    }
                    classes={{
                      option: classes.option,
                    }}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        onChange(newValue.value);
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
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                )}
              />
              {errors.nationality && (
                <span className="formError">
                  {errors.nationality.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <Controller
                name="documentType"
                control={control}
                render={({ value, onChange }) => (
                  <Autocomplete
                    style={{ width: '100%' }}
                    options={DOCUMENT_TYPE}
                    classes={{
                      option: classes.option,
                    }}
                    onChange={(event, newValue) => {
                      onChange(newValue.value);
                    }}
                    value={getDocumentSelected(value)}
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
                )}
              />
              {errors.documentType && (
                <span className="formError">
                  {errors.documentType.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <Controller
                as={TextField}
                name="documentNumber"
                type="number"
                fullWidth
                variant="outlined"
                label="Số CMND"
                control={control}
              />
              {errors.documentNumber && (
                <span className="formError">
                  {errors.documentNumber.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <Controller
                name="docIssuedDate"
                control={control}
                render={({ value, onChange }) => (
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                      autoOk
                      variant="inline"
                      inputVariant="outlined"
                      label="Ngày cấp"
                      format="DD/MM/YYYY"
                      value={value}
                      InputAdornmentProps={{ position: 'end' }}
                      onChange={date => onChange(date)}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                )}
              />
              {errors.docIssuedDate && (
                <span className="formError">
                  {errors.docIssuedDate.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <Controller
                name="docIssuedPlace"
                control={control}
                render={({ value, onChange }) => (
                  <Autocomplete
                    style={{ width: '100%' }}
                    options={
                      selections &&
                      selections
                        .filter(
                          selection =>
                            selection.category &&
                            selection.category === 'PLACEOFISSUE',
                        )
                        .map(selection => ({
                          value: selection.code || '',
                          label: selection.nameVI || '',
                        }))
                    }
                    value={
                      selections &&
                      value &&
                      selections
                        .filter(
                          selection =>
                            selection.category &&
                            selection.category === 'PLACEOFISSUE' &&
                            selection.code &&
                            selection.code === value,
                        )
                        .map(selection => ({
                          value: selection.code || '',
                          label: selection.nameVI || '',
                        }))[0]
                    }
                    classes={{
                      option: classes.option,
                    }}
                    onChange={(event, newValue) => {
                      onChange(newValue.value);
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
                )}
              />
              {errors.docIssuedPlace && (
                <span className="formError">
                  {errors.docIssuedPlace.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <Controller
                as={TextField}
                name="permanentAddressLine1"
                type="text"
                fullWidth
                variant="outlined"
                label="Địa chỉ thường trú"
                control={control}
              />
              {errors.permanentAddressLine1 && (
                <span className="formError">
                  {errors.permanentAddressLine1.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <Controller
                name="permanentProvince"
                control={control}
                render={({ value, onChange }) => (
                  <Autocomplete
                    style={{ width: '100%' }}
                    options={provinces.map(province => ({
                      value: province.code,
                      label: province.name,
                    }))}
                    classes={{
                      option: classes.option,
                    }}
                    value={
                      provinces &&
                      value &&
                      provinces
                        .filter(province => province.code === value)
                        .map(province => ({
                          value: province.code,
                          label: province.name,
                        }))[0]
                    }
                    autoHighlight
                    onChange={(event, newValue) => {
                      changeProvince(newValue);
                      onChange(newValue.value);
                    }}
                    getOptionLabel={option => (option ? option.label : '')}
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
                name="permanentDistrict"
                control={control}
                render={({ value, onChange }) => (
                  <Autocomplete
                    style={{ width: '100%' }}
                    options={
                      district &&
                      district.map(dis => ({
                        value: dis.code,
                        label: dis.name,
                      }))
                    }
                    value={
                      district &&
                      value &&
                      district
                        .filter(distr => distr.code === value)
                        .map(distr => ({
                          value: distr.code,
                          label: distr.name,
                        }))[0]
                    }
                    classes={{
                      option: classes.option,
                    }}
                    onChange={(event, newValue) => {
                      onChange(newValue.value);
                    }}
                    autoHighlight
                    getOptionLabel={option => (option ? option.label : '')}
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
            <div className="form-group checkboxWrapper">
              <Controller
                name="currentIsPermanent"
                control={control}
                render={({ value, onChange }) => (
                  <FormControl component="fieldset">
                    <FormLabel
                      component="legend"
                      className={classes.labelStyle}
                    >
                      Địa chỉ thường trú trùng với địa chỉ hiện tại
                    </FormLabel>
                    <RadioGroup
                      aria-label="currentIsPermanent"
                      name="currentIsPermanent"
                      value={value}
                      onChange={e => {
                        changeCurrentIsPermanent(e.target.value);
                        onChange(e.target.value);
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
                )}
              />
            </div>
            {showPermanentAddress && (
              <>
                <div className="form-group">
                  <Controller
                    as={TextField}
                    name="currentAddLine1"
                    type="text"
                    fullWidth
                    variant="outlined"
                    label="Địa chỉ hiện tại"
                    control={control}
                  />
                  {errors.currentAddLine1 && errors.currentAddLine1 && (
                    <span className="formError">
                      {errors.currentAddLine1.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <Controller
                    name="currentProvince"
                    control={control}
                    render={({ value, onChange }) => (
                      <Autocomplete
                        style={{ width: '100%' }}
                        options={provinces.map(province => ({
                          value: province.code,
                          label: province.name,
                        }))}
                        value={
                          provinces &&
                          value &&
                          provinces.filter(prov => prov.value === value)[0]
                        }
                        classes={{
                          option: classes.option,
                        }}
                        autoHighlight
                        onChange={(event, newValue) => {
                          changeCurrentProvince(newValue);
                          onChange(newValue.value);
                        }}
                        getOptionLabel={option =>
                          option ? option.label : ''
                        }
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
                  {errors.currentProvince && (
                    <span className="formError">
                      {errors.currentProvince.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <Controller
                    name="currentDistrict"
                    control={control}
                    render={({ value, onChange }) => (
                      <Autocomplete
                        style={{ width: '100%' }}
                        options={
                          currentDistrict &&
                          currentDistrict.map(dis => ({
                            value: dis.code,
                            label: dis.name,
                          }))
                        }
                        value={
                          currentDistrict &&
                          value &&
                          currentDistrict.filter(
                            obj => obj.value === value,
                          )[0]
                        }
                        classes={{
                          option: classes.option,
                        }}
                        onChange={(event, newValue) => {
                          onChange(newValue.value);
                        }}
                        autoHighlight
                        getOptionLabel={option =>
                          option ? option.label : ''
                        }
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
                  {errors.currentDistrict && (
                    <span className="formError">
                      {errors.currentDistrict.message}
                    </span>
                  )}
                </div>
              </>
            )}
            <button
              type="submit"
              className={classes.action}
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
