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
  // uploadImage,
}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageURI, setImageURI] = useState('');

  const handleSubmit = () => onSubmit({
    name,
    description,
    imageURI,
  });

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
          <Form.Input
            label="Name"
            placeholder="Cheeseburger"
            onChange={(event, { value }) => setName(value)}
            value={name}
            required
          />

          <Form.TextArea
            label="Description"
            placeholder="Sweet and sour..."
            onChange={(event, { value }) => setDescription(value)}
            value={description}
            required
          />

          <Form.Input
            label="Price"
            placeholder="12.99"
            onChange={(event, { value }) => setPrice(value)}
            value={price}
            required
            type="number"
            min="0.00"
            max="100.00"
            step="0.01"
          />

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
            onClick={handleSubmit}
            style={{ marginTop: '1rem' }}
            loading={loading}
            disabled={
              name === ''
              || price === ''
              || description === ''
            }
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
