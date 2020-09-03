import * as selectors from '../selectors';
import { RootState } from 'types';
import { TeamErrorType } from '../types';
import { initialState } from '../slice';
import { Team } from 'types/Team';

describe('SportsDbRepoForm selectors', () => {
  let state: RootState = {};

  beforeEach(() => {
    state = {};
  });

  it('should select the initial state', () => {
    expect(selectors.selectTeam(state)).toEqual(initialState.teamname);
  });

  it('should select username', () => {
    const teamname = 'test';
    state = {
      sportsDbRepoForm: { ...initialState, teamname: teamname },
    };
    expect(selectors.selectTeam(state)).toEqual(teamname);
  });

  it('should select teamname ', () => {
    const team = ({ name: 'test' } as unknown) as Team;
    state = {
      sportsDbRepoForm: { ...initialState, teams: [team] },
    };
    expect(selectors.selectRepos(state)).toEqual([team]);
  });

  it('should select error', () => {
    const error = TeamErrorType.TEAM_NOT_FOUND;
    state = {
      sportsDbRepoForm: { ...initialState, error: error },
    };
    expect(selectors.selectError(state)).toEqual(error);
  });

  it('should select loading', () => {
    const loading = true;
    state = {
      sportsDbRepoForm: { ...initialState, loading: loading },
    };
    expect(selectors.selectLoading(state)).toEqual(loading);
  });
});
