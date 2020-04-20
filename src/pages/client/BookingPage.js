import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Page from 'components/Page'
import { Row, Col, CardLink, CardBody } from 'reactstrap'
import { UserCard } from 'components/Card'

export default class BookingPage extends Component {
    static propTypes = {
        prop: PropTypes
    }

    state = {userlist:[
        {   uid: '0001',
            firstName: 'Brad',
            lastName: 'Pitt',
            username: 'bradpitt01',
            description: 'i\'m Brad Pitt bitch'},
            {uid: '0002',   
            firstName: 'John',
            lastName: 'Snow',
            username: 'johnsnow02',
            description: 'i\'m John Snow Mother-F'},
            {   uid: '0003',
                firstName: 'Fitz',
            lastName: 'Patrick',
            username: 'fitzpatrick03',
            description: 'i\'m not Fitz bitch'},
            {   uid: '0004',
            firstName: 'Brad',
            lastName: 'Pitt',
            username: 'user04',
            description: 'i\'m Brad Pitt bitch'},
            {uid: '0005',   
            firstName: 'John',
            lastName: 'Snow',
            username: 'user05',
            description: 'i\'m John Snow Mother-F'},
            {   uid: '0006',
                firstName: 'Fitz',
            lastName: 'Patrick',
            username: 'user06',
            description: 'i\'m not Fitz bitch'},
            {   uid: '0007',
                firstName: 'Fitz',
            lastName: 'Patrick',
            username: 'user07',
            description: 'i\'m not Fitz bitch'},

    ]}

    renderUsers = () => {
            const userlist = this.state.userlist;
            let grid=[];
            let children = [];
        for (let index = 0; index < userlist.length; index++) {
                let user = userlist[index];
                children.push(
                    <Col lg={3} md={6} sm={6} xs={12}>
                        <UserCard
                            title={user.firstName+' '+user.lastName}
                            subtitle={user.username}
                            text={user.description}
                            >
                            <CardBody>
                                <CardLink href={'client/booking/'+user.uid}>
                                    Book
                                </CardLink>
                            </CardBody>
                        </UserCard>
                    </Col>
            )                
        }

        return (<Row>{children}</Row>);
    }

    render() {
        return (
            <Page>
                {this.renderUsers()}
            </Page>
        )
    }
}
