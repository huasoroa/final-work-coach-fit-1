import React, { Component } from 'react'
import { FormGroup, Form, Label, Input, Button } from 'reactstrap'

export default class BookingForm extends Component {

    state = {
        date: null,
        startTime: null,
        endTime: null,
    }

    handleSubmit = event => {
        const {date, startTime, endTime} = this.state
        var newBooking = this.props.firebase.bookings.push({
            date,
            startTime,
            endTime,
        });

        const bookingId= newBooking.key;

        const authUser = localStorage.getItem('authUser');
        const data = {
            [authUser.uid]:true,
            [this.props.coachId]:true,
        }
        this.props.firebase.bookingMember(bookingId).set({
             
        })
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for='Date'>Date</Label>
                    <Input 
                        type='date'
                        name='Date'
                        id='Date'/>
                </FormGroup>
                <FormGroup>
                    <Label for='startTime'>Start at</Label>
                    <Input
                        type='time'
                        name='startTime'
                        id='startTime' />
                </FormGroup>
                <FormGroup>
                <Label for='endTime'>End at</Label>
                    <Input
                        type='time'
                        name='endTime'
                        id='endTime' />
                </FormGroup>
                <Button onClick={this.handleSubmit}>Book</Button>
            </Form>
        )
    }
}
