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

import NewLocationModal from '../../../../components/NewLocationModal';

import {
  // API_COMPANY,
  API_LOCATIONS,
} from '../../../../constants';

const Body = ({
  userReducer,
  // company,
  locations,
}) => {
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
          
        },
        body: {
          location: {
            companyId: userReducer.user.companyId,
            address,
            image: key,
          },
        },
      });

      setSaving(false);
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };

  return (
    <>
      {
        locations.totalDocs > 0
          ? (
            <div>locations</div>
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
};

export default Body;
