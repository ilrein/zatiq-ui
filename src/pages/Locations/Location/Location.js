import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Header,
  Image,
  Segment,
  Button,
  Icon,
  Divider,
  Statistic,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Storage } from 'aws-amplify';
// import fetch from 'isomorphic-fetch';

import fadeIn from '../../../anime/fadeIn';
import UpdateLocationModal from '../../../components/UpdateLocationModal';
// import {
//   API_COMPANY,
//   API_USERS,
// } from '../../constants';

const find = require('ramda/src/find');
const propEq = require('ramda/src/propEq');

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 1s ease;
`;

const InnerWrapper = styled.div`
  margin: 0.25rem 1rem;
`;

const SpreadHeader = styled.div`
  display: flex !important;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Locations = ({
  userReducer,
  locations,
  match,
}) => {
  const { user } = userReducer;

  const { params } = match;
  const { id } = params;

  const LOCATION = find(propEq('_id', id))(locations.docs);

  // update modal
  const [open, setOpen] = useState(false);

  // loading image
  const [fetchingImage, setFetchingImage] = useState(true);
  const [image, setImage] = useState(null);

  const getImage = async () => {
    // console.log(LOCATION);
    try {
      const picture = await Storage.get(LOCATION.image);
      setFetchingImage(false);
      setImage(picture);
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <Wrapper>
      {
        user._id
        && LOCATION
          ? (
            <InnerWrapper>
              <SpreadHeader>
                <Header style={{ margin: 0 }}>
                  {LOCATION.address}
                </Header>

                <Button
                  primary
                  icon
                  labelPosition="left"
                  onClick={() => setOpen(true)}
                  size="small"
                >
                  <Icon name="edit" />
                  Update
                </Button>
              </SpreadHeader>
              <Divider />
              <Segment
                basic
                loading={fetchingImage}
                style={{ padding: 0 }}
              >
                <Image
                  src={image}
                  size="large"
                />
              </Segment>
              <Divider />
              <Statistic
                value="10"
                label="Reservations"
              />
              <Statistic
                value="$430.25"
                label="Sales"
                color="green"
              />
            </InnerWrapper>
          )
          : null
      }
      <UpdateLocationModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </Wrapper>
  );
};

Locations.propTypes = {
  userReducer: PropTypes.shape().isRequired,
  locations: PropTypes.shape().isRequired,
};

export default Locations;
