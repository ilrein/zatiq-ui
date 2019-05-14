import React, { useState } from 'react';
import {
  Modal,
  Header,
  Button,
  Icon,
  Form,
  Label,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const find = require('ramda/src/find');
const propEq = require('ramda/src/propEq');

const SpreadHeader = styled(Header)`
  display: flex !important;
  flex-direction: row;
  justify-content: space-between;
`;

const TagLabel = (tag, onDelete) => (
  <>
    <Label>
      {tag}
      <Icon
        name="delete"
        style={{ cursor: 'pointer' }}
        onClick={onDelete}
      />
    </Label>
  </>
);

const NewTagModal = ({
  onSubmit,
  open,
  loading,
  onClose,
}) => {
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);

  const addTag = TAG => setTags([...tags, TAG]);

  const addTagAction = () => {
    addTag(tag);
    setTag('');
  };

  const removeTag = (TAG) => {
    console.log(TAG);
  };

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
            value={tag}
            onChange={(event, { value }) => setTag(value)}
            action={{
              icon: 'plus',
              onClick: () => addTagAction(),
            }}
          />

          {/* {
            tags.map(TAG => (
              <TagLabel
                key={TAG}
                tag={TAG}
                onDelete={removeTag}
              />
            ))
          } */}

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
