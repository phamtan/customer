/* eslint-disable react/prop-types */
import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import clsx from 'clsx';
import logo from 'images/logo-vp.svg';

const useStyles = makeStyles(theme => ({
  headerContainer: {
    width: '100%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperRoot: {
    width: '100%',
    maxWidth: '470px',
    margin: 'auto',
    color: '#028547',
    backgroundColor: 'white',
    border: '1px solid white',
    height: '38px',
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
    backgroundColor: 'white',
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
  menuIcon: {
    marginRight: '16px',
  },
}));

export default function Header(props) {
  const steps = getSteps();
  const classes = useStyles();
  const [activeStep] = React.useState(0);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  function gotoLogin() {
    props.history.push('/v2/login');
  }

  function gotoHome() {
    props.history.push('/v2');
  }

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button key="login" onClick={() => gotoLogin()}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem button key="home" onClick={() => gotoHome()}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Trang chủ" />
        </ListItem>
      </List>
    </div>
  );

  function getSteps() {
    return ['Bắt đầu', 'Thông tin', 'Hoàn thành'];
  }
  return (
    <div className={classes.headerContainer}>
      <div className={props.className}>
        <img src={logo} alt="logo" />
        <MenuIcon
          className={classes.menuIcon}
          onClick={toggleDrawer('left', true)}
        />
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
      <Drawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </Drawer>
    </div>
  );
}
