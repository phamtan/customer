import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the jarvisCustomer state domain
 */

const selectJarvisCustomerDomain = state =>
  state.jarvisCustomer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by JarvisCustomer
 */

const makeSelectJarvisCustomer = () =>
  createSelector(
    selectJarvisCustomerDomain,
    substate => substate,
  );

export default makeSelectJarvisCustomer;
export { selectJarvisCustomerDomain };
