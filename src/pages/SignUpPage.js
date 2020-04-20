import SignUpForm from 'components/SignUpForm';
import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import { withFirebase } from 'components/Firebase';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';

const SignUpFormComp = compose(
  withRouter,
  withFirebase,
)(SignUpForm);

class SignUpPage extends React.Component {
  


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
            <SignUpFormComp/>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default SignUpPage;