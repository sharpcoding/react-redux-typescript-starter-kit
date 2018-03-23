import * as dateFns from 'date-fns';
import * as _ from 'lodash';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { BubbleChart } from '../../../src/components';

describe('Bubble Chart Component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<BubbleChart backgroundColor='red' dots={[]} width={1024} height={768} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});