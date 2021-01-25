/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as yup from 'yup';
import Header from './Header';
import JarvisFormStyle from './JarvisFormStyle';

const schema = yup.object().shape({
  auth_email: yup
    .string()
    .email('This field must be a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function ConfirmDocument(props) {
  const { handleSubmit } = useForm({
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  function onSubmitForm() {}
  const [show, setShow] = useState(false);

  const handleChange = event => {
    if (event.target.value === '2') {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  return (
    <JarvisFormStyle>
      <Header className="header" step={5} />
      <div className="roundTitle">BƯỚC 5:</div>
      <div className="roundName">NỘP HỒ SƠ</div>
      <div className="confirmTitle">
        Hồ sơ của bạn cần bổ sung các giấy tờ bản cứng, bạn muốn sử dụng hình
        thức nào dưới đây để thực hiện?
      </div>
      <form className="formWrapper" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="virtualcardConfirm">
          Bạn muốn chọn nộp hồ sơ như thế nào
        </div>
        <div className="formWrapper">
          <RadioGroup
            aria-label="gender"
            name="gender1"
            onChange={handleChange}
          >
            <FormControlLabel value="1" control={<Radio />} label="Chi nhánh" />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="Nhân viên VPBank hỗ trợ thu hồ sơ"
            />
          </RadioGroup>
          {show && (
            <div className="docRequired">
              <i>
                Với hình thức này, nhân viên của VPBank sẽ liên lạc với bạn
                trong giây lát và sẽ tới gặp bạn để thu hồ sơ. Các giấy tờ cần
                chuẩn bị:
              </i>
              <b>- CMND</b>
              <b>- Bảng sao kê lương</b>
              <b>- Mã số thuế</b>
              <b>- Bản SYLL trích ngang</b>
              <b>- Giấy đăng ký kết hôn</b>
              <b>- Hộ khẩu</b>
            </div>
          )}
          <button
            onClick={() => props.setStep(14)}
            type="button"
            className="btn btnSubmit"
          >
            Tiếp tục
          </button>
        </div>
      </form>
    </JarvisFormStyle>
  );
}
