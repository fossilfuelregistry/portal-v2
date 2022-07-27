/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Presenter } from './presenter';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Directory/Component',
  component: Presenter,
  decorators: [],
} as ComponentMeta<typeof Presenter>;

// 👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Presenter> = (args) => <Presenter {...args} />;

export const FirstCase = Template.bind({});
FirstCase.args = {
  prop1: 'Test',
};
FirstCase.storyName = 'Name of the first case';
