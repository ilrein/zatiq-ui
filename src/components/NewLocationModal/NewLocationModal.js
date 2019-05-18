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

import PlacesAutoComplete from '../PlacesAutoComplete';
import Dropzone from '../Dropzone';

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
  const [image, setImage] = useState(null);

  const onSetImage = (IMG) => {
    console.log(IMG);
    setImage(IMG);
  };

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
        <Form>
          <div className="field required">
            <label>
              Address
            </label>
            <PlacesAutoComplete
              onPlaceSelected={place => setAddress(place)}
              placeholder="Location Address"
            />
          </div>

          <div className="field required">
            <label>
              Image
            </label>
            {
              image
                ? (
                  <>
                    <Image src={image.preview} />

                    <Button
                      icon="remove"
                      onClick={() => setImage(null)}
                    />
                  </>
                )
                : (
                  <Dropzone
                    handleDrop={picture => onSetImage(picture)}
                    defaultDropMessage="Click to upload an image of your restaurant's interior"
                  />
                )
            }
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

NewLocationModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NewLocationModal;
