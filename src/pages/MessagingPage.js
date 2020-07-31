import React, { Component } from 'react'
import Typography from 'components/Typography'
import {ChatFeed} from 'react-bell-chat'
import Page from 'components/Page'
import { FormGroup, Form, Label, Input, Button, Row } from 'reactstrap'

export default class MessagingPage extends Component {

    state = {
        messageList:[{
            id: 1,
            type: 'text',
            message: 'Testing text first',
            createdOn: new Date(),
            authorId: '1' //user uid
        },
        {
            id: 2,
            type: 'text',
            message:'Testing second text',
            createdOn: new Date(),
            authorId: '2',
        },
        {
            id: 3,
            type: 'text',
            message:'Testing third text',
            createdOn: new Date(),
            authorId: '3',
        },
    ],
        authors:[
            {
                id: '1',
                name: 'John',
                avatarName: 'John',
            },
            {
                id: '2',
                name: 'Maria',
                avatarName: 'Maria',
            },
            {
                id: '3',
                name: 'Filip',
                avatarName: 'Filip',
            },
            
        ]
    }
    
    /*
    *   Message Format 
    *   {
    *       id: uid,
    *       text: text,
    *       author: author,
    *   }
    *   
    */
    addMessage() {
        
    }

    renderMessages() {
        const {messageList} = this.state
        return(
            <div>
                {messageList.map(msg => (
                    <div>

                    </div>
                ))}
            </div>
        )
    }
    render() {
        return (
            <Page>
                <ChatFeed
                    messages={this.state.messageList}
                    authors={this.state.authors}
                    yourAuthorId={'2'}
                    showRecipientAvatar={true}
                />
                <Input 
                    type='text'
                    id='text'
                    name='message'
                />
            </Page>
        )
    }
}
