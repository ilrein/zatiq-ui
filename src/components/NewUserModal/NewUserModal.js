/* eslint-disable camelcase */
import React, { useState } from 'react';
import {
  Modal,
  Header,
  Message,
  Button,
  Image,
  Form,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { Storage } from 'aws-amplify';

import { APP_NAME } from '../../constants';
import PlacesAutoComplete from '../PlacesAutoComplete';
import Dropzone from '../Dropzone';

const NewUserModal = ({
  onSubmit,
  open,
  loading,
}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);
  const [phone, setPhone] = useState('');
  const [startingTime, setStartingTime] = useState('');
  const [closingTime, setClosingTime] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const heading = `Welcome to ${APP_NAME}!`;

  const handleSubmit = async () => {
    const { formatted_address } = address;
    /**
     * removes any whitespace while generating a unique ID
     */
    try {
      setUploadingImage(true);
      const PUT = await Storage.put(
        (`${uuidv4()}-${image.name}`).replace(/\s/g, ''),
        image,
        { level: 'public' },
      );
  
      const { key } = PUT; 

      onSubmit(
        name,
        formatted_address,
        key,
        phone, 
        startingTime, 
        closingTime,
      );
      setUploadingImage(false);
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };

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
          Please enter your restaurant details to get started.
        </Message>

        <Form>
          <Form.Input
            name="restaurantName"
            onChange={(event, { value }) => setName(value)}
            value={name}
            label="Restaurant name"
            placeholder="360 Cafe"
            fluid
            disabled={loading}
            required
          />

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
                    handleDrop={picture => setImage(picture)}
                    defaultDropMessage="Click to upload an image of your restaurant's interior"
                  />
                )
            }
          </div>

          <Form.Input
            onChange={(event, { value }) => setPhone(value)}
            value={phone}
            label="Phone Number"
            placeholder="416-123-4567"
            fluid
            disabled={loading}
            required
            type="tel"
          />

          <Form.Group widths="equal">
            <Form.Input
              onChange={(event, { value }) => setStartingTime(value)}
              value={startingTime}
              label="Starting Time"
              fluid
              disabled={loading}
              required
              type="time"
            />
            <Form.Input
              onChange={(event, { value }) => setClosingTime(value)}
              value={closingTime}
              label="Closing Time"
              fluid
              disabled={loading}
              required
              type="time"
            />
          </Form.Group>

          <Form.Button
            primary
            type="submit"
            onClick={handleSubmit}
            style={{ marginTop: '1rem' }}
            loading={loading || uploadingImage}
            disabled={
              name === ''
              || address.formatted_address === undefined
              || image === null
              || phone === ''
              || startingTime === ''
              || closingTime === ''
            }
          >
            Submit
          </Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

NewUserModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default NewUserModal;
