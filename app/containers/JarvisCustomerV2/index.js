/* eslint-disable react/prop-types */
/**
 *
 * JarvisCustomerV2
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Route } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import makeSelectJarvisCustomerV2 from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import Application from './components/JarvisForm/Application';
import LandingCard from './components/JarvisForm/LandingCard';
import ChooseLimit from './components/JarvisForm/ChooseLimit';
import CompareCard from './components/JarvisForm/CompareCard';
import Login from './components/JarvisForm/Login';
import Otp from './components/JarvisForm/Otp';
import Round1 from './components/JarvisForm/Round1';
import Roun1FillInfo from './components/JarvisForm/Roun1FillInfo';
import WaitingCheckLos from './components/JarvisForm/WaitingCheckLos';
import Round21 from './components/JarvisForm/Round2.1';
import Round22 from './components/JarvisForm/Round2.2';
import Round3 from './components/JarvisForm/Round3.2';
import Liveness from './components/JarvisForm/Liveness';
import LivenessGuiline from './components/JarvisForm/LivenessGuiline';
import ChooseDocument from './components/JarvisForm/ChooseDocument';
import RegisCardDone from './components/JarvisForm/RegisCardDone';
import Round2OCR from './components/JarvisForm/Round2OCR';
import Round2OCRBack from './components/JarvisForm/Round2OCRBack';
import RejectCustomer from './components/JarvisForm/RejectCustomer';
import UploadDocument from './components/JarvisForm/UploadDocument';
import CongratLimit from './components/JarvisForm/CongratLimit';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  progressStyle: {
    width: '64px',
    height: '64px',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function JarvisCustomerV2(props) {
  useInjectReducer({ key: 'jarvisCustomerV2', reducer });
  useInjectSaga({ key: 'jarvisCustomerV2', saga });
  const classes = useStyles();

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    props.dispatch(Actions.callapi());
    window.scrollTo(0, 0);
  }, []);

  const { vertical, horizontal, open, message, severity } = state;

  const handleShoMessage = newState => {
    setState({ open: true, ...newState });
  };

  const handleCloseMessage = () => {
    setState({ ...state, open: false });
  };

  const handleClose = () => {
    setLoading(false);
  };

  return (
    <div>
      {/* <Application {...props} /> */}
      <Route exact path="/v2">
        <Application
          {...props}
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
        />
      </Route>
      <Route exact path="/v2/landing">
        <LandingCard
          {...props}
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
        />
      </Route>
      <Route exact path="/v2/choose-limit">
        <ChooseLimit
          {...props}
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
        />
      </Route>
      <Route exact path="/v2/compare">
        <CompareCard
          {...props}
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
        />
      </Route>
      <Route exact path="/v2/liveness-guiline">
        <LivenessGuiline
          {...props}
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
        />
      </Route>
      <Route exact path="/v2/liveness">
        <Liveness
          {...props}
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
        />
      </Route>
      <Route exact path="/v2/ocr-guideline">
        <ChooseDocument
          {...props}
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
        />
      </Route>
      <Route exact path="/v2/ocr-front">
        <Round2OCR
          {...props}
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
        />
      </Route>
      <Route exact path="/v2/ocr-back">
        <Round2OCRBack
          {...props}
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
        />
      </Route>
      <Route exact path="/v2/login">
        <Login
          {...props}
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
        />
      </Route>
      <Route exact path="/v2/otp">
        <Otp
          {...props}
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
        />
      </Route>
      <Route exact path="/v2/begin">
        <Round1
          {...props}
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
        />
      </Route>
      <Route exact path="/v2/round1">
        <Roun1FillInfo
          {...props}
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
        />
      </Route>
      <Route exact path="/v2/waiting">
        <WaitingCheckLos
          {...props}
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
        />
      </Route>
      <Route exact path="/v2/regis-done">
        <RegisCardDone
          {...props}
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
        />
      </Route>
      <Route exact path="/v2/round2-1">
        <Round21
          {...props}
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
        />
      </Route>
      <Route exact path="/v2/round2-2">
        <Round22
          {...props}
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
        />
      </Route>
      <Route exact path="/v2/checklitmit-done">
        <CongratLimit
          {...props}
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
        />
      </Route>
      <Route exact path="/v2/round3">
        <Round3
          {...props}
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
        />
      </Route>
      <Route exact path="/v2/document">
        <UploadDocument
          {...props}
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
        />
      </Route>
      <Route exact path="/v2/reject">
        <RejectCustomer
          {...props}
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
        />
      </Route>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={handleCloseMessage}
        message={message}
        key={vertical + horizontal}
        autoHideDuration={6000}
        severity={severity}
      >
        <Alert onClose={handleCloseMessage} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <Backdrop
        className={classes.backdrop}
        open={props.jarvisCustomerV2.loading}
        onClick={handleClose}
      >
        <CircularProgress
          color="inherit"
          className={classes.progressStyle}
          size={64}
        />
      </Backdrop>
    </div>
  );
}

JarvisCustomerV2.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  jarvisCustomerV2: makeSelectJarvisCustomerV2(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(JarvisCustomerV2);
