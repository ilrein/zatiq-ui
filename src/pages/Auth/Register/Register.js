import React, { Component } from 'react';
import {
  Form,
  Segment,
  Message,
  Grid,
  Image,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

// utils
import fadeIn from '../../../anime/fadeIn';
import copy from './copy.json';
import PrimaryButton from '../../../components/PrimaryButton';

// images
import Logo from '../../../images/logo.png';
import WaiterService from '../../../images/waiter-service.png';

const Wrapper = styled.div`
  height: 100%;
  padding: 2rem 0;
  background-color: #eee;
  animation: ${fadeIn} 1s ease;
`;

const Caption = styled.p`
  padding: 0.5rem 0;
`;

class Register extends Component {
  state = {
    // UI phases
    loading: false,

    // fields
    email: '',
    password: '',
    passwordConfirmation: '',

    // errors
    emailTooShort: false,
    passwordTooShort: false,
    passwordsDontMatch: false,
    cognitoErrorMessage: null,
  }
  /**
   * sets a state value dynamically
   */

  setValue = ({ name, value }) => this.setState(prevState => ({
    ...prevState,
    [name]: value,
  }));

  handleSubmit = () => {
    const { history } = this.props;
    const {
      email,
      password,
      passwordConfirmation,
    } = this.state;
    /**
     * form validations
     */
    if (email.length < 1) {
      this.setState(prevState => ({
        ...prevState,
        emailTooShort: true,
      }));
      return;
    }

    if (password.length < 7) {
      this.setState(prevState => ({
        ...prevState,
        passwordTooShort: true,
      }));
      return;
    }
    /**
     * Check if passwords match
     */
    if (password !== passwordConfirmation) {
      this.setState(prevState => ({
        ...prevState,
        passwordsDontMatch: true,
      }));
      return;
    }

    this.setState(prevState => ({
      ...prevState,
      emailTooShort: false,
      passwordTooShort: false,
      passwordsDontMatch: false,
      loading: true,
    }), () => {
      Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
        },
      })
        .then(() => {
          toast.success(`Successfully created ${email}`);
          history.push('/verify');
        })
        .catch(({
          message,
        }) => this.setState(prevState => ({
          ...prevState,
          loading: false,
          cognitoErrorMessage: message,
        })));
    });
  }

  render() {
    const {
      loading,

      // fields
      email,
      password,
      passwordConfirmation,

      // errors
      emailTooShort,
      passwordTooShort,
      passwordsDontMatch,
      cognitoErrorMessage,
    } = this.state;

    return (
      <Wrapper
        className="fadeIn animated"
      >
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

            <Caption>
              {copy.home.register}
            </Caption>

            <Segment
              basic
              style={{ padding: 0 }}
            >
              {
                cognitoErrorMessage
                  ? (
                    <Message error>
                      {cognitoErrorMessage}
                    </Message>
                  )
                  : null
              }
              <Form>
                <Form.Input
                  label="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event, data) => this.setValue(data)}
                  error={emailTooShort}
                  required
                />

                <Form.Input
                  label="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(event, data) => this.setValue(data)}
                  error={passwordTooShort}
                  required
                />

                <Form.Input
                  label="Password confirmation"
                  type="password"
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  onChange={(event, data) => this.setValue(data)}
                  error={passwordsDontMatch}
                  required
                />

                <PrimaryButton
                  onClick={this.handleSubmit}
                  loading={loading}
                  style={{ marginBottom: '6rem' }}
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
            </Segment>
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
  }
}

Register.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default withRouter(Register);
