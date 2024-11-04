import React, { Fragment, memo, useMemo } from "react";
import { type API, useParameter } from "storybook/internal/manager-api";
import { Separator } from "storybook/internal/components";
import { DEFAULT_CONFIG, KEY } from "../constants";
import { MultiToolbarParams } from "../types";
import MultiToolbar from "./MultiToolbar";

const createToolbars = (toolbars: MultiToolbarParams[], storyData: any) => {
  return toolbars.filter((toolbar) => {
    if (toolbar.filter) {
      if (typeof toolbar.filter === "function") {
        return toolbar.filter(storyData);
      }
      return toolbar.filter.test(storyData.title);
    }
    return true;
  });
};

export const Tool = memo(function MyAddonSelector({ api }: { api: API }) {
  const multiToolbarConfig = useParameter(KEY, DEFAULT_CONFIG);

  const toolbars = useMemo<MultiToolbarParams[]>(() => createToolbars(
    multiToolbarConfig.toolbars,
    api.getCurrentStoryData()
  ), [multiToolbarConfig]);

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
