import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Page from 'components/Page'
import {withFirebase} from 'components/Firebase'
import { Route , Switch } from 'react-router-dom'
import {Row , Col} from 'reactstrap'
import { UserCard } from 'components/Card'
import BookingForm from 'components/BookingForm'


class BookingPage extends Component {

    state = {
        user: null,
        loading: true,
    }

    componentDidMount = () => {
        this.setState({ loading: true });
        this.props.firebase.user(this.props.match.params.id).on('value', snapshot => {
          const usersObject = snapshot.val();
          this.setState({
            user: usersObject,
            loading: false,
          });
        });
    }

    render() {
        const {user, loading} = this.state
        return (
            <Page>
                {loading && <div>Loading</div>}
                {user && (
                    <Row>
                        <Col lg={6} md={6} sm={12}>
                            <UserCard
                            //   avatar={}
                              title={user.firstName+" "+user.lastName}
                              subtitle={user.username}
                              text={user.category}
                              style={{
                                height: 300,
                              }}>

                            </UserCard>
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                            <BookingForm coachId={user.uid}/>
                        </Col>
                    </Row>
                )}
                </Page>
        )
    }
}

export default withFirebase(BookingPage);