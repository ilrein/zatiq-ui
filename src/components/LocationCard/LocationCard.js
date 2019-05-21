import React, { useState, useEffect } from 'react';
import {
  Card,
  Image,
  Segment,
} from 'semantic-ui-react';
import { Storage } from 'aws-amplify';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCard = styled(Segment)`
  padding: 0 !important;
  transition: all 0.25s ease-in-out;

  &:hover {
    transform: scale(1.025);
  }
`;

const LocationCard = ({ location }) => {
  const [fetchingImage, setFetchingImage] = useState(true);
  const [image, setImage] = useState(null);

  const getImage = async () => {
    try {
      const picture = await Storage.get(location.image);
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
    <StyledCard
      basic
      loading={fetchingImage}
    >
      <Card>
        <Image
          src={image}
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>
            {location.address}
          </Card.Header>
          <Card.Description>
            0 reservations today
          </Card.Description>
        </Card.Content>
      </Card>
    </StyledCard>
  );
};

LocationCard.propTypes = {
  location: PropTypes.shape().isRequired,
};

export default LocationCard;
