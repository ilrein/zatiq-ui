import React from 'react';
import {
  Segment,
  Label,
  Icon,
} from 'semantic-ui-react';

const Note = ({
  note,
  handleDelete,
}) => (
  <Segment>
    <Label>
      {note.status}
    </Label>
    <Label>
      {note.content}
    </Label>
    <Icon
      color="red"
      name="remove"
      onClick={handleDelete}
    />
  </Segment>
);

export default Note;
