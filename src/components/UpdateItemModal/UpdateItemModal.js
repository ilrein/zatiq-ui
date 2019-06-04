import React, { useState } from 'react';
import {
  Modal,
  Header,
  Button,
  Icon,
  Form,
  Image,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Dropzone from '../Dropzone';

const SpreadHeader = styled(Header)`
  display: flex !important;
  flex-direction: row;
  justify-content: space-between;
`;

const UpdateItemModal = ({
  onSubmit,
  open,
  loading,
  onClose,
  dish,
}) => {
  const [name, setName] = useState(dish.name);
  const [description, setDescription] = useState(dish.description);
  const [price, setPrice] = useState(Object.values(dish.price)[0]);

  const [updatedImage, setImage] = useState(null);

  return (
    <Modal
      open={open}
      size="small"
    >
      <SpreadHeader>
        <>Update Dish</>

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
            value={name}
            onChange={(event, { value }) => setName(value)}
          />

          <Form.TextArea
            label="Description"
            value={description}
            onChange={(event, { value }) => setDescription(value)}
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

          {/* <div className="field required">
            <label>
              Image
            </label>
            {
              updatedImage
                ? (
                  <>
                    <Image src={updatedImage.preview} />

                    <Button
                      icon="remove"
                      onClick={() => setImage(null)}
                    />
                  </>
                )
                : (
                  <Dropzone
                    handleDrop={picture => setImage(picture)}
                    defaultDropMessage="Click to upload a new image of your restaurant's interior"
                  />
                )
            }
          </div> */}

          <Button
            primary
            type="submit"
            onClick={() => onSubmit(name)}
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

UpdateItemModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  dish: PropTypes.shape().isRequired,
};

export default UpdateItemModal;
