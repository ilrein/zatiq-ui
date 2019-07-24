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

// constants
import { APP_NAME } from '../../constants';

// components
// import CuisineDropdown from '../CuisineDropdown';
import FeaturesDropdown from '../FeaturesDropdown';
import PlacesAutoComplete from '../PlacesAutoComplete';
import Dropzone from '../Dropzone';

// copy
import { copy } from './copy.json';

// dropdown data
import { options } from '../../data/cuisineType.json';

const InitialLaunchModal = ({
  onSubmit,
  open,
  loading,
}) => {
  // form values
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [image, setImage] = useState(null);
  const [phone, setPhone] = useState('');

  // features
  const [features, setFeatures] = useState([]);

  // prices
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // start/close times
  const [startingTime, setStartingTime] = useState('');
  const [closingTime, setClosingTime] = useState('');

  const heading = `Welcome to ${APP_NAME}!`;

  const handleSubmit = async () => {
    const { formatted_address } = address;
    
    onSubmit(
      name,
      formatted_address,
      description,
      cuisineType,
      features,
      image,
      phone,
      startingTime, 
      closingTime,
    );
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

          <Form.TextArea
            onChange={(event, { value }) => setDescription(value)}
            value={description}
            label="Description"
            placeholder={copy.descriptionPlaceholder}
            disabled={loading}
            required
          />

          <Form.Dropdown
            label="Cuisine Type"
            onChange={(event, { value }) => setCuisineType(value)}
            fluid
            required
            options={options}
            selection
            search
            placeholder="Italian"
          />

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
            minLength={10}
            maxLength={12}
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

          <div className="field">
            <label>
              Features
            </label>
            <FeaturesDropdown
              onChange={(event, { value }) => setFeatures(value)}
              fluid
              required
              disabled={loading}
            />
          </div>

          <Form.Button
            primary
            type="submit"
            onClick={handleSubmit}
            style={{ marginTop: '1rem' }}
            loading={loading}
            disabled={
              name === ''
              || address.formatted_address === undefined
              || description === null
              || image === null
              || cuisineType === ''
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

InitialLaunchModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default InitialLaunchModal;
