import React, { useState, useEffect } from 'react';
import {
  Card,
  Image,
  Segment,
} from 'semantic-ui-react';
import { Storage } from 'aws-amplify';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import formatUSD from 'format-usd';

const StyledCard = styled(Segment)`
  padding: 0 !important;
  transition: all 0.25s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.025);
  }
`;

const DishCard = ({ dish }) => {
  const [fetchingImage, setFetchingImage] = useState(true);
  const [image, setImage] = useState(null);

  const getImage = async () => {
    try {
      const picture = await Storage.get(dish.image);
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
      compact
    >
      <Card>
        <Image
          src={image}
          wrapped
          ui={false}
          size="medium"
        />
        <Card.Content>
          <Card.Header>
            {dish.name}
          </Card.Header>
          <Card.Description>
            {dish.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          Price:
          &nbsp;
          {formatUSD({ amount: Object.values(dish.price)[0] })}
        </Card.Content>
      </Card>
    </StyledCard>
  );
};

DishCard.propTypes = {
  dish: PropTypes.shape().isRequired,
};

export default DishCard;
