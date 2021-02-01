/* eslint-disable react/prop-types */
import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import logo from 'images/logo-vp.svg';

const useStyles = makeStyles(theme => ({
  stepperRoot: {
    width: '100%',
    color: '#028547',
    backgroundColor: '#f7f8f8',
    border: '1px solid white',
    height: '38px',
    marginLeft: '0px',
    marginTop: '16px',
    [theme.breakpoints.down('xs')]: {
      padding: '0px',
    },
    
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  step: {
    '&$completed': {
      color: 'lightgreen',
    },
    '&$active': {
      color: '#028547',
    },
  },
  active: {
    color: '#028547',
  },
  stepperBackground: {
    backgroundColor: '#f7f8f8',
  },
  labelContainer: {
    '&$alternativeLabel': {
      marginTop: 0,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px',
    },
  },
  labelStyle: {
    fontSize: '12px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '10px',
    },
  },
}));

export default function Header(props) {
  const steps = getSteps();
  const classes = useStyles();
  const [activeStep] = React.useState(0);
  function getSteps() {
    return ['Bắt đầu', 'Thông tin', 'Hoàn thành'];
  }
  return (
    <>
      <div className={props.className}>
        <img src={logo} alt="logo" />
      </div>
      {props.showStep && (
        <Stepper
          classes={{
            root: classes.stepperRoot,
          }}
          activeStep={activeStep}
          className={classes.stepperRoot}
        >
          {steps.map(label => (
            <Step key={label}>
              <StepLabel
                classes={{
                  alternativeLabel: classes.alternativeLabel,
                  labelContainer: classes.labelContainer,
                  label: classes.labelStyle,
                }}
                StepIconProps={{
                  classes: {
                    root: classes.step,
                    completed: classes.completed,
                    active: classes.active,
                    disabled: classes.disabled,
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
    </>
  );
}
