/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import CompanyLayout from 'layouts/CompanyLayout';
import ApplicantLayout from 'layouts/ApplicantLayout';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Login from 'containers/Login/Loadable';
import JarvisCustomer from 'containers/JarvisCustomer/Loadable';
import JarvisCustomerV2 from 'containers/JarvisCustomerV2/Loadable';
import GlobalStyle from '../../global-styles';
import reducer from './reducer';
import saga from './saga';

export default function App() {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });

  return (
    <div>
      <Helmet
        titleTemplate="React Starterkit, The Creative Network"
        defaultTitle="React Starterkit, The Creative Network"
      >
        <meta
          name="description"
          content="React Starterkit, The Creative Network"
        />
      </Helmet>
      <ReactNotification />
      <Switch>
        <Route path="/" exact component={JarvisCustomer} />
        <Route path="/v2" component={JarvisCustomerV2} />
        {/* <Route path="/customer" component={JarvisCustomerV2} /> */}
        <Route path="/company" component={CompanyLayout} />
        <Route path="/applicant" component={ApplicantLayout} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
