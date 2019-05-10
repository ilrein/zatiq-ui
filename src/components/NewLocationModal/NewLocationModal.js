import React, { useState } from 'react';
import {
  Modal,
  Header,
  Input,
  Button,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const NewLocationModal = ({
  onSubmit,
  open,
  loading,
}) => {
  const [name, setName] = useState('');

  return (
    <Modal
      open={open}
      size="small"
    >
      <Header>
        New Location
      </Header>
      <Modal.Content>
        <Input
          name="locationName"
          onChange={(event, { value }) => setName(value)}
          value={name}
          placeholder="Location name"
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

NewLocationModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default NewLocationModal;
