import React from 'react';

/* eslint-disable */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import 'semantic-ui-css/semantic.min.css';

import Welcome from './welcome';
import CompanyForm from '../src/components/CompanyForm';;

storiesOf('Welcome', module)
  .add('to Storybook', () => <Welcome />);

storiesOf('CompanyForm', module)
  .add('default', () => <CompanyForm />);