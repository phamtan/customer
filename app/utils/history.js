import { createBrowserHistory } from 'history';
const basename = process.env.PUBLIC_PATH;
const history = createBrowserHistory({ basename });
// const history = createBrowserHistory();
export default history;
