import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import classname from 'classnames';
import TextFieldGroup from '../common/TextFieldGroup';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty'; 

function validateInput(data){
	
	let errors = {};

	if(Validator.isNull(data.username)){
		errors.username = 'This field is required';
	}

	if(!Validator.isEmail(data.email)){
		errors.email = 'Email is invalid';
	}

	if(Validator.isNull(data.email)){
		errors.email = 'This field is required';
	}

	if(Validator.isNull(data.password)){
		errors.password = 'This field is required';
	}

	if(Validator.isNull(data.passwordConfirmation)){
		errors.passwordConfirmation = 'This field is required';
	}

	if(!Validator.equals(data.password, data.passwordConfirmation)){
		errors.passwordConfirmation = 'Passwords must match';
	}

	if(Validator.isNull(data.timezone)){
		errors.timezone = 'This field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}


class SignupForm extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			username: '', 
			email:'',
			password: '',
			passwordConfirmation: '',
			timezone: '',
			errors: {},
			isLoading: false,
			invalid: false
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.checkUserExists = this.checkUserExists.bind(this);
	}

	onChange(e){
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	checkUserExists(e){
		const field = e.target.name;
		const val = e.target.value;

		if(val !== ''){
			this.props.isUserExists(val).then(res => {
				let errors = this.state.errors;
				let invalid;
				if(res.data.user){
					errors[field] = 'There is user with such ' + field;
					invalid = true;
				} else {
					errors[field] = '';
					invalid = false;
				}
				this.setState({ errors, invalid });
			});

		}
	}

	onSubmit(e){
		e.preventDefault();

		if(this.isValid()){
			this.setState({ errors: {}, isLoading: true });
			this.props.userSignupRequest(this.state).then(
				() => {
					this.props.addFlashMessage({
						type: 'success',
						text: 'You signed up successfully. Welcome!'
					})
					this.context.router.push('/');
				},
				(err) => this.setState({ errors: err.response.data, isLoading: false})
			);
		}
		
		
	}

	isValid(){
		const { errors, isValid } = validateInput(this.state);

		if(!isValid){
			this.setState({ errors });
		}

		return isValid;
	}

	render(){
		const { errors } = this.state;
		const options = map(timezones, (val, key) => 
			<option key={val} value={val}>{key}</option>
		)

		return (
			<form onSubmit={this.onSubmit}>
				<h1>Login Form</h1>

				<TextFieldGroup 
					error={errors.username}
					label="Username"
					onChange={this.onChange}
					checkUserExists={this.checkUserExists}
					value={this.state.username}
					field="username"
				/>
				<TextFieldGroup 
					error={errors.email}
					label="Email"
					onChange={this.onChange}
					checkUserExists={this.checkUserExists}
					value={this.state.email}
					field="email"
				/>
				<TextFieldGroup 
					error={errors.password}
					label="Password"
					onChange={this.onChange}
					value={this.state.password}
					field="password"
					type="password"
				/>
				<TextFieldGroup 
					error={errors.passwordConfirmation}
					label="Password Confirmation"
					onChange={this.onChange}
					value={this.state.passwordConfirmation}
					field="passwordConfirmation"
					type="password"
				/>
				<div className={classname("form-group", {'has-error': errors.timezone})}>
					<label className="control-label">Timezone</label>
					<select
						className="form-control"
						name="timezone"
						onChange={this.onChange}
						value={this.state.timezone}
					>
						<option value="" disabled>Choose Your Timezone</option>
						{options}
					</select>
					{errors.timezone && <span className="help-block">{errors.timezone}</span>}
				</div>
				<div className="form-group">
					<button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">
						Sign up
					</button>
				</div>
			</form>
		);
	}
}

SignupForm.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired,
	isUserExists: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default SignupForm;

