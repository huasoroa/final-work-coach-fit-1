import React, { Component } from 'react'
import Typography from 'components/Typography'
import Page from 'components/Page'

export default class CoachItem extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        user: null,
      };
    }
    componentDidMount() {
      this.setState({ loading: true });
      this.props.firebase
        .user(this.props.match.params.id)
        .on('value', snapshot => {
            this.setState({
              user: snapshot.val(),
              loading: false,
            });
        });
    }
    componentWillUnmount() {
      this.props.firebase.user(this.props.match.params.id).off();
    }
    render() {
        console.log("TEST PARAMS: "+this.props.match.params.id)
        const {user, loading} = this.state
        return(
            <Page>
              {loading && <div>LOADING ... </div>}
              {user && (
                <div>
                  <Typography type='h1'>{user.firstName} {user.lastName}</Typography>
                  <Typography type='h3'>{user.username}</Typography>
                  <Typography type='h6'>{user.description}</Typography>
                </div>
              )}
            </Page>
        )
    }
  }