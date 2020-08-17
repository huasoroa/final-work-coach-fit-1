import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button} from 'reactstrap';
import Rating from '@material-ui/lab/Rating'
import {withFirebase} from 'components/Firebase'

class ReviewForm extends Component {
    state = {rating: "", comment: ""}

    
handleSubmit = event => {
    const {rating,comment} = this.state
    const authUser = JSON.parse(localStorage.getItem('authUser'))
    this.props.firebase.review(this.props.uid).push({
        rating,
        comment,
        date : new Date(),
        author : authUser.uid
    })
}

onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.name+': '+event.target.value)
  };

    render() {
        const { rating, comment} = this.state;
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Rating
                        name="rating"
                        onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Comment</Label>
                        <Input type='text'
                        name="comment"
                        onChange={this.onChange}/>
                    </FormGroup>
                    <Button onClick={this.handleSubmit}>Rate</Button>
                </Form>
            </div>
        )
    }
}

// render() {
//     return (
//         <Form>
//             <FormGroup>
//                 <Label for='date'>Date</Label>
//                 <Input 
//                     type='date'
//                     name='date'
//                     id='date'
//                     onChange={this.onChange}/>
//             </FormGroup>
//             <FormGroup>
//                 <Label for='startTime'>Start at</Label>
//                 <Input
//                     type='time'
//                     name='startTime'
//                     id='startTime'
//                     onChange={this.onChange} />
//             </FormGroup>
//             <FormGroup>
//             <Label for='endTime'>End at</Label>
//                 <Input
//                     type='time'
//                     name='endTime'
//                     id='endTime'
//                     onChange={this.onChange} />
//             </FormGroup>
//             <Button onClick={this.handleSubmit}>Book</Button>
//         </Form>
//     )
// }
export default withFirebase(ReviewForm);