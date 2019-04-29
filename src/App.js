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

import NotesList from './components/NotesList';

const Body = styled.div``;

const App = () => {
  const [connected, setConnected] = useState(false);
  const [client, setSocket] = useState(null);
  const [userId] = useState('12345abcdef');
  const [newNote, setNewNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const socket = io.connect(`http://localhost:4000`);
    
    socket.on('connect', () => {
      setConnected(true);
      setSocket(socket);
      
      socket.emit('room', userId);
      socket.emit('get-notes', {
        meta: {
          page: 1,
          userId,
        }
      })
    });

    socket.on('list-notes', (listOfNotes) => {
      setNotes(listOfNotes.docs);
    });

    socket.on('note-created', (data) => {
      setNewNote('');
      setSubmitting(false);
      socket.emit('get-notes', {
        meta: {
          page: 1,
          userId,
        }
      })
    });

    socket.on('note-deleted', (data) => {
      socket.emit('get-notes', {
        meta: {
          page: 1,
          userId,
        }
      })
    });
  }, []);

  const createNewNote = () => {
    setSubmitting(true);
    client.emit('submit-note', {
      userId,
      note: {
        status: 'PENDING',
        content: newNote
      }
    });
  };

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Header as="h1">
        Notes App
      </Header>
      <Body>
        {
          connected
          || submitting
            ? (
              <>
                <Form>
                  <Form.Input
                    placeholder="Note content"
                    value={newNote}
                    onChange={(event, { value }) => setNewNote(value)}
                    action={{
                      color: 'green',
                      icon: 'plus',
                      content: 'add',
                      onClick: () => createNewNote(),
                      loading: submitting,
                    }}
                  />
                </Form>
                <NotesList
                  userId={userId}
                  notes={notes}
                  io={client}
                />
              </>
            )
            : <div>loading...</div>
        }
      </Body>
    </Container>
  );
};

export default App;
