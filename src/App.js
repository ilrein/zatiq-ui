import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {
  Header,
  Container,
  Form,
} from 'semantic-ui-react';
import styled from 'styled-components';
// import fetch from 'isomorphic-fetch';
// import uuidv4 from 'uuid/v4';

const Body = styled.div``;

const App = () => {
  // const [connected, setConnected] = useState(false);
  // const [client, setSocket] = useState(null);
  // const [userId] = useState('12345abcdef');
  // const [newNote, setNewNote] = useState('');
  // const [submitting, setSubmitting] = useState(false);

  // const [notes, setNotes] = useState([]);

  // useEffect(() => {
  //   const socket = io.connect(`http://localhost:4000`);
    
  //   socket.on('connect', () => {
  //     setConnected(true);
  //     setSocket(socket);
      
  //     socket.emit('room', userId);
  //     socket.emit('get-notes', {
  //       meta: {
  //         page: 1,
  //         userId,
  //       }
  //     })
  //   });
  // }, []);

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Header as="h1">
        Notes App
      </Header>
      <Body>
        PENDING
      </Body>
    </Container>
  );
};

export default App;
