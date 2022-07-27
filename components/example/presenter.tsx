import React from 'react';
import { Spinner, Heading } from '@chakra-ui/react';

export type Props = {
  prop1: string
};

// Logicless component with style for storybook
export const Presenter: React.FunctionComponent<Props> = ({ prop1 }) => (
  <>
    <Spinner />
    <Heading>
      {prop1}
    </Heading>
  </>
);
