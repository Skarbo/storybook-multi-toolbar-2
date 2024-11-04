import React, { Fragment, memo, useState } from 'react';
import { type API, useChannel, useParameter } from 'storybook/internal/manager-api';
import { Separator } from 'storybook/internal/components';
import { STORY_RENDERED } from 'storybook/internal/core-events';
import { DEFAULT_CONFIG, KEY } from '../constants';
import { MultiToolbarParams } from '../types';
import MultiToolbar from './MultiToolbar';

const createToolbars = (toolbars: MultiToolbarParams[], storyData: any) => {
  return toolbars.filter((toolbar) => {
    if (toolbar.filter) {
      if (typeof toolbar.filter === 'function') {
        return toolbar.filter(storyData);
      }
      return toolbar.filter.test(storyData.title);
    }
    return true;
  });
};

export const Tool = memo(function MyAddonSelector({ api }: { api: API }) {
  const multiToolbarConfig = useParameter(KEY, DEFAULT_CONFIG);
  const [toolbars, setToolbars] = useState([] as MultiToolbarParams[]);

  useChannel(
    {
      [STORY_RENDERED]: () =>
        setToolbars(
          createToolbars(
            multiToolbarConfig.toolbars,
            api.getCurrentStoryData(),
          ),
        ),
    },
    [multiToolbarConfig],
  );

  if (multiToolbarConfig.disable || toolbars.length === 0) {
    return null;
  }

  return (
    <>
      <Separator />

      {toolbars.map((toolbar, index) => (
        <Fragment key={toolbar.param}>
          {index !== 0 && toolbar.separator && <Separator />}
          <MultiToolbar toolbar={toolbar} />
        </Fragment>
      ))}
    </>
  );
});
