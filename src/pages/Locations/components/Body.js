import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
} from 'semantic-ui-react';

import NewLocationModal from '../../../components/NewLocationModal';

const Body = ({
  locations,
}) => {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const onSubmit = () => {};

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
