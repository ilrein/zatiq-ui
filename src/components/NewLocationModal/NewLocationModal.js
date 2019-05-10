import React, { useState } from 'react';
import {
  Modal,
  Header,
  Button,
  Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PlacesAutoComplete from '../PlacesAutoComplete';

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
  const [address, setAddress] = useState('');

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
        <PlacesAutoComplete
          onPlaceSelected={place => setAddress(place)}
          placeholder="Location Address"
        />

        <Button
          primary
          type="submit"
          onClick={onSubmit}
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
  onClose: PropTypes.func.isRequired,
};

export default NewLocationModal;
