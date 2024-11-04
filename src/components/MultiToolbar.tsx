import type { MultiToolbarList, MultiToolbarParams } from '../types';
import { useGlobals, useGlobalTypes } from 'storybook/internal/manager-api';
import React, { useCallback, useEffect, useState } from 'react';
import { IconButton, WithTooltip } from 'storybook/internal/components';
import MultiToolbarLists from './MultiToolbarLists';
import Icons from './Icons';
import { StructureIcon } from '@storybook/icons';

type Props = { toolbar: MultiToolbarParams };

const createToolbarValues = (
  values: Record<string, unknown>,
): Record<string, unknown> => {
  return Object.entries(values).reduce((acc, [key, value]) => {
    acc[key] = value;

    if (typeof value === 'string') {
      try {
        acc[key] = JSON.parse(value);
      } catch (err) {
        // ignore
      }
    }

    return acc;
  }, {} as Record<string, unknown>);
};

const MultiToolbar: React.FC<Props> = ({ toolbar }) => {
  const [globals, updateGlobals] = useGlobals();
  const [active, setActive] = useState(false);
  const globalTypes = useGlobalTypes();
  const values = createToolbarValues(globals[toolbar.param] || {});

  useEffect(() => {
    if (globalTypes[toolbar.param]) {
      setActive(
        JSON.stringify(globalTypes[toolbar.param].defaultValue) !==
        JSON.stringify(values),
      );
    }
  }, [globals, values]);

  const onChange = useCallback(
    (list: MultiToolbarList, value: unknown, param: string) => {
      const newValues = {
        ...globals,
        [toolbar.param]: {
          ...values,
          [param]: value,
        },
      };

      // toggle
      if (list.type === 'toggle') {
        if (typeof value === 'undefined') {
          if (
            Object.prototype.hasOwnProperty.call(
              globals?.[toolbar.param],
              param,
            )
          ) {
            delete newValues[toolbar.param][param];
          } else {
            newValues[toolbar.param][param] = true;
          }
        } else if (globals?.[toolbar.param]?.[param] === value) {
          delete newValues[toolbar.param][param];
        } else {
          newValues[toolbar.param][param] = value;
        }
      }

      updateGlobals(newValues);
    },
    [values, globals],
  );

  return (
    <WithTooltip
      tooltip={({ onHide }) => (
        <MultiToolbarLists
          activeValue={values}
          lists={toolbar.lists}
          onChange={(list, value, param) => {
            onChange(list, value, param);
            onHide();
          }}
        />
      )}
      trigger="click"
      closeOnOutsideClick
    >
      <IconButton active={active} title={toolbar.description || toolbar.name}>
        <Icons icon={toolbar.icon} def={<StructureIcon />} />
      </IconButton>
    </WithTooltip>
  );
};

export default MultiToolbar;
