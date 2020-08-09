import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Page from 'components/Page'
import {withFirebase} from 'components/Firebase'
import { Route , Switch } from 'react-router-dom'
import {Row , Col, ListGroup, ListGroupItem} from 'reactstrap'
import { UserCard } from 'components/Card'
import BookingForm from 'components/BookingForm'

const BookingFormComp = withFirebase(BookingForm)
class BookingPage extends Component {

    state = {
        user: null,
        reviews: null,
        loading: true,
    }

    componentDidMount = () => {
        this.setState({ loading: true });
        this.props.firebase.user(this.props.match.params.id).on('value', snapshot => {
          const usersObject = snapshot.val();
          const usersDone = {uid: this.props.match.params.id,
                            ...usersObject}
          this.setState({
            user: usersDone,
          });
        });
        this.props.firebase.reviews(this.props.match.params.id).on('value', snapshot => {
            const reviewsObject = snapshot.val()
            if (reviewsObject!==null)
            {
            this.setState({
                reviews: reviewsObject,
                loading: false
            })}
        })
    }

    render() {
        const {user, loading, reviews} = this.state
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
                            <BookingFormComp coachId={user.uid}/>
                        </Col>
                    </Row>
                )}
                    {/* {reviews && (
                        <Row>
                            <ListGroup>
                                {reviews.map(review =>(
                                    <ListGroupItem>
                                        <ListGroup>
                                            <ListGroupItem>
                                                Rating: {review.rating}/10
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                Comment : {review.text}
                                            </ListGroupItem>
                                        </ListGroup>
                                    </ListGroupItem>
                                )
                                )}
                            </ListGroup>
                        </Row>
                    )} */}
                </Page>
        )
    }
}

export default withFirebase(BookingPage);