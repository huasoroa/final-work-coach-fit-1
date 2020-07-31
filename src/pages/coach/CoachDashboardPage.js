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

  state = {
    bookings : null,
    loading: false,
  }

  componentDidMount = () => {
    this.setState({loading:true})
    const authUser = JSON.parse(localStorage.getItem('authUser'))
    this.props.firebase.bookingMembers()
    .orderByChild(authUser.uid).equalTo(true).on('value',snapshot => {
      const bookingObjects = snapshot.val();
      if (bookingObjects!== null) {
        let members = []
        let uids= []
        let bookingList = null;
        Object.keys(bookingObjects).forEach(key => {
          Object.keys(bookingObjects[key]).map(mKey => {
            members.push(mKey);
            console.log('mKey: '+mKey)
          }) 
          console.log('key: '+key)
          uids.push(key)
        });
        console.log('Booking')
        console.log(bookingList)
        let formatBookingList=[];
        uids.forEach(obj => {
          this.props.firebase.booking(obj).on('value', snapshot => {
            const bookingData= snapshot.val();
            console.log(bookingData);
            formatBookingList.push(bookingData);
          })
        });
        console.log("FormatBookingList == ")
        console.log(formatBookingList)
        let membersList = []
        members.forEach(obj => {
          this.props.firebase.user(obj).on('value', snaphot => {
            const user = snapshot.val()
            membersList.push(user)
          })
        })
        this.setState({bookings: formatBookingList})
      } else {
        this.setState({loading : false})
      }
    })
     
    
    this.setState({loading:false})
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
          {bookings===null?(<div>No bookings Available</div>):( 
            <Row>
              {bookings.map(booking => (
                <Col>
                  <Card>
                    <CardBody>
                      <CardText>
                        Date {booking.date},
                        Start {booking.startTime},
                        End {booking.endTime}
                      </CardText>
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

const condition = authUser => authUser && !!authUser.role=="COACH";

// export default compose(
//   withAuthorization(condition),
//   withFirebase,
// )(CoachDashboardPage);
export default CoachDashboardPage;