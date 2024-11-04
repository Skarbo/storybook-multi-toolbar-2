import React from 'react';
import Example from './Example';
import { Meta, StoryFn } from '@storybook/react';

const meta: Meta<typeof Example> = {
  title: 'Example/Example',
  component: Example,
};

export default meta;
type Story = StoryFn<typeof Example>;

export const Default: Story = (args, context) => {
  console.log('context', context);
  return <Example data={context.globals} />;
};
