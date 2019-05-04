import React, { Component } from 'react';
import {
  Container,
  Form,
  Header,
  Segment,
  Divider,
  Message,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import fetch from 'isomorphic-fetch';

import {
  API_URL,
} from '../../../constants';

import fadeIn from '../../../anime/fadeIn';

const Wrapper = styled.div`
  height: 100%;
  padding: 2rem 0;
  background-color: #eee;
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
    }), async () => {
      try {
        const post = fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: email,
            password,
          })
        })

        const result = await post.json();
          
        toast.success(`Signed in ${email}`);
        history.push('/dashboard');

      } catch (error) {
        this.setState(prevState => ({
          ...prevState,
          loading: false,
          errorMsg: JSON.stringify(error),
        }));
      }
    });
  }

  render() {
    const {
      loading,
      // email,
      // password,
      errorMsg,
    } = this.state;

    return (
      <Wrapper>
        <Container>
          <Header as="h1">
            Sign In
          </Header>
          <Segment
            color="blue"
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

              <Divider />

              <Form.Field>
                <Link to="/register">
                  Register an account
                </Link>
              </Form.Field>

              <Form.Field>
                <Link to="/verify">
                  Verify an email
                </Link>
              </Form.Field>

              <Form.Button
                onClick={this.handleSubmit}
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
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default withRouter(Login);
