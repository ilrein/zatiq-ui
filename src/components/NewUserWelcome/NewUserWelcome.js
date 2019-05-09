import React, { useState } from 'react';
import {
  Modal,
  Header,
  Message,
  Input,
  Button,
} from 'semantic-ui-react';

import { APP_NAME } from '../../constants';

const NewUserWelcome = ({
  onSubmit,
  open,
  onClose,
}) => {
  const [name, setName] = useState('');

  const heading = `Welcome to ${APP_NAME}!`;

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="small"
    >
      <Header>
        {heading}
      </Header>
      <Modal.Content>
        <Message info>
          Please enter your company name to get started.
        </Message>

        <Input
          onChange={(event, { value }) => setName(value)}
          value={name}
          placeholder="Company name"
          fluid
        />

        <Button
          primary
          type="submit"
          onClick={onSubmit}
          style={{ marginTop: '1rem' }}
        >
          Submit
        </Button>
      </Modal.Content>
    </Modal>
  );
};

export default NewUserWelcome;
