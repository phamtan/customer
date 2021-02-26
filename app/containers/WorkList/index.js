/* eslint-disable react/prop-types */
/**
 *
 * WorkList
 *
 */

import React, { useEffect } from 'react';
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
import * as Actions from './actions';

export function WorkList(props) {
  useInjectReducer({ key: 'workList', reducer });
  useInjectSaga({ key: 'workList', saga });

  useEffect(() => {
    props.dispatch(
      Actions.getWorkList({
        pageNumber: 0,
        pageSize: 20,
        fromDate: '2021/02/01',
        toDate: '2021/03/31',
      }),
    );
  }, []);

  return <WorkListComponent {...props} />;
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
