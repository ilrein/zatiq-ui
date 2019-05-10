import React, { useState } from 'react';
import {
  Modal,
  Header,
  Input,
  Button,
  Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SpreadHeader = styled(Header)`
  display: flex !important;
  flex-direction: row;
  justify-content: space-between;
`;

const NewLocationModal = ({
  onSubmit,
  open,
  loading,
  onClose,
}) => {
  const [name, setName] = useState('');

  return (
    <Modal
      open={open}
      size="small"
    >
      <SpreadHeader>
        <>New Location</>

        <Icon
          name="close"
          onClick={onClose}
          style={{ cursor: 'pointer' }}
        />
      </SpreadHeader>
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
