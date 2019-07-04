import React, { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify';
import {
  Image,
  Segment,
} from 'semantic-ui-react';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 20rem;
  height: 10rem;
`;

const ImageContainer = (imageKey, ...restProps) => {
  const [fetchingImage, setFetchingImage] = useState(false);
  const [image, setImage] = useState(null);

  const getImage = async () => {
    setFetchingImage(true);
    try {
      const picture = await Storage.get(imageKey.imageKey);
      setImage(picture);
      setFetchingImage(false);
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };

  useEffect(() => {
    if (imageKey !== null) getImage();
  }, []);

  return (
    <>
      {
        image
        || fetchingImage
          ? (
            <Image
              size="medium"
              src={image}
              {...restProps}
            />
          )
          : (
            <Wrapper>
              <Segment
                loading
                fluid
                style={{ height: '15rem' }}
              >
                &nbsp;
              </Segment>
            </Wrapper>
          )
      }
    </>
  );
};

export default ImageContainer;
