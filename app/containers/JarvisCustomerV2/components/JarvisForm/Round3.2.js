/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import _ from 'lodash';
import Select from 'react-select';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';
import BackButton from './BackButton';
import * as Actions from '../../actions';

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
  const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', {});
  const { register, handleSubmit, errors, control } = useForm({
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: jarvisCustomer,
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
      <Header className="header" step={3} />
      <BackButton className="btnBack" goBack={goBack} />
      <div className="roundTitle">BƯỚC 3:</div>
      <div className="roundName">XÁC NHẬN THÔNG TIN</div>
      <form className="formWrapper" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="formWrapper">
          <div className="form-group">
            <label>Câu hỏi bảo mật</label>
            <Controller
              name="securityQuestion"
              control={control}
              render={props => (
                <Select
                  className="formControl"
                  options={QUESTION}
                  onChange={e => props.onChange(e)}
                  value={props.value}
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
            <label>Trả lời câu hỏi bảo mật</label>
            <input
              name="securityAnswer"
              className="form-control formControl"
              placeholder=""
              type="text"
              ref={register}
            />
            {errors.securityAnswer && (
              <span className="formError">{errors.securityAnswer.message}</span>
            )}
          </div>
          <div className="form-group">
            <label>
              Bạn có thuộc một trong các điều kiện sau không: là công dân Hoa
              Kỳ, có thẻ thường trú nhân tại Hoa Kỳ (Thẻ Xanh) hoặc là cá nhân
              cư trú tại Hoa Kỳ?
            </label>
            <Controller
              name="haveGreenCard"
              control={control}
              render={props => (
                <Select
                  className="formControl"
                  options={GREEN_CARD}
                  onChange={e => props.onChange(e)}
                  value={props.value}
                />
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
    </JarvisFormStyle>
  );
}
