/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';

const schema = yup.object().shape({
  hasVirtualCard: yup.string().required('Bạn chưa lựa chọn đăng kí thẻ ảo'),
});

export default function Round1(props) {
  const { handleSubmit, errors, control } = useForm({
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  function onSubmitForm() {
    props.setStep(12);
  }

  return (
    <JarvisFormStyle>
      <Header className="header" step={4} />
      <div className="roundTitle">BƯỚC 4:</div>
      <div className="roundName">CHỌN LOẠI THẺ</div>
      <div className="confirmTitle">Mở thẻ ảo</div>
      <form className="formWrapper" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="virtualcardConfirm">
          Bạn có muốn mở và sử dụng thẻ ảo không?
        </div>
        <div className="formWrapper">
          {/* <div className="radioWrapper">
						<input
							className="form-control radioControl"
							name="hasVirtualCard"
							type="radio"
							ref={register}
						/> Có
						</div>
					<div className="radioWrapper">
						<input
							className="form-control radioControl"
							name="hasVirtualCard"
							type="radio"
							ref={register}
						/> Tôi sẽ đăng ký sau

					</div> */}
          <Controller
            name="hasVirtualCard"
            control={control}
            render={props => (
              <RadioGroup aria-label="gender" value={props.value}>
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Có"
                  onChange={props.onChange}
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Tôi sẽ đăng ký sau"
                  onChange={props.onChange}
                />
              </RadioGroup>
            )}
          />

          <div>
            {errors.hasVirtualCard && (
              <span className="formError">{errors.hasVirtualCard.message}</span>
            )}
          </div>
          <div className="confirmNote">
            <div>- Thẻ ảo là thẻ kỹ thuật số mà không phải thẻ cứng</div>
            <div>- Thẻ ảo có hạn mức riêng biệt so với thẻ chính</div>
            <div>- Thẻ ảo có chức năng như thẻ chính</div>
          </div>
          <button type="submit" className="btn btnSubmit">
            Tiếp tục
          </button>
        </div>
      </form>
    </JarvisFormStyle>
  );
}
