/**
 *
 * JarvisCustomer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectJarvisCustomer from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Application from './components/JarvisForm/Application';

export function JarvisCustomer(props) {
  useInjectReducer({ key: 'jarvisCustomer', reducer });
  useInjectSaga({ key: 'jarvisCustomer', saga });

  return (
    <div>
      <Helmet>
        <title>JarvisCustomer</title>
        <meta name="description" content="Description of JarvisCustomer" />
      </Helmet>

      <Application {...props} />
    </div>
  );
}

JarvisCustomer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  jarvisCustomer: makeSelectJarvisCustomer(),
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

export default compose(withConnect)(JarvisCustomer);
