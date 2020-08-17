import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

export default class ClientOverviewPage extends Component {

    state = {
        loading : null,
        bookings: null,
        reviews : null,
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

          this.props.firebase.reviews(authUser.uid).on('value',snapshot => {
            const reviewsObjects = snapshot.val()
            if (reviewsObjects !== null) {
              this.setState({reviews: reviewsObjects})
            }
          })

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
      this.props.firebase.reviews().off()
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
