import React, { useState } from 'react';
import {
  Grid,
  Image,
  Form,
  Message,
  Header,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

// utils
import fadeIn from '../../../anime/fadeIn';
import PrimaryButton from '../../../components/PrimaryButton';

// images
import Logo from '../../../images/logo.png';
import WaiterService from '../../../images/waiter-service.png';

const Wrapper = styled.div`
  background-color: #eee;
  padding-top: 2rem;
  min-height: 100%;
  animation: ${fadeIn} 1s ease;
`;

const ResetPassword = ({ history }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const submit = () => {
    setLoading(true);

    Auth.forgotPasswordSubmit(email, code, password)
      .then(() => {
        toast.success(`Reset password for ${email}`);
        history.push('/');
      })
      .catch(({ message }) => setErrorMsg(message));

    setLoading(false);
  };

  return (
    <Wrapper>
      <Grid>
        <Grid.Column
          computer="8"
          tablet="8"
          mobile="16"
          style={{
            padding: '4rem',
          }}
        >
          <Image
            src={Logo}
            size="small"
            style={{
              marginBottom: '3rem',
            }}
          />

          <Header as="h1">
            Reset Password
          </Header>

          <p>
            Enter your email & your recovery code to reset your password.
          </p>

          {
            errorMsg
              ? (
                <Message error>
                  {errorMsg}
                </Message>
              )
              : null
          }

          <Form>
            <Form.Input
              label="Email"
              type="email"
              value={email}
              required
              name="email"
              onChange={(event, { value }) => setEmail(value)}
              placeholder="hello@gmail.com"
            />

            <Form.Input
              label="Code"
              type="text"
              value={code}
              required
              name="code"
              onChange={(event, { value }) => setCode(value)}
              placeholder="419239"
            />

            <Form.Input
              label="New Password"
              type="password"
              value={password}
              required
              name="password"
              onChange={(event, { value }) => setPassword(value)}
            />

            <PrimaryButton
              primary
              onClick={submit}
              loading={loading}
              style={{ margin: '1rem 0 2rem 0' }}
              disabled={email === '' || code === '' || password === ''}
            >
              Submit
            </PrimaryButton>

            <Form.Field>
              Already a member? Log in
              <Link to="/">
                &nbsp;here
              </Link>
            </Form.Field>
          </Form>
        </Grid.Column>

        <Grid.Column
          computer="8"
          tablet="8"
          mobile="16"
        >
          <Image
            src={WaiterService}
            size="huge"
          />
        </Grid.Column>
      </Grid>
    </Wrapper>
  );
};

ResetPassword.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default withRouter(ResetPassword);
