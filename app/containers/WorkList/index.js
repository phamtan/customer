/**
 *
 * WorkList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import WorkListComponent from './components/WorkList';
import makeSelectWorkList from './selectors';
import reducer from './reducer';
import saga from './saga';

export function WorkList() {
  useInjectReducer({ key: 'workList', reducer });
  useInjectSaga({ key: 'workList', saga });

  return <WorkListComponent />;
}

const mapStateToProps = createStructuredSelector({
  workList: makeSelectWorkList(),
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

export default compose(withConnect)(WorkList);
