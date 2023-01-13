import { Button } from "ui-react";
import type { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  tags: ["docsPage"],
};

// refs. https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Basic: Story = {
  args: {
    label: "Button",
  },
};

export const LongLabel: Story = {
  args: {
    ...Basic.args,
    label: "Button with a really long name",
  },
};

export default meta;
