/*
 * SportsDBForm Slice
 *
 * Here we define:
 * - The shape of our container's slice of Redux store,
 * - All the actions which can be triggered for this slice, including their effects on the store.
 *
 * Note that, while we are using dot notation in our reducer, we are not actually mutating the state
 * manually. Under the hood, we use immer to apply these updates to a new copy of the state.
 *
 */

import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, TeamErrorType } from './types';
import { Team } from 'types/Team';

// The initial state of the SportsDBForm container
export const initialState: ContainerState = {
  teamname: 'new_york_giants',
  teams: [],
  loading: false,
  error: null,
};

const sportsDbFormSlice = createSlice({
  name: 'sportsDbRepoForm',
  initialState,
  reducers: {
    changeTeamName(state, action: PayloadAction<string>) {
      state.teamname = action.payload;
    },
    loadTeam(state) {
      state.loading = true;
      state.error = null;
      state.teams = [];
    },
    teamLoaded(state, action: PayloadAction<Team[]>) {
      const teams = action.payload;
      state.teams = teams;
      state.loading = false;
    },
    teamError(state, action: PayloadAction<TeamErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = sportsDbFormSlice;
