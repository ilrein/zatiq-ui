import React, { Component } from 'react';
import {
  Container,
  Header,
  Form,
  Message,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import fadeIn from '../../../anime/fadeIn';

const Wrapper = styled.div`
  background-color: #eee;
  padding-top: 2rem;
  min-height: 100%;
  animation: ${fadeIn} 1s ease;
`;

class Verify extends Component {
  state = {
    loading: false,
    email: '',
    verificationCode: '',
    errorMsg: null,
  }

  setValue = ({ name, value }) => this.setState(prevState => ({
    ...prevState,
    [name]: value,
  }));

  submit = () => {
    const { history } = this.props;
    const {
      email,
      verificationCode,
      // loading,
    } = this.state;

    this.setState(prevState => ({
      ...prevState,
      loading: true,
    }), () => {
      Auth.confirmSignUp(
        email,
        verificationCode,
      )
        .then(() => {
          toast.success(`Verified ${email}`);
          history.push('/login');
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
      email,
      verificationCode,
      loading,
      errorMsg,
    } = this.state;

    return (
      <Wrapper>
        <Container>
          <Header as="h1">
            A verification code has been sent to your email.
          </Header>

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
              onChange={(event, data) => this.setValue(data)}
            />

            <Form.Input
              label="Verification Code"
              type="text"
              value={verificationCode}
              required
              name="verificationCode"
              onChange={(event, data) => this.setValue(data)}
            />

            <Form.Button
              primary
              onClick={this.submit}
              loading={loading}
            >
              Submit
            </Form.Button>
          </Form>
        </Container>
      </Wrapper>
    );
  }
}

Verify.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default withRouter(Verify);
