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
import { Link } from 'react-router-dom';

const StyledCard = styled(Segment)`
  padding: 0 !important;
  transition: all 0.25s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.025);
  }
  margin-bottom: 1rem !important;
`;

const DishCard = ({ doc }) => {
  const [fetchingImage, setFetchingImage] = useState(false);
  const [image, setImage] = useState(null);

  const getImage = async () => {
    setFetchingImage(true);
    try {
      const picture = await Storage.get(doc.image);
      setImage(picture);
      setFetchingImage(false);
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };

  useEffect(() => {
    if (doc.image !== null) getImage();
  }, []);

  return (
    <StyledCard
      basic
      loading={fetchingImage}
      compact
      key={doc._id}
    >
      <Link
        to={`/dishes/${doc._id}`}
        style={{ height: 'max-content' }}
      >
        <Card>
          {
            doc.image
              ? (
                <Image
                  src={image}
                  wrapped
                  ui={false}
                  size="medium"
                />
              )
              : null
          }
          <Card.Content>
            <Card.Header>
              {doc.name}
            </Card.Header>
            <Card.Description>
              {doc.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            Price:
            &nbsp;
            {formatUSD({ amount: Object.values(doc.price)[0] })}
          </Card.Content>
        </Card>
      </Link>
    </StyledCard>
  );
};

DishCard.propTypes = {
  doc: PropTypes.shape().isRequired,
};

export default DishCard;
