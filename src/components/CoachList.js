import React, { Component } from 'react'
import UserCard from 'components/Card/UserCard'
import { Col, CardBody, CardLink, Row} from 'reactstrap'
import Page from 'components/Page'
import {Link} from 'react-router-dom'

class CoachList extends Component {

    state = {
        userlist: null,
        loading: false,
}

    componentDidMount() {
        this.setState({ loading: true });
        this.props.firebase.users().orderByChild('role').equalTo('COACH').on('value', snapshot => {
          const usersObject = snapshot.val();
          const usersList = Object.keys(usersObject).map(key => ({
            ...usersObject[key],
            uid: key,
          }));
          this.setState({
            userlist: usersList,
            loading: false,
          });
        });
      }

    componentWillUnmount() {
        this.props.firebase.users().off();
      }

    render() {
        console.log(this.state.userlist);
        const {loading, userlist} = this.state;
        return (
            <Page
                className="BookingPage"
                title="CoachList"
                breadcrumbs={[{ name: 'Booking', active: true }]}
            >
                {loading && <div>Loading ...</div>}
                {userlist && (

                    <Row>
                     {userlist.map(user => (
                         <Col key={user.uid} lg={3} md={6} sm={6} xs={12}>
                        <UserCard
                            
                            title={user.firstName+' '+user.lastName}
                            subtitle={user.username}
                            text={user.description}
                            >
                            <CardBody>
                                    <Link to={"/client/booking/book/"+user.uid}>Book</Link>
                                    <Link to={"/profile/"+user.uid}>More</Link>
                            </CardBody>
                        </UserCard>
                    </Col>
                     ))}
            </Row>
                     )}
            </Page>
            
        )
    }
}

export default CoachList;