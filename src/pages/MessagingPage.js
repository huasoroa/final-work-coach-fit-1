import React, { Component } from 'react'
import { MessageBox, MessageList, Input, SystemMessage } from 'react-chat-elements'
import Page from 'components/Page'


export default class MessagingPage extends Component {

    state = {
        messageList:[{
            // id: 1,
            position: 'left',
            type: 'text',
            text: 'Testing text first',
            date: new Date(),
            // author: 1 //user uid
        },
        {
            // id: 2,
            position: 'right',
            type: 'text',
            text:'Testing second text',
            date: new Date(),
            // author: 2,
        },]
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

    render() {
        return (
            <div>
                <MessageList
                        className='message-list'
                        lockable={true}
                        dataSource={this.state.messageList} />
            </div>
        )
    }
}
