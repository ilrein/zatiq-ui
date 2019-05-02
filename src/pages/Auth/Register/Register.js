import React, { useState } from 'react';
import {
  Container,
  Form,
  Header,
  Segment,
  Divider,
  Message,
  Checkbox,
} from 'semantic-ui-react';
import styled from 'styled-components';
// import { Auth } from 'aws-amplify';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import fadeIn from '../../../anime/fadeIn';

const Wrapper = styled.div`
  height: 100%;
  padding: 2rem 0;
  background-color: #eee;
  animation: ${fadeIn} 1s ease;
`;

const Register = () => {
  const [loading, setLoading] = useState(false);

  // form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  // form errors
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmationError, setPasswordConfirmationError] = useState(false);

  // emailTooShort: false,
  // passwordTooShort: false,
  // passwordsDontMatch: false,
  // cognitoErrorMessage: null,

  const handleSubmit = () => {
    const { history } = this.props;
    /**
     * form validations
     */
    if (email.length < 1) {
      setEmailError(true);
    }

    if (password.length < 7) {
      setPasswordError(true);
    }
    /**
     * Check if passwords match
     */
    if (password !== passwordConfirmation) {
      setPasswordConfirmationError(true);
    }

    if (
      email.length < 1
      || password.length < 7
      || password !== passwordConfirmation
    ) {
      return;
    } else {
      setEmailError(false);
      setPasswordError(false);
      setPasswordConfirmationError(false);
    }

    // send data here

    // toast.success(`Successfully created ${email}`);
    // history.push('/verify');
  }

  return (
    <Wrapper>
      <Container>
        <Header as="h1">
          Register
        </Header>
        <Segment
          color="blue"
        >
          {/* {
            cognitoErrorMessage
              ? (
                <Message error>
                  {cognitoErrorMessage}
                </Message>
              )
              : null
          } */}
          <Form>
            <Form.Input
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(event, { value }) => setEmail(value)}
              error={emailError}
              required
            />

            <Form.Input
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(event, { value }) => setPassword(value)}
              error={passwordError}
              required
            />

            <Form.Input
              label="Password confirmation"
              type="password"
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(event, { value }) => setPassword(value)}
              error={passwordConfirmationError}
              required
            />

            <Divider />

            <Form.Field>
              <Link to="/sign-in">
                Login instead
              </Link>
            </Form.Field>

            <Form.Button
              onClick={handleSubmit}
              primary
              loading={loading}
            >
              Submit
            </Form.Button>
          </Form>
        </Segment>
      </Container>
    </Wrapper>
  );
}

Register.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default withRouter(Register);
