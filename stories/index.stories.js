import React from 'react';

/* eslint-disable */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import 'semantic-ui-css/semantic.min.css';

import Welcome from './welcome';

import NewUserWelcome from '../src/components/NewUserWelcome/NewUserWelcome';

storiesOf('Welcome', module)
  .add('to Storybook', () => <Welcome />);

storiesOf('NewUserWelcome', module)
  .add('Open', () => (
    <NewUserWelcome
      open
    />
  ));
