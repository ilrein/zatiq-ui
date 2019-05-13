import React, { useState } from 'react';
import {
  Modal,
  Header,
  Button,
  Icon,
  Form,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PlacesAutoComplete from '../PlacesAutoComplete';
import Dropzone from '../Dropzone';

const SpreadHeader = styled(Header)`
  display: flex !important;
  flex-direction: row;
  justify-content: space-between;
`;

const NewItemModal = ({
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
        <>New Item</>

        <Icon
          name="close"
          onClick={onClose}
          style={{ cursor: 'pointer' }}
        />
      </SpreadHeader>
      <Modal.Content>
        <Form>
          <div className="field required">
            <label>
              Name
            </label>
            <PlacesAutoComplete
              onPlaceSelected={place => setAddress(place)}
              placeholder="Location Address"
            />
          </div>

          <div className="field">
            <label>
              Image
            </label>
            <Dropzone
              handleDrop={picture => console.log(picture)}
            />
          </div>

          <Button
            primary
            type="submit"
            onClick={onSubmit}
            style={{ marginTop: '1rem' }}
            loading={loading}
          >
            Submit
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

NewItemModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NewItemModal;
