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

const UpdateLocationModal = ({
  onSubmit,
  open,
  loading,
  onClose,
  address,
}) => {
  const [updatedAddress, setUpdatedAddress] = useState('');
  const [updatedImage, setImage] = useState(null);

  return (
    <Modal
      open={open}
      size="small"
    >
      <SpreadHeader>
        <>Update Location</>

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
              onPlaceSelected={place => setUpdatedAddress(place)}
              placeholder={address}
            />
          </div>

          <div className="field required">
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
          </div>

          <Button
            primary
            type="submit"
            onClick={() => onSubmit(updatedAddress, updatedImage)}
            style={{ marginTop: '1rem' }}
            loading={loading}
            disabled={
              updatedAddress === ''
              || updatedImage === null
            }
          >
            Submit
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

UpdateLocationModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
};

export default UpdateLocationModal;
