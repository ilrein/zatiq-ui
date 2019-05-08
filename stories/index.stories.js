import React from 'react';

/* eslint-disable */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import 'semantic-ui-css/semantic.min.css';

import Welcome from './welcome';

// import Navbar from '../src/components/Navbar';

storiesOf('Welcome', module)
  .add('to Storybook', () => <Welcome />);

// storiesOf('Navbar', module)
//   .add('default', () => <Navbar />);
