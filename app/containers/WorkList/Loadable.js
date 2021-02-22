/**
 *
 * Asynchronously loads the component for WorkList
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
