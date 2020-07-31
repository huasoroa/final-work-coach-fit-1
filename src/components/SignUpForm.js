import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as ROLES from 'constants/roles';
const INITIAL_STATE = {
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
  role: '',
};
class SignUpForm extends React.Component {

  state = {...INITIAL_STATE};

  handleSubmit = event => {
    const { username, email, password, firstName, lastName, role } = this.state;
    this.props.firebase.doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            firstName,
            lastName,
            role
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    console.log(event.target.name+": "+event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };


  render() {
    const {
      showLogo,
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      firstNameLabel,
      firstNameInputProps,
      lastNameLabel,
      lastNameInputProps,
      emailLabel,
      emailInputProps,
      roleLabel,
      roleInputProps,
      onLogoClick,
    } = this.props;
    const {
      username,
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      role,
    } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
              onClick={onLogoClick}
            />
          </div>
        )}
        <FormGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <Input {...usernameInputProps} onChange = {this.onChange} value = {username}/>
        </FormGroup>
        <FormGroup>
            <Label for={emailLabel}>{emailLabel}</Label>
            <Input {...emailInputProps} onChange = {this.onChange} value = {email}/>
        </FormGroup>
        <FormGroup>
            <Label for={firstNameLabel}>{firstNameLabel}</Label>
            <Input {...firstNameInputProps} onChange = {this.onChange} value = {firstName}/>
        </FormGroup>
        <FormGroup>
            <Label for={lastNameLabel}>{lastNameLabel}</Label>
            <Input {...lastNameInputProps} onChange = {this.onChange} value = {lastName}/>
        </FormGroup>
        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input {...passwordInputProps} onChange = {this.onChange} value = {password}/>
        </FormGroup>
          <FormGroup>
            <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
            <Input {...confirmPasswordInputProps} onChange = {this.onChange} value = {confirmPassword}/>
          </FormGroup>
          <FormGroup>
            <Label for={roleLabel}>{roleLabel}</Label>
            <Input {...roleInputProps} onChange = {this.onChange} value = {role}>
              <option>-</option>
              <option>{ROLES.CLIENT}</option>
              <option>{ROLES.COACH}</option>
            </Input>
          </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />Agree the terms and policy
          </Label>
        </FormGroup>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.handleSubmit}>
              Sign Up
        </Button>

        <h6>Already have an account ? <Link to="login">Log in.</Link></h6>
      </Form>
    );
  }
}


SignUpForm.propTypes = {
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  emailLabel: PropTypes.string,
  emailInputProps: PropTypes.object,
  firstNameLabel: PropTypes.string,
  firstNameInputProps: PropTypes.object,
  lastNameLabel: PropTypes.string,
  lastNameInputProps: PropTypes.object,
  roleLabel: PropTypes.string,
  roleInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

SignUpForm.defaultProps = {
  showLogo: true,
  usernameLabel: 'Username',
  usernameInputProps: {
    name: 'username',
    type: 'text',
    placeholder: 'username',
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    name : 'password',
    type: 'password',
    placeholder: 'your password',
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'confirm your password',
  },
  emailLabel: 'Email',
  emailInputProps:{
      name: 'email',
      type: 'email',
      placeholder: 'your@mail.com',
  },
  firstNameLabel: 'First Name',
  firstNameInputProps: {
      name: 'firstName',
      type: 'text',
      placeholder: 'First Name',
  },
  lastNameLabel: 'Last Name',
  lastNameInputProps: {
      name: 'lastName',
      type: 'text',
      placeholder: 'Last Name',
  },
  roleLabel: 'Role',
  roleInputProps:  {
    name: 'role',
    type: 'select'
  },
  onLogoClick: () => {},
};

export default SignUpForm;
