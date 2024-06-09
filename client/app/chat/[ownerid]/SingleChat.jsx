'use client';
import styles from './SingleChat.module.css';
import { use, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export const SingleChat = ({ owner_id }) => {
  const socketRef = useRef(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const user_id = localStorage.getItem('user_id');

  const handleMessageInputChange = (event) => {
    setMessageInput(event.target.value);
  };

  const sendMessage = () => {
    if (messageInput.trim() === '') {
      return;
    }
    console.log('sending');
    socketRef.current?.emit('sendMessage', {
      sender_id: user_id, // Sender's ID
      receiver_id: owner_id, // Recipient's ID
      message: messageInput,
    });

    // Clear the message input field
    setMessageInput('');
  };

  useEffect(() => {
    socketRef.current = io('http://localhost:8000', {
      auth: {
        token: user_id,
      },
    });
    socketRef.current.on('connect', () => {
      // x8WIv7-mJelg7on_ALbx
    });
    socketRef.current.emit('joinChatRoom', {
      sender_id: user_id,
      receiver_id: owner_id,
    });
    socketRef.current.on('onlineUsers', (data) => {
      console.log(data);
    });

    socketRef.current.on(
      'newMessage',
      ({ sender_id, receiver_id, message }) => {
        console.log('Received new message:', {
          sender_id,
          receiver_id,
          message,
        });
        console.log(messages);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender_id, receiver_id, message },
        ]);
      }
    );

    return () => {
      // socket.emit('bye', user_id);
      socketRef.current.disconnect();
    };
  }, []);

  const username = 'Nasiruddin Abubakar';
  console.log(username);
  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatDiv}>
        <div className={styles.chatHeader}>
          <div className={styles.chatAvatar}>
            <h4>AN</h4>
          </div>
          <div>
            <h4 className={styles.headingg}>{"Anonymous"}</h4>
          </div>
        </div>
        <div className={styles.messages}>
          {messages?.map((message) => {
            return (
              <>
                <div
                  className={
                    message.sender_id === user_id
                      ? styles.userMessage
                      : styles.message
                  }
                >
                  <div
                    className={styles.messageAvatar}
                    style={{
                      backgroundColor:
                        message.sender_id === user_id
                          ? 'orangered'
                          : 'rgb(237, 229, 229)',
                      color:
                        message.sender_id === user_id
                          ? 'white'
                          : 'black',
                    }}
                  >
                    <h4>
                    {message.sender_id === user_id
                          ? username
                              .split(' ')
                              .map((word) => word[0].toUpperCase())
                              .join('')
                          : "AN"}
                    </h4>
                  </div>
                  <div
                    className={
                      message.sender_id === user_id
                        ? styles.userMessageContent
                        : styles.messageContent
                    }
                  >
                    <p style={{ color: {} }}>{message.message}</p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div></div>
        <div className={styles.newMessage}>
          <input
            type="text"
            placeholder="Type a message"
            className={styles.input}
            onChange={handleMessageInputChange}
          />
          <button className={styles.sendButton} onClick={sendMessage}>
            Send{' '}
          </button>
        </div>
      </div>
    </div>
  );
};
