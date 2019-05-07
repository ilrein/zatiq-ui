import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import PropTypes from 'prop-types';

const PlacesAutoComplete = ({ onPlaceSelected, placeholder }) => (
  <div className="ui input fluid">
    <Autocomplete
      onPlaceSelected={place => onPlaceSelected(place)}
      types={['address']}
      componentRestrictions={{ country: 'CA' }}
      placeholder={placeholder}
    />
  </div>
);

PlacesAutoComplete.propTypes = {
  onPlaceSelected: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

PlacesAutoComplete.defaultProps = {
  placeholder: '',
};

export default PlacesAutoComplete;
