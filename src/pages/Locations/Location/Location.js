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
import fetch from 'isomorphic-fetch';

import fadeIn from '../../../anime/fadeIn';
import UpdateLocationModal from '../../../components/UpdateLocationModal';
import DeleteLocationModal from '../../../components/DeleteLocationModal';
import {
  API_LOCATIONS,
  API_COMPANY,
} from '../../../constants';

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
  company,
  match,
  captureCompany,
  captureLocations,
  history,
}) => {
  const { user, cognitoUser } = userReducer;
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);
  const { companyId } = user;

  const { params } = match;
  const { id } = params;

  // grab the location from redux array rather than another request
  const LOCATION = find(propEq('_id', id))(locations.docs);

  // update
  const [open, setOpen] = useState(false);

  // delete
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // loading image
  const [fetchingImage, setFetchingImage] = useState(true);
  const [image, setImage] = useState(null);

  const getImage = async () => {
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

  const updateLocation = async () => {
  };

  const deleteLocation = async () => {
    /**
     * 1. remove the image from the bucket
     * 2. delete the location object in the DB
     * 3. update the company object to remove this location ref
     */
    try {
      setDeleting(true);
      await Storage.remove(LOCATION.image);

      await fetch(`${API_LOCATIONS}/${LOCATION._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
      });

      const put = await fetch(`${API_COMPANY}/${companyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
        body: JSON.stringify({
          company: {
            ...company,
            locations: company.locations.filter(locationId => locationId !== LOCATION._id),
          },
        }),
      });

      const updateCompanyResult = await put.json();
      captureCompany(updateCompanyResult);

      const getLocationsAgain = await fetch(API_LOCATIONS, {
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
      });

      const updatedLocations = await getLocationsAgain.json();
      captureLocations(updatedLocations);

      setDeleting(false);
      setDeleteModalOpen(false);
      history.push('/locations');
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };

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

                <div>
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
                  <Button
                    color="red"
                    icon
                    labelPosition="left"
                    onClick={() => setDeleteModalOpen(true)}
                    size="small"
                  >
                    <Icon name="remove" />
                    Delete
                  </Button>
                </div>
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
                value="0"
                label="Reservations"
                color="purple"
              />
              <Statistic
                value="$0.00"
                label="Sales"
                color="green"
              />
            </InnerWrapper>
          )
          : null
      }
      {/* <UpdateLocationModal
        open={open}
        onClose={() => setOpen(false)}
      /> */}

      <DeleteLocationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={deleteLocation}
        loading={deleting}
      />
    </Wrapper>
  );
};

Locations.propTypes = {
  userReducer: PropTypes.shape().isRequired,
  locations: PropTypes.shape().isRequired,
  company: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  captureCompany: PropTypes.func.isRequired,
  captureLocations: PropTypes.func.isRequired,
};

export default Locations;
