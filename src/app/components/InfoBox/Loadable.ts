/**
 *
 * Asynchronously loads the component for InfoBox
 *
 */

import { lazyLoad } from 'utils/loadable';

export const InfoBox = lazyLoad(
  () => import('./index'),
  module => module.InfoBox,
);
