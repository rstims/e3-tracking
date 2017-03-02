import React from 'react';
import {Route, IndexRoute} from 'react-router';


import App from './components/App';
import Tracking from './components/Tracking';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import requireAuth from './utils/requireAuth';

export default (

	<Route path="/" component={App} >
		<IndexRoute component={requireAuth(Tracking)} />
		<Route path="register" component={requireAuth(SignupPage)} />
		<Route path="login" component={LoginPage} />
	</Route>

)