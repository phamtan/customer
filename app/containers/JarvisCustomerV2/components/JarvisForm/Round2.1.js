/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import * as yup from 'yup';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';
import StepApp from './StepApp';
import * as Actions from '../../actions';

const DOCUMENT_TYPE = [
  { value: 'PV', label: 'Hộ chiếu' },
  { value: 'IC', label: 'CMND/CCCD' },
  { value: 'ICM', label: 'CMND Quân Đội' },
];

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

const schema = yup.object().shape({
  maritalStatus: yup
    .string()
    .required('Bạn chưa chọn tình trạng hôn nhân')
    .nullable(),
  // fullNameRefOne: yup
  //   .string()
  //   .when('maritalStatus', {
  //     is: 'MARRIED',
  //     otherwise: s => s.required('Bạn chưa nhập tên vợ/chồng'),
  //   })
  //   .nullable(),
  // birthDateSpouse: yup
  //   .string()
  //   .when('maritalStatus', {
  //     is: 'MARRIED',
  //     otherwise: s => s.required('Bạn chưa nhập ngày sinh vợ/chồng'),
  //   })
  //   .nullable(),
  // documentTypeSpouse: yup
  //   .string()
  //   .when('maritalStatus', {
  //     is: 'MARRIED',
  //     otherwise: s => s.required('Bạn chưa chọn loại giấy tờ'),
  //   })
  //   .nullable(),
  // documentNumberSpouse: yup
  //   .string()
  //   .when('maritalStatus', {
  //     is: 'MARRIED',
  //     otherwise: s => s.required('Bạn chưa nhập số giấy tờ'),
  //   })
  //   .nullable(),
  // mobileNumberRefOne: yup
  //   .string()
  //   .when('maritalStatus', {
  //     is: 'MARRIED',
  //     otherwise: s => s.required('Bạn chưa nhập số điện thoại vợ/chồng'),
  //   })
  //   .nullable(),
  employmentStatus: yup
    .string()
    .required('Bạn chưa chọn tình trạng công việc')
    .nullable(),
  mainIncomeType: yup
    .string()
    .required('Bạn chưa chọn loại hình thu nhập')
    .nullable(),
  monthlyIncome: yup
    .string()
    .required('Bạn chưa nhập thu nhập hàng tháng')
    .test(
      `test-monthlyIncome`,
      'Xin lỗi quý khách, thu nhập tối thiểu để mở thẻ là là 5 triệu/ tháng',
      value => {
        if (value && Number(value) < 5000000) {
          return false;
        }
        return true;
      },
    )
    .nullable(),
});
export default function Round3(props) {
  const classes = useStyles();
  const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', {});
  const selections = _.get(props, 'jarvisCustomerV2.selections', []);
  const companies = _.get(props, 'jarvisCustomerV2.companies', []);
  const [maritalStatus, setMaritalStatus] = useState(null);
  const {
    register,
    reset,
    handleSubmit,
    errors,
    control,
    setValue,
    formState,
  } = useForm({
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (jarvisCustomer) {
      reset(jarvisCustomer);
    }
  }, [jarvisCustomer]);

  function onSubmitForm(values) {
    const valuesSubmit = Object.assign(jarvisCustomer, values);
    valuesSubmit.processStep = 'Work_Form_R_2';
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
          if (result.status === 'PASS' && result.data.hasResultR1) {
            if (
              !result.data.program &&
              valuesSubmit.employmentStatus === 'FT' &&
              valuesSubmit.checkSaleLocation.allowCurrentAddress
            ) {
              props.history.push('/v2/round2-2');
            } else if (
              !result.data.program &&
              valuesSubmit.employmentStatus === 'FT' &&
              !valuesSubmit.checkSaleLocation.allowCurrentAddress
            ) {
              props.history.push('/v2/round2-2');
            } else if (
              !result.data.program &&
              ['BO', 'PT'].includes(valuesSubmit.employmentStatus) &&
              valuesSubmit.checkSaleLocation.allowCurrentAddress
            ) {
              props.history.push('/v2/round2-2');
            } else if (
              !result.data.program &&
              ['UE', 'R'].includes(valuesSubmit.employmentStatus)
            ) {
              props.history.push('/v2/reject');
            }
          } else if (result.status === 'PASS' && !result.data.hasResultR1) {
            props.history.push('/v2/round2-2');
          } else {
            props.history.push('/v2/round2-2');
          }
        }),
      )
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
        return { value: opt.code, label: opt.nameVI };
    });
    return { value: item && item.code, label: item && item.nameVI } || {};
  }

  return (
    <JarvisFormStyle>
      <Header className="header" step={3} />
      <StepApp step={1} />
      <div className={classes.formContainer}>
        <div className={classes.titleHeader}>Thông tin cá nhân</div>
        <form className="formWrapper" onSubmit={handleSubmit(onSubmitForm)}>
          <div className="formWrapper">
            <div className="form-group">
              <Controller
                name="maritalStatus"
                control={control}
                render={({ value, onChange }) => (
                  <Autocomplete
                    id="country-select-demo"
                    style={{ width: '100%' }}
                    options={
                      selections &&
                      selections
                        .filter(
                          selection => selection.category === 'MARITALSTATUS',
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
                            selection.category === 'MARITALSTATUS' &&
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
                      setMaritalStatus(newValue.value);
                      if (newValue.value === 'MARRIED') {
                        setValue('relationRefOne', 'S');
                      }
                    }}
                    autoHighlight
                    getOptionLabel={option => option.label}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Tình trạng kết hôn"
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                        }}
                      />
                    )}
                  />
                )}
              />
              {errors.maritalStatus && (
                <span className="formError">
                  {errors.maritalStatus.message}
                </span>
              )}
            </div>
            {maritalStatus && maritalStatus === 'MARRIED' && (
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
            )}
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
                        style={{ width: '100%' }}
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
            {maritalStatus && maritalStatus === 'MARRIED' && (
              <>
                <div className="form-group">
                  <Controller
                    name="relationRefOne"
                    control={control}
                    render={({ value, onChange }) => (
                      <Autocomplete
                        id="country-select-demo"
                        style={{ width: '100%' }}
                        options={
                          selections &&
                          selections
                            .filter(
                              selection =>
                                selection.category === 'RELATIONSHIP',
                            )
                            .map(selection => ({
                              value: selection.code || '',
                              label: selection.nameVI || '',
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
              </>
            )}

            <div className="form-group">
              <Controller
                name="employmentStatus"
                control={control}
                render={({ value, onChange }) => (
                  <Autocomplete
                    id="country-select-demo"
                    style={{ width: '100%' }}
                    options={
                      selections &&
                      selections
                        .filter(
                          selection =>
                            selection.category === 'EMPLOYMENTSTATUS',
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
                            selection.category === 'EMPLOYMENTSTATUS' &&
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
                    getOptionLabel={option => option.label}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Tình trạng công việc hiện tại"
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                        }}
                      />
                    )}
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
              <Controller
                name="mainIncomeType"
                control={control}
                render={({ value, onChange }) => (
                  <Autocomplete
                    id="country-select-demo"
                    style={{ width: '100%' }}
                    options={
                      selections &&
                      selections
                        .filter(
                          selection => selection.category === 'MAININCOME',
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
                            selection.category === 'MAININCOME' &&
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
                    getOptionLabel={option => option.label}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Hình thức nhận lương"
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                        }}
                      />
                    )}
                  />
                )}
              />
              {errors.mainIncomeType && (
                <span className="formError">
                  {errors.mainIncomeType.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <Controller
                as={TextField}
                name="monthlyIncome"
                fullWidth
                variant="outlined"
                label="Thu nhập hàng tháng"
                control={control}
              />
              {errors.monthlyIncome && (
                <span className="formError">
                  {errors.monthlyIncome.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <Controller
                name="position"
                control={control}
                render={({ value, onChange }) => (
                  <Autocomplete
                    style={{ width: '100%' }}
                    options={
                      selections &&
                      selections
                        .filter(
                          selection => selection.category === 'OCCUPATION',
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
                            selection.category === 'OCCUPATION' &&
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
              {errors.position && (
                <span className="formError">{errors.position.message}</span>
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
