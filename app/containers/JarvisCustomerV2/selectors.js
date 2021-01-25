import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the jarvisCustomerV2 state domain
 */

const selectJarvisCustomerV2Domain = state =>
  state.jarvisCustomerV2 || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by JarvisCustomerV2
 */

const makeSelectJarvisCustomerV2 = () =>
  createSelector(
    selectJarvisCustomerV2Domain,
    substate => substate,
  );

export default makeSelectJarvisCustomerV2;
export { selectJarvisCustomerV2Domain };
