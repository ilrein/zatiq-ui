import React, { useState } from 'react';
import {
  Modal,
  Header,
  Button,
  Icon,
  Form,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SpreadHeader = styled(Header)`
  display: flex !important;
  flex-direction: row;
  justify-content: space-between;
`;

const NewTagModal = ({
  onSubmit,
  open,
  loading,
  onClose,
}) => {
  const [tags, setTags] = useState([]);

  const addTag = () => {};

  const removeTag = () => {};

  return (
    <Modal
      open={open}
      size="small"
    >
      <SpreadHeader>
        <>New Tag</>

        <Icon
          name="close"
          onClick={onClose}
          style={{ cursor: 'pointer' }}
        />
      </SpreadHeader>
      <Modal.Content>
        <Form>
          <Form.Input
            label="Name"
          />

          <Button
            primary
            type="submit"
            onClick={onSubmit}
            style={{ marginTop: '1rem' }}
            loading={loading}
          >
            Submit
          </Button>


          <Button
            primary
            type="submit"
            onClick={onSubmit}
            style={{ marginTop: '1rem' }}
            loading={loading}
          >
            Submit
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

NewTagModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NewTagModal;
