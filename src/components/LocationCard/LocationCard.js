import React, { useState, useEffect } from 'react';
import {
  Card,
  Image,
  Segment,
} from 'semantic-ui-react';
import { Storage } from 'aws-amplify';
import PropTypes from 'prop-types';

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
    <Card>
      <Card.Header>
        {location.address}
      </Card.Header>
      <Card.Description>
        <Segment basic loading={fetchingImage}>
          <Image src={image} />
        </Segment>
      </Card.Description>
    </Card>
  );
};

LocationCard.propTypes = {
  location: PropTypes.shape().isRequired,
};

export default LocationCard;
