import React, { Component } from 'react';
import {
  Form,
  Segment,
  Message,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import fadeIn from '../../../anime/fadeIn';
import PrimaryButton from '../../../components/PrimaryButton';

const Wrapper = styled.div`
  animation: ${fadeIn} 1s ease;
`;

class Login extends Component {
  state = {
    loading: false,
    email: '',
    password: '',
    errorMsg: null,
  }

  setValue = ({ name, value }) => this.setState(prevState => ({
    ...prevState,
    [name]: value,
  }));

  handleSubmit = () => {
    const { history } = this.props;
    const {
      email,
      password,
    } = this.state;
    this.setState(prevState => ({
      ...prevState,
      loading: true,
    }), () => {
      Auth.signIn({
        username: email,
        password,
      })
        .then(() => {
          toast.success(`Signed in ${email}`);
          history.push('/dashboard');
        })
        .catch(({ message }) => {
          this.setState(prevState => ({
            ...prevState,
            loading: false,
            errorMsg: message,
          }));
        });
    });
  }

  render() {
    const {
      loading,
      errorMsg,
    } = this.state;

    return (
      <Wrapper>
        <Segment
          basic
          style={{ padding: 0 }}
        >
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
              name="email"
              onChange={(event, data) => this.setValue(data)}
            />

            <Form.Input
              label="Password"
              type="password"
              name="password"
              onChange={(event, data) => this.setValue(data)}
            />

            <PrimaryButton
              onClick={this.handleSubmit}
              color="pink"
              loading={loading}
              style={{ margin: '1rem 0 2rem 0' }}
            >
              Login
            </PrimaryButton>

            <Form.Field>
              Not a member yet? Sign up
              <Link to="/register">
                &nbsp;here
              </Link>
            </Form.Field>

            <Form.Field>
              <Link to="/forgot-password">
                Forgot password?
              </Link>
            </Form.Field>

            <Form.Field>
              <Link to="/verify">
                Verify an email
              </Link>
            </Form.Field>
          </Form>
        </Segment>
      </Wrapper>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default withRouter(Login);
