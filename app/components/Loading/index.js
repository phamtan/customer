/**
 *
 * Loading
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import LoadingStyle from './LoadingStyle';

function Loading({ loading }) {
  return (
    <>
      {loading && (
        <LoadingStyle>
          <div className="loadingIcon" />
        </LoadingStyle>
      )}
    </>
  );
}

Loading.propTypes = {
  loading: PropTypes.bool,
};

export default Loading;
