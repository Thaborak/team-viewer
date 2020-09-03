import React from 'react';
import { render } from '@testing-library/react';

import { InfoBox } from '..';

describe('<InfoBox  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<InfoBox />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
