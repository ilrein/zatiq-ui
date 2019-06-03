import React, { useState } from 'react';
import {
  Button,
  Header,
  Icon,
} from 'semantic-ui-react';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import fadeIn from '../../anime/fadeIn';
import {
  API_COMPANY,
} from '../../constants';
import NewItemModal from '../../components/NewItemModal';

const Wrapper = styled.div`
  display: flex;
  animation: ${fadeIn} 1s ease;
  height: 100%;
`;

const InnerWrapper = styled.div`
  margin: 0.25rem 1rem;
  width: 100%;
`;

const Items = ({
  userReducer,
  // company,
  // captureCompany,
  items,
}) => {
  // const { cognitoUser } = userReducer;
  // const token = cognitoUser.signInUserSession.idToken.jwtToken;

  const [newItemModalIsOpen, setNewItemModalOpen] = useState(false);

  return (
    <Wrapper>
      <InnerWrapper>
        <Header>
          Dishes
        </Header>
        {
          items.totalDocs === 0
            ? (
              <>
                <p>
                  No dishes found.
                  Add your first one now.
                </p>
                <Button
                  primary
                  icon
                  labelPosition="left"
                  onClick={() => setNewItemModalOpen(true)}
                >
                  <Icon name="plus" />
                  New Item
                </Button>
                <NewItemModal
                  open={newItemModalIsOpen}
                  onClose={() => setNewItemModalOpen(false)}
                />
              </>
            )
            : (
              <div>
                Dishes found.
              </div>
            )
        }
      </InnerWrapper>
    </Wrapper>
  );
};

Items.propTypes = {
  userReducer: PropTypes.shape().isRequired,
  items: PropTypes.shape().isRequired,
};

export default Items;
