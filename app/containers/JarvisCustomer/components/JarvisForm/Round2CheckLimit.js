import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Spinner from 'react-bootstrap/Spinner';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';

const schema = yup.object().shape({
  auth_email: yup
    .string()
    .email('This field must be a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function Round2Confirm(props) {
  const { register, handleSubmit, errors } = useForm({
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  function onSubmitForm() {}

  const [checkLimit, setCheckLimit] = useState(1);
  useEffect(() => {
    setTimeout(() => {
      setCheckLimit(checkLimit + 1);
    }, 1000);
  });

  return (
    <JarvisFormStyle>
      <Header className="header" />
      <div className="roundTitle">BƯỚC 2:</div>
      <div className="roundName">KIỂM TRA THÔNG TIN CƠ BẢN</div>
      <div className="roundNamesub">Đang kiểm tra hạn mức</div>
      <div className="roundNameDescription">
        Việc kiểm tra thông tin sẽ giúp bạn hoàn thành hồ sơ nhanh hơn. Quá
        trình này sẽ diễn ra trong vài phút
      </div>
      <iframe
        style={{ width: '90%', borderRadius: '8px', marginTop: '15px' }}
        height="250"
        src="https://www.youtube.com/embed/Fmn6yWkalU0?ecver=2"
        frameBorder="0"
        allowFullScreen
      />
      {checkLimit < 600 && (
        <div className="checkLimitContainer">
          <div className="waitingTitle">
            <span>Đang chờ tới lượt {checkLimit}/600</span>
            <Spinner
              animation="border"
              size="sm"
              variant="success"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
          <div className="waitingDescription">
            Chúng tôi đang xử lý nhiều hồ sơ cùng lúc, Kết quả kiểm tra sẽ thông
            tin sẽ thông tin đến bạn ngay
          </div>
          <div className="waitingNote">
            Nếu bạn tắt trình duyệt lúc này sẽ phải đăng nhập lại . Tuy nhiên
            bạn vẫn có thể sử dụng các ứng dụng khác trong thời gian chờ.{' '}
            <span onClick={() => props.setStep(999)}>Thông tin đến bạn!</span>
          </div>
        </div>
      )}
      {checkLimit > 600 && (
        <>
          <div className="checkLimitDone">
            <div className="title">Đã kiểm tra xong hạn mức </div>
            <div className="text">
              Bạn đã có hạn mức, nhấn tiếp tục để đi tiếp
            </div>
          </div>
          <button
            onClick={() => props.setStep(999)}
            type="button"
            className="btn btnSubmit"
          >
            Tiếp tục
          </button>
        </>
      )}
    </JarvisFormStyle>
  );
}
