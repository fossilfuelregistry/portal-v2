import React from 'react';
import { Presenter } from './presenter';

export type ExampleProps = {
  prop1: string
};

// Logic in this component
const Example:React.FunctionComponent<ExampleProps> = ({ prop1 }) => <Presenter prop1={prop1} />;

export default Example;
