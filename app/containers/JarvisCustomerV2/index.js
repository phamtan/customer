/**
 *
 * JarvisCustomerV2
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectJarvisCustomerV2 from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Application from './components/JarvisForm/Application';

export function JarvisCustomerV2(props) {
  useInjectReducer({ key: 'jarvisCustomerV2', reducer });
  useInjectSaga({ key: 'jarvisCustomerV2', saga });

  return (
    <div>
      <Application {...props} />
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
