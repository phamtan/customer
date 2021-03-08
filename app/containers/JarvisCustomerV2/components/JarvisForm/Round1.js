/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import _ from 'lodash';
import { Formik, Form, Field } from 'formik';
import XRegExp from 'xregexp';
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

export default function Round1(props) {
  const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', null);
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
            } else if (values.mobileNumber && values.mobileNumber.length > 10) {
              errors.mobileNumber = 'Số điện thoại chỉ từ 10 số';
            }
            return errors;
          }}
          onSubmit={values => onSubmitForm(values)}
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
