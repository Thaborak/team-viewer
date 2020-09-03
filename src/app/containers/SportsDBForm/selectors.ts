import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

// First select the relevant part from the state
const selectDomain = (state: RootState) =>
  state.sportsDbRepoForm || initialState;

export const selectName = createSelector(
  [selectDomain],
  teamFormState => teamFormState.teamname,
);

export const selectLoading = createSelector(
  [selectDomain],
  teamFormState => teamFormState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  teamFormState => teamFormState.error,
);

export const selectTeam = createSelector(
  [selectDomain],
  teamFormState => teamFormState.teams,
);
