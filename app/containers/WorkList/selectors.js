import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the workList state domain
 */

const selectWorkListDomain = state => state.workList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by WorkList
 */

const makeSelectWorkList = () =>
  createSelector(
    selectWorkListDomain,
    substate => substate,
  );

export default makeSelectWorkList;
export { selectWorkListDomain };
