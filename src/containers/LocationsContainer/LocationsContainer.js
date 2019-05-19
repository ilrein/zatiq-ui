import React, {
  useState,
  useEffect,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import isNil from 'ramda/src/isNil';
import { withRouter } from 'react-router-dom';

import {
  API_LOCATIONS,
  CAPTURE_LOCATIONS,
} from '../../constants';

const LocationsContainer = ({
  children,
  userReducer,
  captureLocations,
  // location,
}) => {
  const { user, cognitoUser } = userReducer;
  const { companyId } = user;
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);
  /**
   * Check for company
   * @param { sub } String
   */
  const getLocationsByCompanyId = async () => {
    if (!isNil(companyId)) {
      try {
        const get = await fetch(`${API_LOCATIONS}?companyId=${companyId}`, {
          headers: {
            'Content-Type': 'application/json',
            'jwt-token': jwtToken,
          },
        });

        const result = await get.json();
        captureLocations(result);
      } catch (error) {
        console.log(error); // eslint-disable-line
      }
    }
  };

  useEffect(() => {
    getLocationsByCompanyId();
  }, [companyId]);

  return (
    <>
      {children}
    </>
  );
};

LocationsContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape()),
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  userReducer: PropTypes.shape().isRequired,
  captureLocations: PropTypes.func.isRequired,
  // location: PropTypes.shape().isRequired,
  // company: PropTypes.shape().isRequired,
};

const mapDispatchToProps = dispatch => ({
  captureLocations: payload => dispatch({
    type: CAPTURE_LOCATIONS,
    payload,
  }),
});

export default connect(
  ({ userReducer, company }) => ({ userReducer, company }),
  mapDispatchToProps,
)(withRouter(LocationsContainer));
