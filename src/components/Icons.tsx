import React, { ForwardRefExoticComponent, ReactNode } from 'react';
import * as icons from '@storybook/icons';

const isIconKey = (key: string): key is keyof typeof icons => key in icons;

const getIcon = (iconKey: string): ForwardRefExoticComponent<{
  color: string
}> => {
  return isIconKey(iconKey) && '$$typeof' in icons[iconKey] ? icons[iconKey] as ForwardRefExoticComponent<{}> : null;
};

const Icons = ({ icon, color, def = null }: {
  icon: string;
  color?: string;
  def?: ReactNode;
}) => {
  const Comp = getIcon(icon);

  if (Comp) {
    return <Comp color={color} />;
  }

  return def;
};

export default Icons;
