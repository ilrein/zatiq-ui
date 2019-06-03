import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
} from 'semantic-ui-react';

// import NewLocationModal from '../../../components/NewLocationModal';
/* eslint-disable */
const Body = ({
  menus,
}) => {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const onSubmit = () => {};

  return (
    <>
      {
        menus.totalDocs > 0
          ? (
            <div>menus</div>
          )
          : (
            <>
              <p>
                No menus found.
                Add your first one now.
              </p>
              <Button
                primary
                icon
                labelPosition="left"
                onClick={() => setOpen(true)}
              >
                <Icon name="plus" />
                New Menu
              </Button>
            </>
          )
      }
  
      {/* <NewLocationModal
        open={open}
        onSubmit={onSubmit}
        loading={saving}
        onClose={() => setOpen(false)}
      /> */}
    </>
  );
};

Body.propTypes = {
  menus: PropTypes.shape().isRequired,
};

export default Body;
