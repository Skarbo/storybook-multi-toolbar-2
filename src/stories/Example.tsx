import React from 'react';

type Props = {
  data: object;
};

const Example = ({ data }: Props) => {
  return (
    <div>
      <strong>Globals</strong>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Example;
