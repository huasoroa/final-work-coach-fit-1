import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Page from 'components/Page'
import {withFirebase} from 'components/Firebase'
import { Route , Switch } from 'react-router-dom'
import {Row , Col} from 'reactstrap'


export default class BookingPage extends Component {

    render() {
        return (
            
                <Page>
                    <Row>
                        <Col lg={6} md={6} sm={12}>
                            
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                            
                        </Col>
                    </Row>
                </Page>
        )
    }
}
