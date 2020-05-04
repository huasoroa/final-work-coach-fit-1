import React, { Component } from 'react'
import Typography from 'components/Typography'
import Page from 'components/Page'
import {Row, Col, Card, ListGroup, ListGroupItem, CardBody, CardTitle } from 'reactstrap'

export default class ProfilePage extends Component {
    render() {
        return (
            <Page title="Profile" breadcrumbs={[{ name: 'Profile', active: true }]} >
                  <Row>
                <Typography type='h1'>FirstName  LastName</Typography>
                  </Row>
                <Row>
                    <Col>
                    <Card>
                    <CardBody >
                            <CardTitle>Something</CardTitle>
                            </CardBody>
                            <ListGroup>
                                <ListGroupItem>Age: </ListGroupItem>
                                <ListGroupItem>Sports: </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col>
                    <Card>
                    <CardBody>
                            <ListGroup>
                                <ListGroupItem>Age: </ListGroupItem>
                            </ListGroup>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Page>
        )
    }
}
