/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import _ from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';
import * as Actions from '../../actions';

const schema = yup.object().shape({
  creditLimit: yup.string().required('Bạn chưa nhập hạn mức'),
});

export default function RegisLimitInfo(props) {
  const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', {});
  const { register, handleSubmit, errors, control } = useForm({
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: jarvisCustomer,
    resolver: yupResolver(schema),
  });
  const [, setLimitType] = useState(1);

  function onSubmitForm(values) {
    props.dispatch(Actions.saveData(values));
    props.setStep(0);
  }

  return (
    <JarvisFormStyle>
      <Header className="header" />
      <div className="roundName2">CHỌN HẠN MỨC TÍN DỤNG</div>
      <div className="confirmTitle">Dễ dàng thay đổi hạn mức đăng ký</div>
      <form className="formWrapper" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="virtualcardConfirm">
          {_.get(jarvisCustomer, 'selectedCard.name', '')} có hạn mức tối đa là{' '}
          {_.get(jarvisCustomer, 'selectedCard.limit', '').toLocaleString()} VNĐ
        </div>
        <div className="formWrapper">
          {/* <div className="radioWrapper">
						<input
							className="form-control radioControl"
							name="registerVPO"
							type="radio"
							ref={register}
						/> Có
						</div>
					<div className="radioWrapper">
						<input
							className="form-control radioControl"
							name="registerVPO"
							type="radio"
							ref={register}
						/> Không

					</div> */}
          <Controller
            name="limitType"
            control={control}
            render={props => (
              <RadioGroup
                aria-label="gender"
                name="limitType"
                value={props.value}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Sử dụng hạn mức tối đa"
                  onChange={props.onChange}
                />
                {props.value === '1' && (
                  <div className="form-group">
                    <input
                      className="form-control formControl"
                      name="creditLimit"
                      value={_.get(jarvisCustomer, 'selectedCard.limit', 0)}
                      placeholder="Hạn mức"
                      onChange={() => setLimitType(1)}
                      ref={register}
                    />
                    {errors.creditLimit && (
                      <span className="formError">
                        {errors.creditLimit.message}
                      </span>
                    )}
                  </div>
                )}
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Tôi muốn giảm hạn mức"
                  onChange={props.onChange}
                />
                {props.value === '2' && (
                  <div className="form-group">
                    <label>Hạn mức mong muốn</label>
                    <input
                      className="form-control formControl"
                      name="creditLimit"
                      placeholder="Hạn mức"
                      ref={register}
                    />
                    {errors.creditLimit && (
                      <span className="formError">
                        {errors.creditLimit.message}
                      </span>
                    )}
                  </div>
                )}
              </RadioGroup>
            )}
          />
          <div>
            {errors.registerVPO && (
              <span className="formError">{errors.registerVPO.message}</span>
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
