import React, { Component } from 'react'
import Typography from 'components/Typography'
import Page from 'components/Page'
import { Row, Col, Card, ListGroup, ListGroupItem, CardBody, CardTitle, CardImg, CardHeader, Button} from 'reactstrap'
import Avatar from 'components/Avatar'
import ReviewForm from '../components/ReviewForm'
import {Link} from "react-router-dom"
import ProfileForm from 'components/ProfileForm'


export default class ProfileEditPage extends Component {
    
    render() {
        return (
            <Page title="Profile/Edit" breadcrumbs={[{ name: 'Profile/Edit', active: true }]} >
                <ProfileForm id={this.props.match.params.id}></ProfileForm>
            </Page>
        )
    }
}
