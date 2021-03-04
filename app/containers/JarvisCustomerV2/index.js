/**
 *
 * JarvisCustomerV2
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Route, Link } from 'react-router-dom';
import makeSelectJarvisCustomerV2 from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
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

export function JarvisCustomerV2(props) {
  useInjectReducer({ key: 'jarvisCustomerV2', reducer });
  useInjectSaga({ key: 'jarvisCustomerV2', saga });

  useEffect(() => {
    props.dispatch(Actions.callapi());
  }, []);

  return (
    <div>
      {/* <Application {...props} /> */}
      <Route exact path="/v2">
        <Application {...props} />
      </Route>
      <Route exact path="/v2/landing">
        <LandingCard {...props} />
      </Route>
      <Route exact path="/v2/choose-limit">
        <ChooseLimit {...props} />
      </Route>
      <Route exact path="/v2/compare">
        <CompareCard {...props} />
      </Route>
      <Route exact path="/v2/liveness-guiline">
        <LivenessGuiline {...props} />
      </Route>
      <Route exact path="/v2/liveness">
        <Liveness {...props} />
      </Route>
      <Route exact path="/v2/ocr-guideline">
        <ChooseDocument {...props} />
      </Route>
      <Route exact path="/v2/ocr-front">
        <Round2OCR {...props} />
      </Route>
      <Route exact path="/v2/ocr-back">
        <Round2OCRBack {...props} />
      </Route>
      <Route exact path="/v2/login">
        <Login {...props} />
      </Route>
      <Route exact path="/v2/otp">
        <Otp {...props} />
      </Route>
      <Route exact path="/v2/begin">
        <Round1 {...props} />
      </Route>
      <Route exact path="/v2/round1">
        <Roun1FillInfo {...props} />
      </Route>
      <Route exact path="/v2/waiting">
        <WaitingCheckLos {...props} />
      </Route>
      <Route exact path="/v2/regis-done">
        <RegisCardDone {...props} />
      </Route>
      <Route exact path="/v2/round2-1">
        <Round21 {...props} />
      </Route>
      <Route exact path="/v2/round2-2">
        <Round22 {...props} />
      </Route>
      <Route exact path="/v2/round3">
        <Round3 {...props} />
      </Route>
      <Route exact path="/v2/reject">
        <RejectCustomer {...props} />
      </Route>
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
