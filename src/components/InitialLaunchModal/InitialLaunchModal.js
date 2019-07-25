/* eslint-disable camelcase */
import React, { useState } from 'react';
import {
  Modal,
  Header,
  Message,
  Button,
  Image,
  Form,
  Segment,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
// import dayjs from 'dayjs';

// ramda utils
import update from 'ramda/src/update';
import isEmpty from 'ramda/src/isEmpty';

// constants
import { APP_NAME } from '../../constants';

// components
import FeaturesDropdown from '../FeaturesDropdown';
import PlacesAutoComplete from '../PlacesAutoComplete';
import Dropzone from '../Dropzone';

// copy
import { copy } from './copy.json';

// dropdown data
import { options } from '../../data/cuisineType.json';
import { weekdays } from '../../data/weekdays.json';

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

  // start/close times
  const [hasDifferentOperatingHours, setHasDifferentOperatingHours] = useState(false);
  const [operatingHours, setOperatingHours] = useState(weekdays.map(weekday => ({
    weekday,
    startTime: '09:00',
    closeTime: '17:00',
  })));

  console.log(operatingHours);

  const heading = `Welcome to ${APP_NAME}!`;

  const handleSubmit = async () => {
    const { formatted_address } = address;
    
    onSubmit(
      name,
      formatted_address,
      description,
      cuisineType,
      image,
      phone,
      operatingHours,
      features,
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
          Please enter your restaurant information to get started.
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

          <Segment color="black">
            <Header as="h4">
              Hours of operation
            </Header>
            <Form.Checkbox
              toggle
              label="Some days have different hours"
              checked={hasDifferentOperatingHours}
              onChange={(event, { checked }) => setHasDifferentOperatingHours(checked)}
            />
            {
              !hasDifferentOperatingHours
                ? (
                  <Form.Group widths="equal">
                    <Form.Input
                      onChange={(event, { value }) => {
                        setOperatingHours(operatingHours.map(OPERATING_HOURS => ({
                          ...OPERATING_HOURS,
                          startTime: value,
                        })));
                      }}
                      label="Starting Time"
                      fluid
                      disabled={loading}
                      required
                      type="time"
                      value={operatingHours[0].startTime}
                    />
                    <Form.Input
                      onChange={(event, { value }) => {
                        setOperatingHours(operatingHours.map(OPERATING_HOURS => ({
                          ...OPERATING_HOURS,
                          closeTime: value,
                        })));
                      }}
                      label="Closing Time"
                      fluid
                      disabled={loading}
                      required
                      type="time"
                      value={operatingHours[0].closeTime}
                    />
                  </Form.Group>
                )
                : (
                  operatingHours.map((weekday, index) => (
                    <div key={`${weekday}`}>
                      <Header as="h4">
                        {weekday.weekday}
                      </Header>
                      <Form.Group widths="equal">
                        <Form.Input
                          onChange={(event, { value }) => {
                            setOperatingHours(update(index, {
                              ...operatingHours[index],
                              startTime: value,
                            }));
                          }}
                          value={weekday.startTime}
                          label="Starting Time"
                          fluid
                          disabled={loading}
                          required
                          type="time"
                        />
                        <Form.Input
                          onChange={(event, { value }) => {
                            setOperatingHours(update(index, {
                              ...operatingHours[index],
                              closeTime: value,
                            }));
                          }}
                          value={weekday.closeTime}
                          label="Closing Time"
                          fluid
                          disabled={loading}
                          required
                          type="time"
                        />
                      </Form.Group>
                    </div>
                  ))
                )
            }
          </Segment>

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
              || (
                operatingHours
                  .map(
                    hours => isEmpty(hours.startTime)
                    || isEmpty(hours.closeTime),
                  )
                  .some(fieldsAreEmpty => fieldsAreEmpty === true)
              )
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
