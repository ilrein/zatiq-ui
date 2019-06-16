import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Button,
  Icon,
} from 'semantic-ui-react';
import {
  Storage,
} from 'aws-amplify';
import fetch from 'isomorphic-fetch';
import uuidv4 from 'uuid/v4';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import NewLocationModal from '../../../../components/NewLocationModal';
import LocationCard from '../../../../components/LocationCard';

import {
  API_RESTAURANT,
  API_LOCATIONS,
} from '../../../../constants';

const Body = ({
  userReducer,
  restaurant,
  locations,
  captureLocation,
  captureRestaurant,
}) => {
  // tokens
  const { user, cognitoUser } = userReducer;
  const { restaurantId } = user;
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);

  // states
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const onSubmit = async (address, addressImage) => {
    setSaving(true);

    try {
      const PUT = await Storage.put(
        (`${uuidv4()}-${addressImage.name}`).replace(/\s/g, ''),
        addressImage,
        { level: 'public' },
      );

      const { key } = PUT;

      const createLocation = await fetch(`${API_LOCATIONS}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
        body: JSON.stringify({
          location: {
            restaurantId,
            address: address.formatted_address,
            image: key,
          },
        }),
      });

      const newLocation = await createLocation.json();
      // console.log('newLocation', newLocation);

      const updaterestaurantWithLocationId = await fetch(`${API_RESTAURANT}/${restaurantId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
        body: JSON.stringify({
          restaurant: {
            locations: [...restaurant.locations, newLocation._id],
          },
        }),
      });

      // capture location & restaurant here
      const updatedrestaurant = await updaterestaurantWithLocationId.json();
      // console.log('updatedrestaurant', updatedrestaurant);
      captureRestaurant(updatedrestaurant);
      captureLocation(newLocation);
      toast.success(`Created new location @ ${address.formatted_address}`);
      
      setSaving(false);
      setOpen(false);
    } catch (error) {
      console.log(error); // eslint-disable-line
      setSaving(false);
    }
  };

  return (
    <>
      {
        locations.totalDocs > 0
          ? (
            <>
              <Button
                primary
                icon
                labelPosition="left"
                onClick={() => setOpen(true)}
              >
                <Icon name="plus" />
                New Location
              </Button>

              <Grid style={{ marginTop: '0.5rem' }}>
                <Grid.Row columns="equal">
                  {locations.docs.map(LOCATION => (
                    <Grid.Column key={LOCATION._id}>
                      <Link to={`/locations/${LOCATION._id}`}>
                        <LocationCard
                          key={LOCATION._id}
                          location={LOCATION}
                        />
                      </Link>
                    </Grid.Column>
                  ))}
                </Grid.Row>
              </Grid>
            </>
          )
          : (
            <>
              <p>
                No locations found.
                Add your first one now.
              </p>
              <Button
                primary
                icon
                labelPosition="left"
                onClick={() => setOpen(true)}
              >
                <Icon name="plus" />
                New Location
              </Button>
            </>
          )
      }
  
      <NewLocationModal
        open={open}
        onSubmit={onSubmit}
        loading={saving}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

Body.propTypes = {
  locations: PropTypes.shape().isRequired,
  captureLocation: PropTypes.func.isRequired,
  captureRestaurant: PropTypes.func.isRequired,
  userReducer: PropTypes.shape().isRequired,
  restaurant: PropTypes.shape().isRequired,
};

export default Body;
