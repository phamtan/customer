/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import {
  Button
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import XRegExp from 'xregexp';
import _ from 'lodash';
import { Formik, Form, Field, useFormik } from 'formik';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';
import StepApp from './StepApp';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  formContainer: {
    width: '100%',
    backgroundColor: 'white',
    marginTop: '18px',
    height: '100vh',
    maxWidth: '470px',
    margin: 'auto',
    borderRadius: '4px',
    marginBottom: '16px',
    [theme.breakpoints.up('md')]: {
      marginTop: '0px',
      marginBottom: '32px',
      borderRadius: '0px',
    },
  },
  titleHeader: {
    fontSize: '24px',
    width: '100%',
    textAlign: 'center',
    marginTop: '16px',
    marginBottom: '24px',
  },
  cardStyle: {
    width: '95%',
    marginLeft: '16px',
    marginRight: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '16px',
  },
  titleCard: {
    marginBottom: '48px',
  },
  cardContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '16px',
    marginBottom: '24px',
  },
  dividerStyle: {
    color: '#117f8a',
    backgroundColor: '#117f8a',
    width: '100%',
  },
  cardName: {
    color: '#117f8a',
    marginTop: '18px',
    marginBottom: '18px',
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameStyle: {
    paddingTop: '10px',
    paddingLeft: '4px',
    color: '#028547',
  },
  guiline: {
    width: '100%',
    fontSize: '16px',
    color: 'black',
    textAlign: 'center',
    marginTop: '7px',
  },
  action: {
    width: '100%',
    margin: 'auto',
    height: '46px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    backgroundColor: '#028547',
    color: 'white',
    fontSize: '14px',
    border: 'none',
    textTransform: 'uppercase',
  },
  inputSytle: {
    fontSize: '16px',
  },
}));

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required('Bạn chưa nhập họ tên')
    .test(
      `test-name`,
      'Xin lỗi quý khách, phần họ tên không đúng định dạng',
      value => {
        // your logic
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
});

export default function Round1(props) {
  const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', null);
  // const { handleSubmit, errors, control, formState } = useForm({
  //   reValidateMode: 'onChange',
  //   shouldFocusError: true,
  //   shouldUnregister: true,
  //   defaultValues: {},
  //   resolver: yupResolver(schema),
  // });
  // const errors = {};
  const classes = useStyles();

  function onSubmitForm(values) {
    const valuesSubmit = Object.assign(jarvisCustomer, values);
    valuesSubmit.type = 'CC';
    valuesSubmit.processStep = 'BasicStep';
    return new Promise((resolve, reject) => {
      props.dispatch(Actions.register(valuesSubmit, resolve, reject));
    })
      .then(data => {
        if (data.needVerifyOTP) {
          props.history.push('/v2/otp');
        }
      })
      .catch(() => {
        props.handleShoMessage({
          message: 'Có lỗi xảy ra vui lòng thử lại',
          severity: 'error',
        });
      });
  }

  return (
    <JarvisFormStyle>
      <Header className="header" step={1} />
      <StepApp />
      <div className={classes.formContainer}>
        <div className={classes.titleHeader}>
          <div>Xin chào!</div>
          <div>Nhập thông tin của bạn để mở thẻ tín dụng mới.</div>
        </div>
        <Formik
          initialValues={jarvisCustomer || {}}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Bạn chưa nhập email';
            } else if (
              !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(
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
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              alert(JSON.stringify(values, null, 2));
            }, 500);
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <div className="formWrapper">
                <div className="form-group">
                  <Field
                    component={TextField}
                    name="fullName"
                    fullWidth
                    variant="outlined"
                    label="Họ tên"
                    className={classes.inputSytle}
                    classes={{
                      root: classes.inputStyle,
                    }}
                  />
                  {/* {errors.fullName && (
                    <span className="formError">{errors.fullName}</span>
                  )} */}
                </div>
                <div className="form-group">
                  <Field
                    component={TextField}
                    name="mobileNumber"
                    fullWidth
                    variant="outlined"
                    label="Số điện thoại"
                    className={classes.inputSytle}
                    classes={{
                      root: classes.inputStyle,
                    }}
                  />
                  {/* {errors.mobileNumber && (
                    <span className="formError">{errors.mobileNumber}</span>
                  )} */}
                </div>

                <div className="form-group">
                  <Field
                    component={TextField}
                    name="email"
                    fullWidth
                    variant="outlined"
                    label="Email"
                    className={classes.inputSytle}
                    classes={{
                      root: classes.inputStyle,
                    }}
                  />
                  {/* {errors.email && (
                    <span className="formError">{errors.email}</span>
                  )} */}
                </div>

                <Button
                  onClick={submitForm}
                  className={classes.action}
                  disabled={isSubmitting}
                >
                  Tiếp tục
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </JarvisFormStyle>
  );
}
