import React, { Component } from 'react'
import Typography from 'components/Typography'
import Page from 'components/Page'
import { FormGroup, Form, Label, Input, Button, Row } from 'reactstrap'
import {
    Chat,
    Channel,
    ChannelHeader,
    Thread,
    MessageList,
    ChannelList,
    TypingIndicator,
    MessageInputFlat,
    MessageCommerce,
    MessageInput,
    Window
} from "stream-chat-react";
import { StreamChat, DevToken } from "stream-chat";

import "stream-chat-react/dist/css/index.css";
/**
 * Chat made with Getstream.io 
 * 
 * unable to find other alternatives that made the implementation of a Chatbot easier
 */

const chatClient = new StreamChat(process.env.REACT_APP_STREAM_API_KEY);

chatClient.setUser(
    {
        id: 'john',
        name: 'John Doe',
        image: 'https://getstream.io/random_svg/?name=John',
    },
   chatClient.devToken('john'),
);

const filters = { type: "messaging" };
const sort = { last_message_at: -1 };
// const channels = chatClient.queryChannels(filters, sort, {
//     watch: true,
//     presence: true
// });

const channel = chatClient.channel("messaging", 'john', {
    members: [chatClient.user.id, "support-agent-123"],
    assigned: "support-agent-123",
    status: "open"
})
channel.watch({presence:true})


export default class MessagingPage extends Component {




    render() {
        return (
            <Page>
                <Chat client={chatClient} theme={"messaging dark"}>
                    <ChannelList
                        filters={filters}
                        sort={sort}
                    />
                    <Channel channel={channel}>
                        <Window>
                            <ChannelHeader />

                            <MessageList
                                TypingIndicator={TypingIndicator}
                                Message={MessageCommerce}
                            />

                            <MessageInput Input={MessageInputFlat} />
                        </Window>
                    </Channel>
                </Chat>
            </Page>
        )
    }
}
