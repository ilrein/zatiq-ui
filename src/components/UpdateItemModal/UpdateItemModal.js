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
  image,
}) => {
  const [name, setName] = useState(dish.name);
  const [description, setDescription] = useState(dish.description);
  const [price, setPrice] = useState(Object.values(dish.price)[0]);

  const [picture, setPicture] = useState(undefined);

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

          <div className="field">
            <label>
              Image
            </label>
            {
              image
              && picture === undefined
                ? (
                  <>
                    <Image src={image} />

                    <Button
                      icon="remove"
                      onClick={() => setPicture(null)}
                    />
                  </>
                )
                : null
            }

            {
              picture === null
                ? (
                  <Dropzone
                    handleDrop={PIC => setPicture(PIC)}
                    defaultDropMessage="Modify dish image, or leave blank to omit one."
                  /> 
                )
                : null 
            }

            {
              picture !== null
              && picture !== undefined
                ? (
                  <>
                    <Image src={picture.preview} />
                    
                    <Button
                      icon="remove"
                      onClick={() => setPicture(null)}
                    />
                  </>
                )
                : null
            }

            {
              dish.image === null
              && picture === undefined
                ? (
                  <Dropzone
                    handleDrop={PIC => setPicture(PIC)}
                    defaultDropMessage="Modify dish image, or leave blank to omit one."
                  /> 
                )
                : null 
            }
          </div>

          <Button
            primary
            type="submit"
            onClick={() => onSubmit(name, description, price, picture)}
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
  image: PropTypes.string,
};

UpdateItemModal.defaultProps = {
  image: '',
};

export default UpdateItemModal;
