import React from 'react';
import {
  Modal,
  Header,
  Button,
  Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SpreadHeader = styled(Header)`
  display: flex !important;
  flex-direction: row;
  justify-content: space-between;
`;

const NewLocationModal = ({
  onDelete,
  open,
  loading,
  onClose,
}) => (
  <Modal
    open={open}
    size="small"
  >
    <SpreadHeader>
      <>Delete Location</>

      <Icon
        name="close"
        onClick={onClose}
        style={{ cursor: 'pointer' }}
      />
    </SpreadHeader>
    <Modal.Content>
      <p>
        Are you sure you want to delete this location?
        &nbsp;
        <b>This action is permanent.</b>
      </p>
      <Button
        color="red"
        type="submit"
        onClick={onDelete}
        style={{ marginTop: '1rem' }}
        loading={loading}
      >
        Submit
      </Button>
    </Modal.Content>
  </Modal>
);

NewLocationModal.propTypes = {
  onDelete: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NewLocationModal;
