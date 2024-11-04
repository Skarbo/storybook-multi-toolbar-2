import { MultiToolbarParameters } from "./types";

export const ADDON_ID = "skarbo/multi-toolbar";
export const TOOL_ID = `${ADDON_ID}/tool`;
export const KEY = `multiToolbar`;

export const DEFAULT_CONFIG: MultiToolbarParameters = {
  disable: false,
  toolbars: []
};

export const EVENTS = {
  RESULT: `${ADDON_ID}/result`,
  REQUEST: `${ADDON_ID}/request`
};
