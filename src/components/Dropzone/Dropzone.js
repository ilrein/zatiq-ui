import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import {
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react';
import styled from 'styled-components';

const Heading = styled(Header)`
  margin: 0 !important;
  &::before {
    background-color: transparent !important;
  }
`;

const Dropzone = ({
  onDrop,
  defaultDropMessage,
}) => {
  const handleDrop = useCallback((acceptedFiles) => {
    onDrop(acceptedFiles[0]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({ handleDrop });

  return (
    <div {...getRootProps()}>
      <Segment placeholder>
        <input {...getInputProps()} />
        <Heading icon>
          <Icon name="pdf file outline" />
          {
            isDragActive
              ? <p>Drop the file here ...</p>
              : <p>{defaultDropMessage}</p>
          }
        </Heading>
      </Segment>
    </div>
  );
};

Dropzone.propTypes = {
  onDrop: PropTypes.func,
  defaultDropMessage: PropTypes.string,
};

Dropzone.defaultProps = {
  onDrop: () => {},
  defaultDropMessage: 'Drag & drop a file here, or click to select a file',
};

export default Dropzone;
