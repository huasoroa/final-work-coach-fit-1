import React, { Component } from 'react'
import { FormGroup, Label, Input, Form, Button } from 'reactstrap'
import {withFirebase} from 'components/Firebase'


class ProfileForm extends Component {

    state = {loading: true,
        user: null,
        sports : {isAthletism: false,
        isBasketball: false,
        isFitness: false,
        isSoccer: false,
        isBaseball: false,
        isVolleyball: false,},
        description: null,}

    componentDidMount = () => {
        this.setState({ loading: true })
        this.props.firebase.user(this.props.id).on('value', snapshot => {
            const userObject = snapshot.val()
            if (userObject !== null) {
                this.setState({ user: userObject })
            }
        })
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(event.target.name + ': ' + event.target.value)
    };

    onChangeAthletism= event => {
        this.setState(initialState => ({
            isAthletism: !initialState.isAthletism,
          }));
    }
    onChangeSoccer= event => {
        this.setState(initialState => ({
            isSoccer: !initialState.isSoccer,
          }));    }
    onChangeFitness= event => {
        this.setState(initialState => ({
            isFitness: !initialState.isFitness,
          }));    }
    onChangeBasketball= event => {
        this.setState(initialState => ({
            isBasketball: !initialState.isBasketball,
          }));    }
    onChangeVolleyball= event => {
        this.setState(initialState => ({
            isVolleyball: !initialState.isVolleyball,
          }));    }
    onChangeBaseball= event => {
        this.setState(initialState => ({
            isBaseball: !initialState.isBaseball,
          }));    }
    handleSubmit = event => {
        const { sports, description }
        = this.state
        this.props.firebase.user(this.props.id).update({
            sports,
            description,
        })
    }

    render() {
        const { user, isAthletism, isBasketball, isFitness, isSoccer, isBaseball, isVolleyball, description }
        = this.state
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label for="description">Your Description</Label>
                        <Input type="textarea" name="description" id="description" onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup check>
                        <Input type="checkbox" name="isSoccer" onChange={this.onChangeSoccer}/> Soccer
                    </FormGroup>
                    <FormGroup check>
                        <Input type="checkbox" name="isAthletism" onChange={this.onChangeAthletism}/> Athletism
                    </FormGroup>
                    <FormGroup check>
                        <Input type="checkbox" name="isBasketball" onChange={this.onChangeBasketball} /> Basketball
                    </FormGroup><FormGroup check>
                        <Input type="checkbox" name="isBaseball"onChange={this.onChangeBaseball}/> Baseball
                    </FormGroup><FormGroup check>
                        <Input type="checkbox" name="isFitness"onChange={this.onChangeFitness}/> Fitness
                    </FormGroup>
                    <FormGroup check>
                        <Input type="checkbox" name="isVolleyball" onChange={this.onChangeVolleyball} /> Volleyball
                    </FormGroup>
                    <Button onClick={this.handleSubmit}>Submit</Button>
                </Form>
            </div>
        )
    }
}
export default withFirebase(ProfileForm)