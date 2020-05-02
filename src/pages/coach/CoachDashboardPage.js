import React, { Component } from 'react'
import * as ROLES from 'constants/roles'
import {NumberWidget} from "components/Widget"
import {withAuthorization} from 'components/Session'
import Page from 'components/Page'
import {compose} from 'recompose'
import {withFirebase} from 'components/Firebase'
import {UserCard} from 'components/Card'
import PropTypes from 'utils/propTypes';
import classNames from 'classnames';
import { Col, Row, Card, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';
import Avatar from 'components/Avatar';

class CoachDashboardPage extends Component {
    render() {
        return (
            <Page className="DashboardPage"
            title="Dashboard"
            breadcrumbs={[{ name: 'Dashboard', active: true }]}
            >
                 <Row>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Total Profit"
              subtitle="This month"
              number="9.8k"
              color="secondary"
              progress={{
                value: 75,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Monthly Visitors"
              subtitle="This month"
              number="5,400"
              color="secondary"
              progress={{
                value: 45,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="New Users"
              subtitle="This month"
              number="3,400"
              color="secondary"
              progress={{
                value: 90,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Bounce Rate"
              subtitle="This month"
              number="38%"
              color="secondary"
              progress={{
                value: 60,
                label: 'Last month',
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={3} md={6} sm={6} xs={12}>
            <Card inverse className="bg-gradient-theme">
            <CardBody className="d-flex justify-content-center align-items-center flex-column">
            <Avatar src='' size={40} className="mb-2" />
            <CardTitle>NAME</CardTitle>
            <CardSubtitle>LAST NAME</CardSubtitle>
            <CardText>
              DESCRIPTION
              <br/>
              <br/>
        </CardText>
      </CardBody>
            </Card>
          </Col>
          <Col lg={3} md={6} sm={6} xs={12}>
          <Card inverse className="bg-gradient-theme">
            <CardBody className="d-flex justify-content-center align-items-center flex-column">
            <Avatar src='' size={40} className="mb-2" />
            <CardTitle>NAME</CardTitle>
            <CardSubtitle>LAST NAME</CardSubtitle>
            <CardText>
              DESCRIPTION
              <br/>
              <br/>
        </CardText>
      </CardBody>
            </Card>
          </Col>
          <Col lg={3} md={6} sm={6} xs={12}>
          <Card inverse className="bg-gradient-theme">
            <CardBody className="d-flex justify-content-center align-items-center flex-column">
            <Avatar src='' size={40} className="mb-2" />
            <CardTitle>NAME</CardTitle>
            <CardSubtitle>LAST NAME</CardSubtitle>
            <CardText>
              DESCRIPTION
              <br/>
              <br/>
        </CardText>
      </CardBody>
            </Card>
          </Col>
          <Col lg={3} md={6} sm={6} xs={12}>
          <Card inverse className="bg-gradient-theme">
            <CardBody className="d-flex justify-content-center align-items-center flex-column">
            <Avatar src='' size={40} className="mb-2" />
            <CardTitle>NAME</CardTitle>
            <CardSubtitle>LAST NAME</CardSubtitle>
            <CardText>
              DESCRIPTION
              <br/>
              <br/>
        </CardText>
      </CardBody>
            </Card>
          </Col>
        </Row>


            </Page>
        )
    }
}

const condition = authUser => authUser && !!authUser.role=="COACH";

// export default compose(
//   withAuthorization(condition),
//   withFirebase,
// )(CoachDashboardPage);
export default CoachDashboardPage;