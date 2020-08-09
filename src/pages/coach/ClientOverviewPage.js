import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

export default class ClientOverviewPage extends Component {

    state = {
        loading : null,
        bookings: null,
        reviews : null,
    }

    componentDidMount = () => {
        this.props.firebase.bookingMembers().orderByChild(authUser.uid).equalTo(true).on('value', snapshot => {
            const bookingObjects = snapshot.val();
            if(bookingObjects!== null) {
                let members = []
                let uids= []
                let bookingList = null;
                bookingObjects.map( obj => {
                  
                })
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
                    let timeNow = new Date()
                    console.log(bookingData);
                    if(bookingData.date.getTime() > timeNow.getTime()){
                        formatBookingList.push(bookingData);
                    }
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
                this.setState({loading:false})
            }else {
                this.setState({loading: false})
            }
        })
    }

    render() {
        return (
            <Page>
                <Row>
                    <Col>Reviews
                    {loading && (<div>Loading .....</div>)}
                    
                    </Col>
                    <Col>Upcoming Clients
                    {loading && (<div>Loading .....</div>)}
                    
                    </Col>
                </Row>
            </Page>
        )
    }
}
