import type { MultiToolbarList, MultiToolbarListItemToggle } from '../types';
import React, { Fragment } from 'react';
import { TooltipLinkList } from 'storybook/internal/components';
import { styled } from 'storybook/internal/theming';
import Icons from './Icons';

const Title = styled.div(({ theme }) => ({
  padding: '7px 15px',
  fontWeight: theme.typography.weight.bold,
}));

const ItemSeparator = styled.div(() => ({
  margin: '0 15px',
  backgroundColor: '#cfcfcf',
  height: 1,
}));

type Props = {
  lists: MultiToolbarList[];
  activeValue: Record<string, unknown>;
  onChange: (list: MultiToolbarList, value: unknown, param: string) => void;
};

const MultiToolbarLists: React.FC<Props> = ({
  lists,
  activeValue,
  onChange,
}) => (
  <>
    {lists.map((list, index) => (
      <Fragment key={list.param || String(index)}>
        {index !== 0 && <ItemSeparator />}

        {list.title && <Title>{list.title}</Title>}

        <TooltipLinkList
          links={list.items.map((item) => {
            const param =
              list.type === 'toggle'
                ? (item as MultiToolbarListItemToggle).param
                : list.param;
            let right = item.right || '';
            let active = activeValue[param] == item.value;

            // toggle
            if (list.type === 'toggle') {
              if (item.value !== undefined) {
                active = activeValue[param] === item.value;
              } else {
                active = !!activeValue[param];
              }

              // set right as check icon if no icon is set
              if (!item.right) {
                right = 'icon:CheckIcon';
              }
            }

            return {
              id: item.title,
              title: item.title,
              active,
              left: item.left,
              right: right && <Icons
                icon={right.replace('icon:', '')}
                def={item.right}
              />,
              center: item.center,
              onClick: () => onChange(list, item.value, param),
            };
          })}
        />
      </Fragment>
    ))}
  </>
);

export default MultiToolbarLists;
