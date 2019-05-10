import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import {
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react';

const Dropzone = ({ handleDrop }) => {
  const onDrop = useCallback((acceptedFiles) => {
    handleDrop(acceptedFiles[0]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <Segment placeholder>
        <input {...getInputProps()} />
        <Header icon>
          <Icon name="pdf file outline" />
          {
            isDragActive
              ? <p>Drop the files here ...</p>
              : <p>Drag & drop some files here, or click to select files</p>
          }
        </Header>
      </Segment>
    </div>
  );
};

Dropzone.propTypes = {
  handleDrop: PropTypes.func.isRequired,
};

export default Dropzone;
