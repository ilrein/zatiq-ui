// Core
import React, { useState } from 'react';
import {
  Form,
  Button,
  Header,
  Tab,
  Image,
  Segment,
  Divider,
} from 'semantic-ui-react';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Storage } from 'aws-amplify';
import uuidv4 from 'uuid/v4';

// ramda utils
import update from 'ramda/src/update';
import isEmpty from 'ramda/src/isEmpty';
import pluck from 'ramda/src/pluck';
import uniq from 'ramda/src/uniq';

// animations
import fadeIn from '../../anime/fadeIn';

// constants
import {
  API_RESTAURANT,
} from '../../constants';

// components
import PlacesAutoComplete from '../../components/PlacesAutoComplete';
import FeaturesDropdown from '../../components/FeaturesDropdown';
import ImageContainer from '../../containers/ImageContainer';
import Dropzone from '../../components/Dropzone';
import PrimaryButton from '../../components/PrimaryButton';

// tabs
import PaymentDetails from './PaymentDetails';

// dropdown data
import { cuisineType } from '../../data/cuisineType.json';
import { weekdays } from '../../data/weekdays.json';

const Wrapper = styled.div`
  display: flex;
  animation: ${fadeIn} 1s ease;
`;

const InnerWrapper = styled.div`
  margin: 0.25rem 1rem;
  width: 100%;
`;

const Restaurant = ({
  userReducer,
  restaurant,
  captureRestaurant,
}) => {
  // restaurant stuff
  const [name, setName] = useState(restaurant.name);
  const [address, setAddress] = useState(restaurant.address);
  const [description, setDescription] = useState(restaurant.description);
  const [cuisineTypeValue, setCuisineTypeValue] = useState(restaurant.cuisineType);

  // features
  const [features, setFeatures] = useState(restaurant.features);

  // image
  const [image] = useState(restaurant.image);
  const [picture, setPicture] = useState(undefined);

  // phoneNumber
  const [phoneNumber, setPhoneNumber] = useState(restaurant.phoneNumber);

  // start/close times
  const [hasDifferentOperatingHours, setHasDifferentOperatingHours] = useState(() => {
    const getStartTimes = pluck('startTime');
    const getCloseTimes = pluck('closeTime');
    const getClosed = pluck('closed');

    if (uniq(getStartTimes(restaurant.operatingHours)).length > 1) return true;
    if (uniq(getCloseTimes(restaurant.operatingHours)).length > 1) return true;
    if (uniq(getClosed(restaurant.operatingHours)).length > 1) return true;
  });
  const [operatingHours, setOperatingHours] = useState(restaurant.operatingHours);

  // update states
  const [loading] = useState(false);
  const [saving, setSaving] = useState(false);

  // tokens
  const { cognitoUser } = userReducer;
  const token = cognitoUser.signInUserSession.idToken.jwtToken;

  const onUpdate = async () => {
    setSaving(true);

    try {
      const post = await fetch(`${API_RESTAURANT}/${restaurant._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': token,
        },
        body: JSON.stringify({
          restaurant: {
            name,
            address,
            description,
            cuisineTypeValue,
            phoneNumber,
            operatingHours,
            features,
          },
        }),
      });
  
      const result = await post.json();
      
      // if the image is being changed...
      if (picture) {
        // remove the old image from the bucket
        await Storage.remove(restaurant.image);

        const pictureName = (`${uuidv4()}-${picture.name}`).replace(/\s/g, '');

        const picturePathWithName = (`${restaurant._id}/${pictureName}`);

        // upload the image after creating the restaurant
        // namespace it with its ID
        const PUT = await Storage.put(
          picturePathWithName,
          picture,
          { level: 'public' },
        );
    
        const { key } = PUT; 

        const updatedRestaurantWithImage = await fetch(`${API_RESTAURANT}/${result._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'jwt-token': token,
          },
          body: JSON.stringify({
            restaurant: {
              image: key,
            },
          }),
        });

        const updatedRestaurant = await updatedRestaurantWithImage.json();

        captureRestaurant(updatedRestaurant);
      } else {
        captureRestaurant(result);
      }
      setSaving(false);
      toast.success(`Updated ${name}`);
    } catch (error) {
      console.log(error) // eslint-disable-line
    }
  };

  const Panes = [
    {
      menuItem: 'Details',
      render: () => (
        <Tab.Pane>
          <Form>
            <Form.Field>
              <label>
                Name
              </label>
              <Form.Input
                placeholder="Tesla Inc."
                value={name}
                onChange={(event, { value }) => setName(value)}
                fluid
              />
            </Form.Field>
  
            <div className="field">
              <label>
                Address
              </label>
              <PlacesAutoComplete
                onPlaceSelected={place => setAddress(place)}
                placeholder={address}
              />
            </div>
  
            <Form.TextArea
              onChange={(event, { value }) => setDescription(value)}
              value={description}
              label="Description"
              placeholder="Restaurant description here..."
              disabled={loading}
              required
            />
  
            <Form.Dropdown
              label="Cuisine Type"
              value={cuisineTypeValue}
              onChange={(event, { value }) => setCuisineTypeValue(value)}
              fluid
              required
              options={cuisineType}
              selection
              search
              placeholder="Italian"
              multiple
            />

            <div className="field required">
              <label>
                Image
              </label>
              {
                image
                  && picture === undefined
                  ? (
                    <>
                      <ImageContainer
                        imageKey={image}
                        size="medium"
                      />

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
                      defaultDropMessage="Upload a new restaurant image"
                    />
                  )
                  : null
              }

              {
                picture !== null
                  && picture !== undefined
                  ? (
                    <>
                      <Image
                        src={picture.preview}
                        size="medium"
                      />

                      <Button
                        icon="remove"
                        onClick={() => setPicture(null)}
                      />
                    </>
                  )
                  : null
              }

              {
                restaurant.image === null
                  && picture === undefined
                  ? (
                    <Dropzone
                      handleDrop={PIC => setPicture(PIC)}
                      defaultDropMessage="Upload a new restaurant image"
                    />
                  )
                  : null
              }
            </div>

            <Form.Input
              onChange={(event, { value }) => setPhoneNumber(value)}
              value={phoneNumber}
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
                onChange={(event, { checked }) => {
                  setHasDifferentOperatingHours(checked);
                  if (!checked) {
                    setOperatingHours(weekdays.map(weekday => ({
                      weekday: weekday.toUpperCase(),
                      startTime: '09:00',
                      closeTime: '17:00',
                      closed: false,
                    })));
                  }
                }}
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
                        <Divider />
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
                            disabled={loading || operatingHours[index].closed}
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
                            disabled={loading || operatingHours[index].closed}
                            required
                            type="time"
                          />
                        </Form.Group>
                        <Form.Checkbox
                          toggle
                          label="Closed"
                          checked={operatingHours[index].closed}
                          style={{ marginBottom: '1rem' }}
                          onChange={(event, { checked }) => {
                            setOperatingHours(update(index, {
                              ...operatingHours[index],
                              startTime: '00:00',
                              closeTime: '00:00',
                              closed: checked,
                            }));
                          }}
                        />
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
                disabled={loading}
                value={features}
              />
            </div>
  
            <PrimaryButton
              type="submit"
              primary
              onClick={onUpdate}
              loading={saving}
              disabled={
                isEmpty(name)
                || isEmpty(address)
                || description === null
                || picture === null
                || isEmpty(cuisineType)
                || isEmpty(phoneNumber)
              }
            >
              Update
            </PrimaryButton>
          </Form>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Payment',
      render: () => <PaymentDetails />,
    },
  ];

  return (
    <Wrapper>
      <InnerWrapper>
        <Header>
          {restaurant.name}
        </Header>
        <Tab
          panes={Panes}
        />
      </InnerWrapper>
    </Wrapper>
  );
};

Restaurant.propTypes = {
  userReducer: PropTypes.shape().isRequired,
  restaurant: PropTypes.shape().isRequired,
  captureRestaurant: PropTypes.func.isRequired,
};

export default Restaurant;
