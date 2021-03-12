/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
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
import moment from 'moment';
import MaskedInput from 'MaskedInput';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';
import StepApp from './StepApp';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  formContainer: {
    width: '100%',
    maxWidth: '470px',
    backgroundColor: 'white',
    minHeight: '100vh',
    [theme.breakpoints.up('md')]: {
      marginTop: '0px',
      marginBottom: '32px',
      borderRadius: '0px',
    },
    borderRadius: '4px',
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
    lineHeight: '1.5',
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

const DOCUMENT_TYPE = [
  { value: 'PV', label: 'Hộ chiếu' },
  { value: 'IC', label: 'CMND/CCCD' },
  { value: 'ICM', label: 'CMND Quân Đội' },
];

export default function Round3(props) {
  const classes = useStyles();
  const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', {});
  const selections = _.get(props, 'jarvisCustomerV2.selections', []);
  const provinces = _.get(props, 'jarvisCustomerV2.provinces', []);
  const cards = _.get(props, 'jarvisCustomerV2.cards', []);
  const branches = _.get(props, 'jarvisCustomerV2.branches', []);
  const hasVirtualCard = _.get(props, 'jarvisCustomerV2.showVirtualCard', {});
  const [showBranch, setShowBranch] = useState(
    jarvisCustomer.deliveryCard === 'BRANCH',
  );
  const [showVirtualCardLimit, setShowVirtualCardLimit] = useState(false);
  const [showUsGreenCard, setShowUsGreenCard] = useState(
    (jarvisCustomer && jarvisCustomer.isUSGreenCard) || false,
  );
  const [district, setDistrict] = useState([]);

  useEffect(() => {
    props.dispatch(Actions.getAllCard());
    props.dispatch(Actions.getBranches());
    props.dispatch(
      Actions.getShowVirtualCard({
        channelType: 'online',
        cardId: jarvisCustomer.typeOfCreditCard,
        promotionCode: jarvisCustomer.promotionCode,
      }),
    );
  }, [props.dispatch]);

  useEffect(() => {
    if (jarvisCustomer && jarvisCustomer.deliveryCardProvince && branches) {
      const province = branches.filter(
        pv => pv.province.code === jarvisCustomer.deliveryCardProvince,
      );
      setDistrict(province);
    }
  }, [jarvisCustomer]);

  const validate = values => {
    const errors = {};
    if (!values.requestLimit) {
      errors.requestLimit = 'Bạn chưa nhập hạn mức';
    }

    if (!values.typeOfCreditCard) {
      errors.typeOfCreditCard = 'Bạn chưa chọn loại thẻ';
    }

    if (
      values.isVirtualcard &&
      values.isVirtualcard === '1' &&
      !values.virtualCardLimit
    ) {
      errors.virtualCardLimit = 'Bạn chưa nhập hạn mức thẻ ảo';
    }

    if (!values.accInternetBanking) {
      errors.accInternetBanking = 'Bạn chưa nhập tên đăng nhập VPBank Online';
    } else if (
      values.accInternetBanking &&
      (values.accInternetBanking.length < 6 ||
        values.accInternetBanking.length > 50)
    ) {
      errors.accInternetBanking =
        'Xin lỗi quý khách, Tên đăng nhập VPBank Online không hợp lệ';
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
      if (values.documentTypeSpouse === 'PV' && values.documentNumberSpouse) {
        const documentLength = values.documentNumberSpouse;
        if (documentLength < 8 || documentLength > 13) {
          errors.documentNumberSpouse =
            'Xin lỗi quý khách, Hộ chiếu quý khách vừa nhập không hợp lệ';
        }
      }
    } else {
      if (!values.fullNameRefOne) {
        errors.fullNameRefOne = 'Bạn chưa nhập tên người tham chiếu thứ nhất';
      }
      if (!values.mobileNumberRefOne) {
        errors.mobileNumberRefOne =
          'Bạn chưa nhập số điện thoại người tham chiếu thứ nhất';
      }
    }

    if (!values.fullNameRefTwo) {
      errors.fullNameRefTwo = 'Bạn chưa nhập tên người tham chiếu thứ hai';
    }
    if (!values.mobileNumberRefTwo) {
      errors.mobileNumberRefTwo =
        'Bạn chưa nhập số điện thoại người tham chiếu thứ hai';
    }
    if (!values.relationRefTwo) {
      errors.relationRefTwo = 'Bạn chưa chọn mối quan hệ với chủ thẻ';
    }

    if (!values.securityQuestion) {
      errors.securityQuestion = 'Bạn chưa chọn câu hỏi bí mật';
    }

    if (!values.securityAnswer) {
      errors.securityAnswer = 'Bạn chưa nhập câu trả lời bí mật';
    }

    if (!values.securityAnswer) {
      errors.securityAnswer = 'Bạn chưa nhập câu trả lời bí mật';
    }

    if (!values.deliveryCard) {
      errors.deliveryCard = 'Bạn chưa chọn địa chỉ nhận thẻ';
    } else if (values.deliveryCard && values.deliveryCard === 'BRANCH') {
      if (!values.deliveryCardProvince) {
        errors.deliveryCardProvince = 'Bạn chưa chọn Tỉnh/Thành phố';
      }

      if (!values.deliveryBranch) {
        errors.deliveryBranch = 'Bạn chưa chọn chi nhánh';
      }
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: jarvisCustomer || {},
    validate,
    onSubmit: onSubmitForm,
  });

  function onSubmitForm(values) {
    const valuesSubmit = values;
    valuesSubmit.processStep = 'Work_Form_R_3';
    valuesSubmit.dob = moment(valuesSubmit.dob, 'DD/MM/YYYY')
      .utc()
      .isValid()
      ? moment(valuesSubmit.dob, 'DD/MM/YYYY').format('YYYY-MM-DDTHH:mm:ss.SSS')
      : null;
    if (values.birthDateSpouse && typeof values.birthDateSpouse !== 'string') {
      valuesSubmit.birthDateSpouse = valuesSubmit.birthDateSpouse.format(
        'DD/MM/YYYY',
      );
    }
    return new Promise((resolve, reject) => {
      props.dispatch(Actions.saveDataApp(values, resolve, reject));
    })
      .then(() => {
        props.history.push('/v2/document');
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
        return { value: opt.code, label: opt.nameVI };
    });
    return { value: item && item.code, label: item && item.nameVI } || {};
  }

  function changeProvince(e) {
    const province = branches.filter(pv => pv.province.code === e);
    setDistrict(province);
  }

  function getCardSelectedValue(value) {
    const item =
      cards &&
      cards.find(opt => {
        if (opt.id === value) return { value: opt.id, label: opt.name };
      });
    return { value: item && item.id, label: item && item.name } || {};
  }

  function getProvinceSelectedValue(value) {
    const item =
      provinces &&
      provinces.find(opt => {
        if (opt.code === value) return { value: opt.code, label: opt.name };
      });
    return { value: item && item.code, label: item && item.name } || {};
  }

  function getBranchSelectedValue(value) {
    const item =
      district &&
      district.find(opt => {
        if (opt.code === value) return { value: opt.code, label: opt.name };
      });
    return { value: item && item.code, label: item && item.name } || {};
  }

  function changeDelivery(value) {
    if (value === 'BRANCH') {
      setShowBranch(true);
    } else {
      setShowBranch(false);
    }
  }

  function regisVirtualCard(value) {
    if (value === '1') {
      setShowVirtualCardLimit(true);
    } else {
      setShowVirtualCardLimit(false);
    }
  }

  function changeUSGreenCard(value) {
    if (value === '1') {
      setShowUsGreenCard(true);
    } else {
      setShowUsGreenCard(false);
    }
  }

  function getDocumentSelected(value) {
    const item = DOCUMENT_TYPE.find(opt => {
      if (opt.value === value) return { value: opt.value, label: opt.label };
    });
    return (
      {
        value: (item && item.value) || '',
        label: (item && item.label) || '',
      } || null
    );
  }

  return (
    <JarvisFormStyle>
      <Header className="header" step={3} showStep={false} />
      <StepApp step={2} />
      <div className={classes.formContainer}>
        <div className={classes.titleHeader}>Thông tin khác</div>
        <form onSubmit={formik.handleSubmit}>
          <div className="formWrapper">
            <div className="form-group">
              <TextField
                name="requestLimit"
                fullWidth
                variant="outlined"
                label="Hạn mức lựa chọn"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.requestLimit}
                placeholder="10.000.000"
                InputProps={{
                  inputComponent: MaskedInput,
                }}
              />
              {formik.errors.requestLimit && formik.touched.requestLimit && (
                <span className="formError">
                  {formik.errors.requestLimit}
                </span>
              )}
            </div>
            <div className="form-group">
              <Autocomplete
                name="typeOfCreditCard"
                style={{ width: '100%' }}
                options={
                  cards &&
                  cards.map(card => ({
                    value: card.id || '',
                    label: card.name || '',
                  }))
                }
                classes={{
                  option: classes.option,
                }}
                value={getCardSelectedValue(formik.values.typeOfCreditCard)}
                onChange={(event, newValue) => {
                  formik.setFieldValue('typeOfCreditCard', newValue.value);
                }}
                autoHighlight
                getOptionLabel={option => option.label}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Loại thẻ"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                    }}
                  />
                )}
              />
              {formik.errors.typeOfCreditCard &&
                formik.touched.typeOfCreditCard && (
                  <span className="formError">
                    {formik.errors.typeOfCreditCard}
                  </span>
                )}
            </div>
            {hasVirtualCard && hasVirtualCard.outputObj && (
              <>
                <div className="form-group checkboxWrapper">
                  <FormControl
                    component="fieldset"
                    name="isVirtualcard"
                    value={formik.values.isVirtualcard}
                  >
                    <FormLabel
                      component="legend"
                      className={classes.labelStyle}
                    >
                      Bạn có muốn đăng kí thẻ ảo không?
                    </FormLabel>
                    <RadioGroup
                      aria-label="isVirtualcard"
                      name="isVirtualcard"
                      value={formik.values.isVirtualcard}
                      onChange={e => {
                        formik.setFieldValue('isVirtualcard', e.target.value);
                        regisVirtualCard(e.target.value);
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
                {showVirtualCardLimit && (
                  <div className={classes.formSubItemContainer}>
                    <SubdirectoryArrowRightIcon />
                    <div className={classes.formSubItem}>
                      <TextField
                        name="virtualCardLimit"
                        fullWidth
                        variant="outlined"
                        label="Hạn mức thẻ ảo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.virtualCardLimit}
                        InputProps={{
                          inputComponent: MaskedInput,
                        }}
                      />
                      {formik.errors.virtualCardLimit &&
                        formik.touched.virtualCardLimit && (
                          <span className="formError">
                            {formik.errors.virtualCardLimit}
                          </span>
                        )}
                    </div>
                  </div>
                )}
              </>
            )}
            {jarvisCustomer && !jarvisCustomer.internetBanking && (
              <div className="form-group">
                <Autocomplete
                  name="vpBankOnlinePackage"
                  style={{ width: '100%' }}
                  options={
                    selections &&
                    selections
                      .filter(selection => selection.category === 'VPBONLINE')
                      .map(selection => ({
                        value: selection.code || '',
                        label: selection.nameVI || '',
                      }))
                  }
                  classes={{
                    option: classes.option,
                  }}
                  value={getSelectedValue(
                    'VPBONLINE',
                    formik.values.vpBankOnlinePackage,
                  )}
                  onChange={(event, newValue) => {
                    formik.setFieldValue(
                      'vpBankOnlinePackage',
                      newValue.value,
                    );
                  }}
                  autoHighlight
                  getOptionLabel={option => option.label}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Gói đăng kí VPBank Online"
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
            )}
            <div className="form-group">
              <TextField
                name="accInternetBanking"
                fullWidth
                variant="outlined"
                label="Tên đăng nhập VPBANK ONLINE"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.accInternetBanking}
              />
              {formik.errors.accInternetBanking &&
                formik.touched.accInternetBanking && (
                  <span className="formError">
                    {formik.errors.accInternetBanking}
                  </span>
                )}
            </div>
            <div className="form-group">
              <TextField
                name="fullNameRefOne"
                fullWidth
                variant="outlined"
                label={
                  jarvisCustomer.maritalStatus &&
                  jarvisCustomer.maritalStatus === 'MARRIED'
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
            {jarvisCustomer.maritalStatus &&
              jarvisCustomer.maritalStatus === 'MARRIED' && (
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
                          invalidDateMessage=""
                          minDateMessage=""
                          maxDateMessage=""
                          value={formik.values.birthDateSpouse}
                          defaultValue={formik.values.birthDateSpouse}
                          InputAdornmentProps={{ position: 'end' }}
                          onChange={date =>
                            formik.setFieldValue(
                              'birthDateSpouse',
                              moment(date).format('DD/MM/YYYY'),
                            )
                          }
                          fullWidth
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                  </div>
                  <div className={classes.formSubItemContainer}>
                    <SubdirectoryArrowRightIcon />
                    <div className={classes.formSubItem}>
                      <Autocomplete
                        name="documentTypeSpouse"
                        style={{ width: '100%' }}
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
                        value={getDocumentSelected(
                          formik.values.documentTypeSpouse,
                        )}
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
            <div className="form-group">
              <TextField
                name="fullNameRefTwo"
                fullWidth
                variant="outlined"
                label={
                  jarvisCustomer.maritalStatus &&
                  jarvisCustomer.maritalStatus === 'MARRIED'
                    ? 'Họ tên người tham chiếu 1'
                    : 'Họ tên người tham chiếu 2'
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullNameRefTwo}
              />
              {formik.errors.fullNameRefTwo &&
                formik.touched.fullNameRefTwo && (
                  <span className="formError">
                    {formik.errors.fullNameRefTwo}
                  </span>
                )}
            </div>
            <div className={classes.formSubItemContainer}>
              <SubdirectoryArrowRightIcon />
              <div className={classes.formSubItem}>
                <Autocomplete
                  name="relationRefTwo"
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
                  value={getSelectedValue(
                    'RELATIONSHIP',
                    formik.values.relationRefTwo,
                  )}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('relationRefTwo', newValue.value);
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
                {formik.errors.relationRefTwo &&
                  formik.touched.relationRefTwo && (
                    <span className="formError">
                      {formik.errors.relationRefTwo}
                    </span>
                  )}
              </div>
            </div>

            <div className={classes.formSubItemContainer}>
              <SubdirectoryArrowRightIcon />
              <div className={classes.formSubItem}>
                <TextField
                  name="mobileNumberRefTwo"
                  fullWidth
                  variant="outlined"
                  label="Số điện thoại"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobileNumberRefTwo}
                />
                {formik.errors.mobileNumberRefTwo &&
                  formik.touched.mobileNumberRefTwo && (
                    <span className="formError">
                      {formik.errors.mobileNumberRefTwo}
                    </span>
                  )}
              </div>
            </div>
            <div className="form-group">
              <Autocomplete
                nname="securityQuestion"
                style={{ width: '100%' }}
                options={
                  selections &&
                  selections
                    .filter(
                      selection => selection.category === 'SECURITYQUESTION',
                    )
                    .map(selection => ({
                      value: selection.code,
                      label: selection.nameVI,
                    }))
                }
                classes={{
                  option: classes.option,
                }}
                value={getSelectedValue(
                  'SECURITYQUESTION',
                  formik.values.securityQuestion,
                )}
                onChange={(event, newValue) => {
                  formik.setFieldValue('securityQuestion', newValue.value);
                }}
                autoHighlight
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
              {formik.errors.securityQuestion && (
                <span className="formError">
                  {formik.errors.securityQuestion.message}
                </span>
              )}
            </div>
            <div className={classes.formSubItemContainer}>
              <SubdirectoryArrowRightIcon />
              <div className={classes.formSubItem}>
                <TextField
                  name="securityAnswer"
                  fullWidth
                  variant="outlined"
                  label="Trả lời câu hỏi bảo mật"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.securityAnswer}
                />
                {formik.errors.securityAnswer &&
                  formik.touched.securityAnswer && (
                    <span className="formError">
                      {formik.errors.securityAnswer}
                    </span>
                  )}
              </div>
            </div>
            <div className="form-group">
              <Autocomplete
                name="deliveryCard"
                id="country-select-demo"
                style={{ width: '100%' }}
                options={
                  selections &&
                  selections
                    .filter(
                      selection => selection.category === 'DELIVERYCARD',
                    )
                    .map(selection => ({
                      value: selection.code,
                      label: selection.nameVI,
                    }))
                }
                classes={{
                  option: classes.option,
                }}
                value={getSelectedValue(
                  'DELIVERYCARD',
                  formik.values.deliveryCard,
                )}
                onChange={(event, newValue) => {
                  formik.setFieldValue('deliveryCard', newValue.value);
                  changeDelivery(newValue.value);
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
              {formik.errors.deliveryCard && formik.touched.deliveryCard && (
                <span className="formError">
                  {formik.errors.deliveryCard}
                </span>
              )}
            </div>
            {showBranch && (
              <>
                <div className={classes.formSubItemContainer}>
                  <SubdirectoryArrowRightIcon />
                  <div className={classes.formSubItem}>
                    <Autocomplete
                      name="deliveryCardProvince"
                      style={{ width: '100%' }}
                      options={provinces.map(province => ({
                        value: province.code,
                        label: province.name,
                      }))}
                      classes={{
                        option: classes.option,
                      }}
                      value={getProvinceSelectedValue(
                        formik.values.deliveryCardProvince,
                      )}
                      autoHighlight
                      onChange={(event, newValue) => {
                        changeProvince(newValue.value);
                        formik.setFieldValue(
                          'deliveryCardProvince',
                          newValue.value,
                        );
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
                    {formik.errors.deliveryCardProvince &&
                      formik.touched.deliveryCardProvince && (
                        <span className="formError">
                          {formik.errors.deliveryCardProvince}
                        </span>
                      )}
                  </div>
                </div>

                <div className={classes.formSubItemContainer}>
                  <SubdirectoryArrowRightIcon />
                  <div className={classes.formSubItem}>
                    <Autocomplete
                      name="deliveryBranch"
                      style={{ width: '100%' }}
                      options={
                        district &&
                        district.map(dis => ({
                          value: dis.code,
                          label: dis.name,
                        }))
                      }
                      value={getBranchSelectedValue(
                        formik.values.deliveryBranch,
                      )}
                      classes={{
                        option: classes.option,
                      }}
                      onChange={(event, newValue) => {
                        formik.setFieldValue(
                          'deliveryBranch',
                          newValue.value,
                        );
                      }}
                      autoHighlight
                      getOptionLabel={option => (option ? option.label : '')}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Chi nhánh"
                          variant="outlined"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                    {formik.errors.deliveryBranch &&
                      formik.touched.deliveryBranch && (
                        <span className="formError">
                          {formik.errors.deliveryBranch}
                        </span>
                      )}
                  </div>
                </div>
              </>
            )}

            <div className="form-group">
              <FormControl
                component="fieldset"
                name="isUSGreenCard"
                value={formik.values.isUSGreenCard}
              >
                <FormLabel component="legend" className={classes.lableStyle}>
                  Bạn có thuộc một trong các điều kiện sau không: là công dân
                  Hoa Kỳ, có thẻ thường trú nhân tại Hoa Kỳ (Thẻ Xanh) hoặc là
                  cá nhân cư trú tại Hoa Kỳ?
                </FormLabel>
                <RadioGroup
                  aria-label="isUSGreenCard"
                  name="isUSGreenCard"
                  value={formik.values.isUSGreenCard}
                  onChange={e => {
                    formik.setFieldValue('isUSGreenCard', e.target.value);
                    changeUSGreenCard(e.target.value);
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
              {formik.errors.haveGreenCard &&
                formik.touched.haveGreenCard && (
                  <span className="formError">
                    {formik.errors.haveGreenCard.message}
                  </span>
                )}
            </div>
            {showUsGreenCard && (
              <div className={classes.formSubItemContainer}>
                <SubdirectoryArrowRightIcon />
                <div className={classes.formSubItem}>
                  <TextField
                    name="tinNumber"
                    fullWidth
                    variant="outlined"
                    label="Mã số thuế"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.tinNumber}
                  />
                  {formik.errors.tinNumber && formik.touched.tinNumber && (
                    <span className="formError">
                      {formik.errors.tinNumber}
                    </span>
                  )}
                </div>
              </div>
            )}

            <button type="submit" className={classes.action}>
              Tiếp tục
            </button>
          </div>
        </form>
      </div>
    </JarvisFormStyle>
  );
}
