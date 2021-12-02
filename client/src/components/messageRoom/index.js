import React from 'react'

function Room() {
    return (
            <div>
        <div className="chat_window">
          <div className="top_menu">
            <div className="title">Chat</div>
          </div>
          <ul className="messages" />
          <div className="bottom_wrapper clearfix">
            <div className="message_input_wrapper">
              <input className="message_input" placeholder="Type your message here..." />
            </div>
            <div className="send_message">
              <div className="icon" />
              <div className="text">Send</div>
            </div>
          </div>
        </div>
        <div className="message_template">
          <li className="message">
            <div className="avatar" />
            <div className="text_wrapper">
              <div className="text" />
            </div>
          </li>
        </div>
      </div>
    )
}

export default Room;
