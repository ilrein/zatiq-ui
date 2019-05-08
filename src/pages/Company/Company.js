import React, { useState } from 'react';
import {
  Form,
  Button,
} from 'semantic-ui-react';
import styled from 'styled-components';

import fadeIn from '../../anime/fadeIn';

const Wrapper = styled.div`
  display: flex;
  animation: ${fadeIn} 1s ease;
`;

const InnerWrapper = styled.div`
  margin: 0.25rem 1rem;
  width: 100%;
`;

const Company = () => {
  const [name, setName] = useState('');

  const onSubmit = () => {
    console.log('submit');
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <Form>
          <Form.Field>
            <label>
              Name
            </label>
            <input
              placeholder="Company name"
              value={name}
              onChange={(event, { value }) => setName(value)}
              fluid
            />
          </Form.Field>
          <Button
            type="submit"
            onClick={onSubmit}
          >
            Submit
          </Button>
        </Form>
      </InnerWrapper>
    </Wrapper>
  );
};

export default Company;
