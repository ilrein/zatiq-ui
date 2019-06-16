import React, { useState } from 'react';
import {
  Modal,
  Header,
  Message,
  Input,
  Button,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { APP_NAME } from '../../constants';

const NewUserWelcome = ({
  onSubmit,
  open,
  loading,
}) => {
  const [name, setName] = useState('');

  const heading = `Welcome to ${APP_NAME}!`;

  return (
    <Modal
      open={open}
      size="small"
    >
      <Header>
        {heading}
      </Header>
      <Modal.Content>
        <Message info>
          Please enter your restaurant name to get started.
        </Message>

        <Input
          name="restaurantName"
          onChange={(event, { value }) => setName(value)}
          value={name}
          placeholder="restaurant name"
          fluid
          disabled={loading}
        />

        <Button
          primary
          type="submit"
          onClick={() => onSubmit(name)}
          style={{ marginTop: '1rem' }}
          loading={loading}
        >
          Submit
        </Button>
      </Modal.Content>
    </Modal>
  );
};

NewUserWelcome.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default NewUserWelcome;
