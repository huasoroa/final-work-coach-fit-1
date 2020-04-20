import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

const INITIAL_STATE = {
  username: '',
  password: '',
  error: '',
}
class SignInForm extends React.Component {

  state = INITIAL_STATE;

  handleSubmit = event => {
    const {username, password} = this.state;
    this.props.firebase
    .doSignInWithEmailAndPassword(username,password) 
      // this.setState(...INITIAL_STATE);
      console.log('before push');
      this.props.history.push("/");                  
      console.log('after push');
    // .catch(error => {
    //   this.setState({ error });
    // });
    // event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.name+': '+event.target.value)
  };
  
  render() {
    const {
      showLogo,
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      onLogoClick,
    } = this.props;
    const {
      username,
      password,
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
          <Input {...usernameInputProps} onChange={this.onChange} value={username}/>
        </FormGroup>
        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input {...passwordInputProps}  onChange={this.onChange} value={password}/>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />
            Remember me
          </Label>
        </FormGroup>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.handleSubmit}>
              LOGIN
        </Button>
        <h6>Don't have an account ? <Link to="signup">Sign up.</Link></h6>
      </Form>

    );
  }
}


SignInForm.propTypes = {
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

SignInForm.defaultProps = {
  showLogo: true,
  usernameLabel: 'Email',
  usernameInputProps: {
    name: 'username',
    type: 'text',
    placeholder: 'your email',

  },
  passwordLabel: 'Password',
  passwordInputProps: {
    name: 'password',
    type: 'password',
    placeholder: 'your password',
  },
  onLogoClick: () => {},
};

export default SignInForm;
