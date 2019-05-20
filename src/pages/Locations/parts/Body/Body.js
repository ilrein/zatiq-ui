import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
} from 'semantic-ui-react';
import {
  Storage,
} from 'aws-amplify';
import fetch from 'isomorphic-fetch';
import uuidv4 from 'uuid/v4';
import { toast } from 'react-toastify';

import NewLocationModal from '../../../../components/NewLocationModal';
import LocationCard from '../../../../components/LocationCard';

import {
  API_COMPANY,
  API_LOCATIONS,
} from '../../../../constants';

const Body = ({
  userReducer,
  company,
  locations,
  captureLocation,
  captureCompany,
}) => {
  // tokens
  const { user, cognitoUser } = userReducer;
  const { companyId } = user;
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
            companyId,
            address: address.formatted_address,
            image: key,
          },
        }),
      });

      const newLocation = await createLocation.json();
      // console.log('newLocation', newLocation);

      const updateCompanyWithLocationId = await fetch(`${API_COMPANY}/${companyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
        body: JSON.stringify({
          company: {
            locations: [...company.locations, newLocation._id],
          },
        }),
      });

      // capture location & company here
      const updatedCompany = await updateCompanyWithLocationId.json();
      // console.log('updatedCompany', updatedCompany);
      captureCompany(updatedCompany);
      captureLocation(newLocation);
      toast.success(`Created new location @ ${address.formatted_address}`);
      
      setSaving(false);
      setSaving(false);
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
              {locations.docs.map(LOCATION => (
                <LocationCard
                  key={LOCATION._id}
                  location={LOCATION}
                />
              ))}
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
  captureCompany: PropTypes.func.isRequired,
  userReducer: PropTypes.shape().isRequired,
  company: PropTypes.shape().isRequired,
};

export default Body;
