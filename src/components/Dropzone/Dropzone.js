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
  handleDrop,
  defaultDropMessage,
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file),
    }));
    
    handleDrop(acceptedFiles[0]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

  return (
    <div {...getRootProps()}>
      <Segment placeholder>
        <input {...getInputProps()} />
        <Heading icon>
          <Icon name="image outline" />
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
  handleDrop: PropTypes.func,
  defaultDropMessage: PropTypes.string,
};

Dropzone.defaultProps = {
  handleDrop: () => {},
  defaultDropMessage: 'Drag & drop a file here, or click to select a file',
};

export default Dropzone;
