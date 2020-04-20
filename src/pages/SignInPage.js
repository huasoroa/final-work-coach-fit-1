import SignInForm from 'components/SignInForm';
import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import { withFirebase } from '../components/Firebase';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

const SignInComp = compose(
  withRouter,
  withFirebase,
)(SignInForm);

class SignInPage extends React.Component { 
  

  handleLogoClick = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Col md={6} lg={4}>
          <Card body>
            <SignInComp/>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default SignInPage