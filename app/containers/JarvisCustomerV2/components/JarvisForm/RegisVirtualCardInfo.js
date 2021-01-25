/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';
import BackButton from './BackButton';
import * as Actions from '../../actions';

const schema = yup.object().shape({
  virtualLimit: yup.string().required('Bạn chưa nhập hạn mức thẻ ảo'),
});

export default function RegisterVirtualCard(props) {
  const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', {});
  const { register, handleSubmit, errors } = useForm({
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: jarvisCustomer,
    resolver: yupResolver(schema),
  });

  function onSubmitForm(values) {
    props.dispatch(Actions.saveData(values));
    props.setStep(6);
  }

  function goBack() {
    props.setStep(10);
  }

  return (
    <JarvisFormStyle>
      <Header className="header" step={4} />
      <BackButton className="btnBack" goBack={goBack} />
      <div className="roundTitle">BƯỚC 4:</div>
      <div className="roundName">CHỌN LOẠI THẺ</div>
      <div className="confirmTitle">Mở thẻ ảo</div>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="formWrapper">
          <div className="form-group">
            <label>Hạn mức thẻ ảo</label>
            <input
              className="form-control formControl"
              name="virtualLimit"
              placeholder="Hạn mức"
              ref={register}
            />
            {errors.virtualLimit && (
              <span className="formError">{errors.virtualLimit.message}</span>
            )}
          </div>
        </div>
        <div className="virtualcardConfirm">
          Bạn có muốn mở và sử dụng VPBank Online không?
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
          {/* <Controller
						name="registerVPO"
						control={control}
						render={props => (
							<RadioGroup aria-label="gender" name="registerVPO" value={props.value} >
								<FormControlLabel value="1" control={<Radio />} label="Có" onChange={props.onChange} />
								<FormControlLabel value="2" control={<Radio />} label="Không" onChange={props.onChange} />
							</RadioGroup>
						)}
					/>
					<div>
						{errors.registerVPO && (
							<span className="formError">{errors.registerVPO.message}</span>
						)}
					</div> */}

          <button type="submit" className="btn btnSubmit">
            Tiếp tục
          </button>
        </div>
      </form>
    </JarvisFormStyle>
  );
}
