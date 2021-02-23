/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';
import * as Actions from '../../actions';

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

const DOCUMENT_TYPE = [
  { value: 'PV', label: 'Hộ chiếu' },
  { value: 'IC', label: 'CMND/CCCD' },
  { value: 'ICM', label: 'CMND Quân Đội' },
];

const schema = yup.object().shape({
  securityQuestion: yup.object().required('Bạn chưa chọn câu hỏi bí mật'),
  securityAnswer: yup.string().required('Bạn chưa nhập câu trả lời'),
});

export default function Round3(props) {
  const classes = useStyles();
  const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', {});
  const selections = _.get(props, 'jarvisCustomerV2.selections', []);
  const provinces = _.get(props, 'jarvisCustomerV2.provinces', []);
  const { handleSubmit, errors, control, formState } = useForm({
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: {
      ...jarvisCustomer,
      id: jarvisCustomer.id,
      haveGreenCard:
        jarvisCustomer && jarvisCustomer.haveGreenCard
          ? jarvisCustomer.haveGreenCard
          : '0',
    },
    resolver: yupResolver(schema),
  });
  const [maritalStatus, setMaritalStatus] = useState(null);
  const [district, setDistrict] = useState([]);

  function onSubmitForm(values) {
    return new Promise((resolve, reject) => {
      props.dispatch(Actions.saveDataApp(values, resolve, reject));
    })
      .then(() => {
        props.setStep(25);
      })
      .catch(() => {
        props.handleShoMessage({
          message: 'Có lỗi xảy ra vui lòng thử lại',
          severity: 'error',
        });
      });
  }

  function getSelectedValue(category, value) {
    const item = selections.find(opt => {
      if (opt.category === category && opt.code === value)
        return { value: opt.code, label: opt.nameVi };
    });
    return { value: item && item.code, label: item && item.nameVi } || {};
  }

  function changeProvince(e) {
    const province = provinces.filter(pv => pv.code === e.value)[0];
    setDistrict(province.districts);
  }

  return (
    <JarvisFormStyle>
      <Header className="header" step={3} showStep />
      <div className={classes.formContainer}>
        <div className={classes.titleHeader}>Thông tin khác</div>
        <form className="formWrapper" onSubmit={handleSubmit(onSubmitForm)}>
          <div className="formWrapper">
            <div className="form-group">
              <Controller
                as={TextField}
                name="requestLimit"
                fullWidth
                variant="outlined"
                label="Hạn mức lựa chọn"
                control={control}
              />
              {errors.requestLimit && (
                <span className="formError">
                  {errors.requestLimit.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <Controller
                as={TextField}
                name="typeOfCreditCard"
                fullWidth
                variant="outlined"
                label="Loại thẻ"
                control={control}
              />
              {errors.typeOfCreditCard && (
                <span className="formError">
                  {errors.typeOfCreditCard.message}
                </span>
              )}
            </div>
            <div className="form-group checkboxWrapper">
              <Controller
                name="isVirtualcard"
                control={control}
                render={({ value, onChange }) => (
                  <FormControl component="fieldset">
                    <FormLabel
                      component="legend"
                      className={classes.labelStyle}
                    >
                      Bạn có muốn đăng kí thẻ ảo không?
                    </FormLabel>
                    <RadioGroup
                      aria-label="isVirtualcard"
                      name="isVirtualcard"
                      value={value}
                      onChange={e => {
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
            <div className="form-group">
              <Controller
                as={TextField}
                name="virtualCardLimit"
                fullWidth
                variant="outlined"
                label="Hạn mức thẻ ảo"
                control={control}
              />
              {errors.virtualCardLimit && (
                <span className="formError">
                  {errors.virtualCardLimit.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <Controller
                as={TextField}
                name="accInternetBanking"
                fullWidth
                variant="outlined"
                label="Tên đăng nhập VPBANK ONLINE"
                control={control}
              />
              {errors.accInternetBanking && (
                <span className="formError">
                  {errors.accInternetBanking.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <Controller
                as={TextField}
                name="fullNameRefOne"
                fullWidth
                variant="outlined"
                label={
                  maritalStatus && maritalStatus === 'MARRIED'
                    ? 'Họ tên Vợ/Chồng'
                    : 'Họ tên người tham chiếu 1'
                }
                control={control}
              />
              {errors.fullNameRefOne && (
                <span className="formError">
                  {errors.fullNameRefOne.message}
                </span>
              )}
            </div>
            {maritalStatus && maritalStatus === 'MARRIED' && (
              <>
                <div className="form-group">
                  <Controller
                    name="birthDateSpouse"
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
                </div>
                <div className="form-group">
                  <Controller
                    name="documentTypeSpouse"
                    control={control}
                    render={({ value, onChange }) => (
                      <Autocomplete
                        style={{ width: '90vw' }}
                        options={DOCUMENT_TYPE}
                        classes={{
                          option: classes.option,
                        }}
                        onChange={(event, newValue) => {
                          onChange(newValue.value);
                        }}
                        autoHighlight
                        getOptionLabel={option => option.label}
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
                  {errors.documentTypeSpouse && (
                    <span className="formError">
                      {errors.documentTypeSpouse.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <Controller
                    as={TextField}
                    name="documentNumberSpouse"
                    type="number"
                    fullWidth
                    variant="outlined"
                    label="Số CMND"
                    control={control}
                  />
                  {errors.documentNumberSpouse && (
                    <span className="formError">
                      {errors.documentNumberSpouse.message}
                    </span>
                  )}
                </div>
              </>
            )}
            <div className="form-group">
              <Controller
                name="relationRefOne"
                control={control}
                render={({ value, onChange }) => (
                  <Autocomplete
                    id="country-select-demo"
                    style={{ width: '90vw' }}
                    options={
                      selections &&
                      selections
                        .filter(
                          selection => selection.category === 'RELATIONSHIP',
                        )
                        .map(selection => ({
                          value: selection.code,
                          label: selection.nameVi,
                        }))
                    }
                    classes={{
                      option: classes.option,
                    }}
                    value={getSelectedValue('RELATIONSHIP', value)}
                    onChange={(event, newValue) => {
                      onChange(newValue.value);
                    }}
                    autoHighlight
                    getOptionLabel={option => option.label}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Mối quan hệ với chủ thẻ"
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                        }}
                      />
                    )}
                  />
                )}
              />
              {errors.relationRefOne && (
                <span className="formError">
                  {errors.relationRefOne.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <Controller
                as={TextField}
                name="mobileNumberRefOne"
                fullWidth
                variant="outlined"
                label="Số điện thoại"
                control={control}
              />
              {errors.mobileNumberRefOne && (
                <span className="formError">
                  {errors.mobileNumberRefOne.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <Controller
                as={TextField}
                name="fullNameRefTwo"
                fullWidth
                variant="outlined"
                label={
                  maritalStatus && maritalStatus === 'MARRIED'
                    ? 'Họ tên người tham chiếu 1'
                    : 'Họ tên người tham chiếu 2'
                }
                control={control}
              />
              {errors.fullNameRefTwo && (
                <span className="formError">
                  {errors.fullNameRefTwo.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <Controller
                name="relationRefTwo"
                control={control}
                render={({ value, onChange }) => (
                  <Autocomplete
                    id="country-select-demo"
                    style={{ width: '90vw' }}
                    options={
                      selections &&
                      selections
                        .filter(
                          selection => selection.category === 'RELATIONSHIP',
                        )
                        .map(selection => ({
                          value: selection.code,
                          label: selection.nameVi,
                        }))
                    }
                    classes={{
                      option: classes.option,
                    }}
                    onChange={(event, newValue) => {
                      onChange(newValue.label);
                    }}
                    autoHighlight
                    getOptionLabel={option => option.label}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Mối quan hệ với chủ thẻ"
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                        }}
                      />
                    )}
                  />
                )}
              />
              {errors.relationRefTwo && (
                <span className="formError">
                  {errors.relationRefTwo.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <Controller
                as={TextField}
                name="mobileNumberRefTwo"
                fullWidth
                variant="outlined"
                label="Số điện thoại"
                control={control}
              />
              {errors.mobileNumberRefTwo && (
                <span className="formError">
                  {errors.mobileNumberRefTwo.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <Controller
                name="securityQuestion"
                control={control}
                render={({ value, onChange }) => (
                  <Autocomplete
                    style={{ width: '90vw' }}
                    options={
                      selections &&
                      selections
                        .filter(
                          selection =>
                            selection.category === 'SECURITYQUESTION',
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
                    onChange={(event, newValue) => {
                      onChange(newValue.value);
                    }}
                    getOptionLabel={option => option.label}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Câu hỏi bảo mật"
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                        }}
                      />
                    )}
                  />
                )}
              />
              {errors.securityQuestion && (
                <span className="formError">
                  {errors.securityQuestion.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <Controller
                as={TextField}
                name="securityAnswer"
                fullWidth
                variant="outlined"
                label="Trả lời câu hỏi bảo mật"
                control={control}
              />
              {errors.securityAnswer && (
                <span className="formError">
                  {errors.securityAnswer.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <Controller
                name="isUSGreenCard"
                control={control}
                render={({ value, onChange }) => (
                  <FormControl component="fieldset">
                    <FormLabel
                      component="legend"
                      className={classes.labelStyle}
                    >
                      Bạn có thuộc một trong các điều kiện sau không: là công
                      dân Hoa Kỳ, có thẻ thường trú nhân tại Hoa Kỳ (Thẻ Xanh)
                      hoặc là cá nhân cư trú tại Hoa Kỳ?
                    </FormLabel>
                    <RadioGroup
                      aria-label="isUSGreenCard"
                      name="isUSGreenCard"
                      value={value}
                      onChange={e => onChange(e.target.value)}
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
              {errors.haveGreenCard && (
                <span className="formError">
                  {errors.haveGreenCard.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <Controller
                name="deliveryCard"
                control={control}
                render={({ value, onChange }) => (
                  <Autocomplete
                    id="country-select-demo"
                    style={{ width: '90vw' }}
                    options={
                      selections &&
                      selections
                        .filter(
                          selection => selection.category === 'DELIVERYCARD',
                        )
                        .map(selection => ({
                          value: selection.code,
                          label: selection.nameVi,
                        }))
                    }
                    classes={{
                      option: classes.option,
                    }}
                    value={getSelectedValue('DELIVERYCARD', value)}
                    onChange={(event, newValue) => {
                      onChange(newValue.value);
                    }}
                    autoHighlight
                    getOptionLabel={option => option.label}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Địa chỉ nhận thẻ"
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                        }}
                      />
                    )}
                  />
                )}
              />
              {errors.deliveryCard && (
                <span className="formError">
                  {errors.deliveryCard.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <Controller
                name="deliveryProvince"
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
                    value={
                      provinces &&
                      value &&
                      provinces.filter(
                        province => province.value === value,
                      )[0]
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
              {errors.deliveryProvince && (
                <span className="formError">
                  {errors.deliveryProvince.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <Controller
                name="deliveryBranch"
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
                    value={
                      district &&
                      value &&
                      district.filter(distr => distr.value === value)[0]
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
              {errors.deliveryBranch && (
                <span className="formError">
                  {errors.deliveryBranch.message}
                </span>
              )}
            </div>

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
