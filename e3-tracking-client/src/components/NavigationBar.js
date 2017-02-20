import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';


class NavigationBar extends React.Component {
 	logout(e){
 		e.preventDefault();
 		this.props.logout();
 	}
	render() {
		const { isAuthenticated } = this.props.auth;

		const userLinks = (
			<ul className="nav navbar-nav navbar-right">
				<li><Link to="/register"><span className="glyphicon glyphicon-user"></span> Register</Link></li>
				<li><a onClick={this.logout.bind(this)} href="#"><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
			</ul>
		);

		const guestLinks = (
			<ul className="nav navbar-nav navbar-right">
				<li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
			</ul>
		);

		return (
		  <nav className="navbar navbar-inverse">
		    <div className="container-fluid">
		      <div className="navbar-header">
		      	<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#e3-navbar">
	      	        <span className="icon-bar"></span>
	      	        <span className="icon-bar"></span>
	      	        <span className="icon-bar"></span>                        
	      	     </button>
		        <Link to="/" className="navbar-brand">e3 Tracking</Link>
		      </div>

		      <div id="e3-navbar" className="collapse navbar-collapse">
		      	{ isAuthenticated ? userLinks : guestLinks }
		      </div>
		    </div>
		  </nav>
		);
	}
}

NavigationBar.propTypes = {
	auth: React.PropTypes.object.isRequired,
	logout: React.PropTypes.func.isRequired
}

function mapStateToProps(state){
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, { logout })(NavigationBar);