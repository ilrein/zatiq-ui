import React from 'react';
import {
  Segment,
  Header,
  Divider,
} from 'semantic-ui-react';
import styled from 'styled-components';

import Note from './Note';

const Body = styled.div``;

const NotesList = ({ io, userId, notes }) => {
  const handleDelete = (noteId) => {
    console.log('deleting', noteId);
    io.emit('delete-note', { userId, noteId });
  }

  return (
    <Segment
      color="blue"
    >
      <Header>
        User: {userId}
      </Header>
      <Divider />
      <Body>
        {
          notes.map(note => (
            <Note
              key={note._id}
              note={note}
              handleDelete={() => handleDelete(note._id)}
            />
          ))
        }
      </Body>
    </Segment>
  )
};

export default NotesList;
