/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
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
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';
import BackButton from './BackButton';
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


const QUESTION = [
  { value: 'htm', label: 'Họ tên mẹ' },
  { value: 'mg', label: 'Nơi sinh ra của mẹ' },
  { value: 'tth', label: 'Trường tiểu học của bạn là gì' },
];

const GREEN_CARD = [
  { value: 'c', label: 'Có' },
  { value: 'k', label: 'Không' },
];

const schema = yup.object().shape({
  securityQuestion: yup.object().required('Bạn chưa chọn câu hỏi bí mật'),
  securityAnswer: yup.string().required('Bạn chưa nhập câu trả lời'),
});

export default function Round3(props) {
  const classes = useStyles();
  const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', {});
  const selections = _.get(props, 'jarvisCustomerV2.selections', []);
  const { register, handleSubmit, errors, control } = useForm({
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: {
      ...jarvisCustomer,
      id: jarvisCustomer.id,
      haveGreenCard: jarvisCustomer && jarvisCustomer.haveGreenCard ? jarvisCustomer.haveGreenCard : "0"
    },
    resolver: yupResolver(schema),
  });

  function onSubmitForm(values) {
    props.dispatch(Actions.saveData(values));
    props.setStep(11);
  }

  function goBack() {
    props.setStep(9);
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
                name="permanentProvince"
                control={control}
                render={({ value, onChange }) => (
                  <Autocomplete
                    style={{ width: '90vw' }}
                    options={selections && selections.filter(selection => selection.category === "SECURITYQUESTION").map(selection => ({
                      value: selection.code,
                      label: selection.nameVi
                    }))}
                    classes={{
                      option: classes.option,
                    }}
                    autoHighlight
                    onChange={(event, newValue) => {
                      onChange(newValue.value);
                    }}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
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
              control={control} />
            {errors.securityAnswer && (
              <span className="formError">{errors.securityAnswer.message}</span>
            )}
          </div>
          <div className="form-group">
            <Controller
                name="haveGreenCard"
                control={control}
                render={({ value, onChange }) => (
                  <FormControl component="fieldset">
                    <FormLabel component="legend" className={classes.labelStyle}>Bạn có thuộc một trong các điều kiện sau không: là công dân Hoa
              Kỳ, có thẻ thường trú nhân tại Hoa Kỳ (Thẻ Xanh) hoặc là cá nhân
              cư trú tại Hoa Kỳ?</FormLabel>
                    <RadioGroup aria-label="haveGreenCard" name="haveGreenCard" value={value} onChange={(e) => onChange(e.target.value)} className={classes.genderContainer}>
                      <FormControlLabel value="1" control={<Radio />} label="Có" />
                      <FormControlLabel value="0" control={<Radio />} label="Không" />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            {errors.haveGreenCard && (
              <span className="formError">{errors.haveGreenCard.message}</span>
            )}
          </div>
          <button type="submit" className="btn btnSubmit">
            Tiếp tục
          </button>
        </div>
      </form>
      </div>
    </JarvisFormStyle>
  );
}
