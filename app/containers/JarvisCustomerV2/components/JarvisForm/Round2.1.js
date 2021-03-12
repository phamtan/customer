/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import MaskedInput from 'MaskedInput';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
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
  formSubItemContainer: {
    display: 'flex',
    marginBottom: '1rem',
    alignItems: 'center',
  },
  formSubItem: {
    width: '100%',
  },
}));

export default function Round3(props) {
  const classes = useStyles();
  const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', {});
  const selections = _.get(props, 'jarvisCustomerV2.selections', []);
  const [maritalStatus, setMaritalStatus] = useState(null);

  // useEffect(() => {
  //   if (jarvisCustomer) {
  //     reset(jarvisCustomer);
  //   }
  // }, [jarvisCustomer]);

  const validate = values => {
    const errors = {};
    if (!values.maritalStatus) {
      errors.maritalStatus = 'Bạn chưa chọn tình trạng hôn nhân';
    }

    if (values.maritalStatus && values.maritalStatus === 'MARRIED') {
      if (!values.fullNameRefOne) {
        errors.fullNameRefOne = 'Bạn chưa nhập tên vợ/chồng';
      }
      if (!values.birthDateSpouse) {
        errors.birthDateSpouse = 'Bạn chưa nhập ngày sinh vợ/chồng';
      }
      if (!values.documentTypeSpouse) {
        errors.documentTypeSpouse = 'Bạn chưa chọn loại giấy tờ vợ/chồng';
      }
      if (!values.mobileNumberRefOne) {
        errors.mobileNumberRefOne = 'Bạn chưa nhập số điện thoại vợ/chồng';
      }

      if (
        values.documentTypeSpouse &&
        values.documentNumberSpouse &&
        values.documentTypeSpouse !== 'PV'
      ) {
        const documentLength = values.documentNumberSpouse.length;
        if (
          values.documentTypeSpouse === 'ICM' &&
          (documentLength !== 8 && documentLength !== 12)
        ) {
          errors.documentNumberSpouse =
            'Xin lỗi quý khách, số CMT quý khách vừa điền không hợp lệ';
        }
        if (
          values.documentTypeSpouse === 'IC' &&
          values.documentNumberSpouse &&
          !/^(\.|\d)\d*$/.test(values.documentNumberSpouse)
        ) {
          errors.documentNumberSpouse =
            'Xin lỗi quý khách, số CMT quý khách vừa điền không hợp lệ';
        }
        if (
          values.documentTypeSpouse === 'IC' &&
          (documentLength !== 9 && documentLength !== 12)
        ) {
          errors.documentNumberSpouse =
            'Xin lỗi quý khách, số CMT quý khách vừa điền không hợp lệ';
        }
      }
    }

    if (values.documentTypeSpouse === 'PV' && values.documentNumberSpouse) {
      const documentLength = values.documentNumberSpouse;
      if (documentLength < 8 || documentLength > 13) {
        errors.documentNumberSpouse =
          'Xin lỗi quý khách, Hộ chiếu quý khách vừa nhập không hợp lệ';
      }
    }

    if (!values.employmentStatus) {
      errors.employmentStatus = 'Bạn chưa chọn tình trạng công việc';
    }

    if (!values.mainIncomeType) {
      errors.mainIncomeType = 'Bạn chưa chọn loại hình thu nhập';
    }

    if (!values.monthlyIncome) {
      errors.monthlyIncome = 'Bạn chưa nhập thu nhập';
    } else if (values.monthlyIncome && Number(values.monthlyIncome) < 5000000) {
      errors.monthlyIncome =
        'Xin lỗi quý khách, thu nhập tối thiểu để mở thẻ là là 5 triệu/ tháng';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: jarvisCustomer || {},
    validate,
    onSubmit: onSubmitForm,
  });

  function onSubmitForm(values) {
    const valuesSubmit = Object.assign(jarvisCustomer, values);
    valuesSubmit.processStep = 'Work_Form_R_2';
    if (valuesSubmit.dob) {
      valuesSubmit.dob = moment(valuesSubmit.dob, 'DD/MM/YYYY')
        .utc()
        .isValid()
        ? moment(valuesSubmit.dob, 'DD/MM/YYYY').format(
          'YYYY-MM-DDTHH:mm:ss.SSS',
        )
        : null;
    }

    if (values.birthDateSpouse && typeof values.birthDateSpouse !== 'string') {
      valuesSubmit.birthDateSpouse = valuesSubmit.birthDateSpouse.format(
        'DD/MM/YYYY',
      );
    }

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
              result.data.pa &&
              result.data.pa === 'Y' &&
              !result.data.program
            ) {
              props.history.push('/v2/round3');
            } else if (
              result.data.pa &&
              result.data.pa === 'Y' &&
              result.data.program
            ) {
              props.history.push('/v2/round2-2');
            } else if (
              result.data.pa &&
              result.data.pa === 'N' &&
              result.data.program
            ) {
              props.history.push('/v2/round2-2');
            } else if (
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
            } else if (
              !result.data.program &&
              ['UE', 'R'].includes(valuesSubmit.employmentStatus)
            ) {
              props.history.push('/v2/reject');
            }
          } else if (
            result.status === 'Canceled' ||
            result.status === 'Rejected'
          ) {
            props.history.push('/v2/reject');
          } else if (result.status === 'PASS' && !result.data.hasResultR1) {
            props.history.push('/v2/round2-2');
          } else {
            props.history.push('/v2/reject');
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
    if (category === 'RELATIONSHIP' && value === 'S') {
      if (jarvisCustomer.gender === 'F') {
        const item = selections.filter(opt => opt.id === 96)[0];
        if (item) {
          return (
            {
              value: item && item.code,
              label: item && item.nameVI,
            } || {}
          );
        }
      } else if (jarvisCustomer.gender === 'M') {
        const item = selections.filter(opt => opt.id === 95)[0];
        if (item) {
          return (
            {
              value: item && item.code,
              label: item && item.nameVI,
            } || {}
          );
        }
      }
    }
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
        <form onSubmit={formik.handleSubmit}>
          <div className="formWrapper">
            <div className="form-group">
              <Autocomplete
                id="country-select-demo"
                name="maritalStatus"
                style={{ width: '100%' }}
                options={
                  selections &&
                  selections
                    .filter(selection => selection.category === 'MARITALSTATUS')
                    .map(selection => ({
                      value: selection.code || '',
                      label: selection.nameVI || '',
                    }))
                }
                value={
                  selections &&
                  formik.values.nationality &&
                  selections
                    .filter(
                      selection =>
                        selection.category === 'MARITALSTATUS' &&
                        selection.code === formik.values.maritalStatus,
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
                  formik.setFieldValue('maritalStatus', newValue.value);
                  setMaritalStatus(newValue.value);
                  if (newValue.value === 'MARRIED') {
                    formik.setFieldValue('relationRefOne', 'S');
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
              {formik.errors.maritalStatus && formik.touched.maritalStatus && (
                <span className="formError">{formik.errors.maritalStatus}</span>
              )}
            </div>
            {maritalStatus && maritalStatus === 'MARRIED' && (
              <div className="form-group">
                <TextField
                  name="fullNameRefOne"
                  fullWidth
                  variant="outlined"
                  label={
                    maritalStatus && maritalStatus === 'MARRIED'
                      ? 'Họ tên Vợ/Chồng'
                      : 'Họ tên người tham chiếu 1'
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullNameRefOne}
                />
                {formik.errors.fullNameRefOne &&
                  formik.touched.fullNameRefOne && (
                    <span className="formError">
                      {formik.errors.fullNameRefOne}
                    </span>
                  )}
              </div>
            )}
            {maritalStatus && maritalStatus === 'MARRIED' && (
              <>
                <div className={classes.formSubItemContainer}>
                  <SubdirectoryArrowRightIcon />
                  <div className={classes.formSubItem}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardDatePicker
                        autoOk
                        name="birthDateSpouse"
                        variant="inline"
                        inputVariant="outlined"
                        label="Ngày sinh"
                        format="DD/MM/YYYY"
                        value={formik.values.birthDateSpouse}
                        InputAdornmentProps={{ position: 'end' }}
                        onChange={date =>
                          formik.setFieldValue('birthDateSpouse', date)
                        }
                        fullWidth
                        invalidDateMessage=""
                        minDateMessage=""
                        maxDateMessage=""
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                </div>
                <div className={classes.formSubItemContainer}>
                  <SubdirectoryArrowRightIcon />
                  <div className={classes.formSubItem}>
                    <Autocomplete
                      style={{ width: '100%' }}
                      name="documentTypeSpouse"
                      options={DOCUMENT_TYPE}
                      classes={{
                        option: classes.option,
                      }}
                      onChange={(event, newValue) => {
                        formik.setFieldValue(
                          'documentTypeSpouse',
                          newValue.value,
                        );
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
                    {formik.errors.documentTypeSpouse &&
                      formik.touched.documentTypeSpouse && (
                      <span className="formError">
                        {formik.errors.documentTypeSpouse}
                      </span>
                    )}
                  </div>
                </div>

                <div className={classes.formSubItemContainer}>
                  <SubdirectoryArrowRightIcon />
                  <div className={classes.formSubItem}>
                    <TextField
                      name="documentNumberSpouse"
                      type="text"
                      fullWidth
                      variant="outlined"
                      label="Số CMND"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.documentNumberSpouse}
                    />
                    {formik.errors.documentNumberSpouse &&
                      formik.touched.documentNumberSpouse && (
                      <span className="formError">
                        {formik.errors.documentNumberSpouse}
                      </span>
                    )}
                  </div>
                </div>
              </>
            )}
            {maritalStatus && maritalStatus === 'MARRIED' && (
              <>
                <div className={classes.formSubItemContainer}>
                  <SubdirectoryArrowRightIcon />
                  <div className={classes.formSubItem}>
                    <Autocomplete
                      name="relationRefOne"
                      style={{ width: '100%' }}
                      options={
                        selections &&
                        selections
                          .filter(
                            selection => selection.category === 'RELATIONSHIP',
                          )
                          .map(selection => ({
                            value: selection.code || '',
                            label: selection.nameVI || '',
                          }))
                      }
                      classes={{
                        option: classes.option,
                      }}
                      disabled
                      value={getSelectedValue(
                        'RELATIONSHIP',
                        formik.values.relationRefOne,
                      )}
                      onChange={(event, newValue) => {
                        formik.setFieldValue('relationRefOne', newValue.value);
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
                    {formik.errors.relationRefOne &&
                      formik.touched.relationRefOne && (
                      <span className="formError">
                        {formik.errors.relationRefOne}
                      </span>
                    )}
                  </div>
                </div>

                <div className={classes.formSubItemContainer}>
                  <SubdirectoryArrowRightIcon />
                  <div className={classes.formSubItem}>
                    <TextField
                      name="mobileNumberRefOne"
                      fullWidth
                      variant="outlined"
                      label="Số điện thoại"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.mobileNumberRefOne}
                    />
                    {formik.errors.mobileNumberRefOne &&
                      formik.touched.mobileNumberRefOne && (
                      <span className="formError">
                        {formik.errors.mobileNumberRefOne}
                      </span>
                    )}
                  </div>
                </div>
              </>
            )}

            <div className="form-group">
              <Autocomplete
                name="employmentStatus"
                id="country-select-demo"
                style={{ width: '100%' }}
                options={
                  selections &&
                  selections
                    .filter(
                      selection => selection.category === 'EMPLOYMENTSTATUS',
                    )
                    .map(selection => ({
                      value: selection.code || '',
                      label: selection.nameVI || '',
                    }))
                }
                value={
                  selections &&
                  formik.values.employmentStatus &&
                  selections
                    .filter(
                      selection =>
                        selection.category === 'EMPLOYMENTSTATUS' &&
                        selection.code === formik.values.employmentStatus,
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
                  formik.setFieldValue('employmentStatus', newValue.value);
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
              {formik.errors.employmentStatus &&
                formik.touched.employmentStatus && (
                  <span className="formError">
                    {formik.errors.employmentStatus}
                  </span>
                )}
            </div>

            <div className="form-group">
              <Autocomplete
                id="country-select-demo"
                name="mainIncomeType"
                style={{ width: '100%' }}
                options={
                  selections &&
                  selections
                    .filter(selection => selection.category === 'MAININCOME')
                    .map(selection => ({
                      value: selection.code || '',
                      label: selection.nameVI || '',
                    }))
                }
                value={
                  selections &&
                  formik.values.mainIncomeType &&
                  selections
                    .filter(
                      selection =>
                        selection.category === 'MAININCOME' &&
                        selection.code === formik.values.mainIncomeType,
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
                  formik.setFieldValue('mainIncomeType', newValue.value);
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
              {formik.errors.mainIncomeType &&
                formik.touched.mainIncomeType && (
                  <span className="formError">
                    {formik.errors.mainIncomeType}
                  </span>
                )}
            </div>

            <div className="form-group">
              <TextField
                fullWidth
                name="monthlyIncome"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.monthlyIncome}
                variant="outlined"
                label="Thu nhập hàng tháng"
                InputProps={{
                  inputComponent: MaskedInput,
                }}
              />
              {formik.errors.monthlyIncome && formik.touched.monthlyIncome && (
                <span className="formError">{formik.errors.monthlyIncome}</span>
              )}
            </div>

            <div className="form-group">
              <Autocomplete
                name="position"
                style={{ width: '100%' }}
                options={
                  selections &&
                  selections
                    .filter(selection => selection.category === 'OCCUPATION')
                    .map(selection => ({
                      value: selection.code || '',
                      label: selection.nameVI || '',
                    }))
                }
                value={
                  selections &&
                  formik.values.position &&
                  selections
                    .filter(
                      selection =>
                        selection.category === 'OCCUPATION' &&
                        selection.code === formik.values.position,
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
                  formik.setFieldValue('position', newValue.value);
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
              {formik.errors.position && formik.touched.position && (
                <span className="formError">{formik.errors.position}</span>
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
