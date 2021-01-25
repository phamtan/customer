/* eslint-disable react/prop-types */
import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';

function getSteps() {
  return [
    'Chụp giấy tờ tùy thân mặt trước',
    'Chụp giấy tờ tùy thân mặt sau',
    'Thực hiện hành động được yêu cầu trước camera',
  ];
}

export default function Round2OCRGuide(props) {
  const steps = getSteps();

  return (
    <JarvisFormStyle>
      <Header className="header" step={2} />
      <div className="roundTitle">BƯỚC 1:</div>
      <div className="roundName">THÔNG TIN CƠ BẢN</div>
      <div className="roundNamesub">
        Nhận diện khuôn mặt và giấy tờ tùy thân
      </div>
      <div className="roundNameDescription">
        Để thông tin nhận diện được chính xác! Bạn vui lòng thực hiện đầy đủ
        theo yêu cầu đưa ra:
      </div>
      <div className="ocrguideContainer">
        <div className="ocrTitle">Các bước cần thực hiện</div>
        <Stepper activeStep={3} orientation="vertical">
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <button
        onClick={() => props.setStep(3)}
        type="button"
        className="btn btnSubmit"
      >
        Tiếp tục
      </button>
    </JarvisFormStyle>
  );
}
