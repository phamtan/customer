/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Check from '@material-ui/icons/CheckCircleOutline';
import StepLabel from '@material-ui/core/StepLabel';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#1598cc',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#1598cc',
    zIndex: 1,
    fontSize: 24,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}
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
              <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <button
        onClick={() => props.history.push('/v2/round1')}
        type="button"
        className="btn btnSubmit"
      >
        Tiếp tục
      </button>
    </JarvisFormStyle>
  );
}
