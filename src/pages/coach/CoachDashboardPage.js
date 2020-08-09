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
import { Col, Row, Card, CardTitle, CardSubtitle, CardText, CardBody, ListGroup, ListGroupItem } from 'reactstrap';
import Avatar from 'components/Avatar';

class CoachDashboardPage extends Component {

  state = {
    bookings : [],
    loading: false,
  }

  userAdapter = () => {

  }

  componentDidMount = () => {
    this.setState({loading:true})
    const authUser = JSON.parse(localStorage.getItem('authUser'))
    this.props.firebase.bookingMembers()
    .orderByChild(authUser.uid).equalTo(true).on('value',snapshot => {
      const bookingObjects = snapshot.val();
      if (bookingObjects!== null) {
        console.log("For ... in Loop")
        for (const key in bookingObjects) {
          if (bookingObjects.hasOwnProperty(key)) {

            const membersUid = bookingObjects[key];

            let membersInformation = []
            this.props.firebase.booking(key).on('value', snapshot => {
              const bookingMetadata = snapshot.val();
              let timeNow = new Date()
              console.log(bookingMetadata);
              const bookingTime = new Date(bookingMetadata.date)
              console.log(bookingTime)
              if (bookingTime.getTime() > timeNow.getTime() || this.state.bookings.length > 4 ) {
                console.log('It got through Bruv')
                for (const uid in membersUid) {
                  if (membersUid.hasOwnProperty(uid)) {
                    const element = membersUid[uid];
    
                    this.props.firebase.user(uid).on('value',snapshot => {
                      const userObject = snapshot.val();
                      const userAdapter = { firstName : userObject.firstName,
                                            lastName : userObject.lastName,
                                            username : userObject.username,
                        }
                        membersInformation.push(userAdapter)
                    })
    
                  }
                }
                const bookingAdapter = {date : bookingMetadata.date,
                                        startTime: bookingMetadata.startTime,
                                        endTime: bookingMetadata.endTime,
                }
                const bookingObject = { membersInformation,
                                        bookingInformation: bookingAdapter            
                }
                console.log(bookingObject)
                this.setState(prevState => ({
                  bookings : [...prevState.bookings, bookingObject]
                }))
              }
            })

          }
        }
        console.log("End For .... in Loop")
        this.setState({loading:false})
      } else {
        this.setState({loading : false})
      }
    })
  
  }
  componentWillUnmount=() => {
    this.props.firebase.users().off()
    this.props.firebase.bookings().off()
    this.props.firebase.bookingMembers().off()
  }

    render() {
      const {bookings, loading}=this.state
      
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
          {loading && (<div>Loading ...</div>)}
          {!bookings.length?(<div>No bookings Available</div>):( 
            <Row>
              {bookings.map(booking => (
                <Col lg={3} md= {6} sm={6} xs={12}>
                  <Card>
                    <CardBody>
                        <ListGroup>
                          <ListGroupItem>Date {booking.bookingInformation.date}</ListGroupItem>
                          <ListGroupItem>Start {booking.bookingInformation.startTime}</ListGroupItem>
                          <ListGroupItem>End {booking.bookingInformation.endTime}</ListGroupItem>
                        </ListGroup>
                        {booking.membersInformation.map(user => (
                          <ListGroup>
                            <ListGroupItem>First name : {user.firstName}</ListGroupItem>
                            <ListGroupItem>Last name : {user.lastName}</ListGroupItem>
                            <ListGroupItem>Username : {user.username}</ListGroupItem>
                          </ListGroup>
                        ))}
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          )}


            </Page>
        )
    }
}

const condition = authUser => authUser && !!authUser.role==="COACH";

// export default compose(
//   withAuthorization(condition),
//   withFirebase,
// )(CoachDashboardPage);
export default withFirebase(CoachDashboardPage);