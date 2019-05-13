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

const Dropzone = ({ onDrop }) => {
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
              ? <p>Drop the files here ...</p>
              : <p>Drag & drop some files here, or click to select files</p>
          }
        </Heading>
      </Segment>
    </div>
  );
};

Dropzone.propTypes = {
  onDrop: PropTypes.func,
};

Dropzone.defaultProps = {
  onDrop: () => {},
};

export default Dropzone;
