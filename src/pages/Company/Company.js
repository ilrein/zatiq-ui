import React, { useState } from 'react';
import {
  Form,
  Button,
} from 'semantic-ui-react';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';

import fadeIn from '../../anime/fadeIn';
import {
  API_COMPANY,
} from '../../constants';

const Wrapper = styled.div`
  display: flex;
  animation: ${fadeIn} 1s ease;
`;

const InnerWrapper = styled.div`
  margin: 0.25rem 1rem;
  width: 100%;
`;

const Company = ({
  userReducer,
  company,
  captureCompany,
}) => {
  const [name, setName] = useState(company.name);
  const { user, cognitoUser } = userReducer;

  const token = cognitoUser.signInUserSession.idToken.jwtToken;

  const [saving, setSaving] = useState(false);

  const onSubmit = async () => {
    setSaving(true);

    try {
      const post = await fetch(API_COMPANY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': token,
        },
        body: JSON.stringify({
          company: {
            name,
          },
        }),
      });
  
      const result = await post.json();
      captureCompany(result);
      setSaving(false);
    } catch (error) {
      console.log(error) // eslint-disable-line
    }
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <Form>
          <Form.Field>
            <label>
              Name
            </label>
            <Form.Input
              placeholder="Tesla Inc."
              value={name}
              onChange={(event, { value }) => setName(value)}
              fluid
            />
          </Form.Field>
          <Button
            type="submit"
            primary
            onClick={onSubmit}
            loading={saving}
          >
            Submit
          </Button>
        </Form>
      </InnerWrapper>
    </Wrapper>
  );
};

export default Company;
