import { useState } from 'react';

// make function to force update to react components
// see https://stackoverflow.com/questions/53215285/how-can-i-force-component-to-re-render-with-hooks-in-react/55862077#55862077
export const useForceRefresh = () => {
  const [, setTick] = useState(0);
  const update = () => {
    setTick(tick => tick + 1);
  };
  return update;
};
