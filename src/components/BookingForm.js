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
        var newBooking = this.props.firebase.bookings().push({
            date,
            startTime,
            endTime,
        });

        const bookingId= newBooking.key;
        const authUser = JSON.parse(localStorage.getItem('authUser'));
        console.log('authUser: '+authUser)
        const {uid} = authUser;
        const coachId = this.props.coachId;
        this.props.firebase.bookingMember(bookingId).set({
            [uid]:true,
            [coachId]:true,
        })
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(event.target.name+': '+event.target.value)
      };

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for='date'>Date</Label>
                    <Input 
                        type='date'
                        name='date'
                        id='date'
                        onChange={this.onChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for='startTime'>Start at</Label>
                    <Input
                        type='time'
                        name='startTime'
                        id='startTime'
                        onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                <Label for='endTime'>End at</Label>
                    <Input
                        type='time'
                        name='endTime'
                        id='endTime'
                        onChange={this.onChange} />
                </FormGroup>
                <Button onClick={this.handleSubmit}>Book</Button>
            </Form>
        )
    }
}
