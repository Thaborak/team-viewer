import { put, takeLatest } from 'redux-saga/effects';
import * as slice from '../slice';

import { sportsDbFormSaga, getTeam } from '../saga';
import { TeamErrorType } from '../types';

describe('getTeam Saga', () => {
  let username: any;
  let repos: any;
  let getTeamIterator: ReturnType<typeof getTeam>;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getTeamIterator = getTeam();
    const delayDescriptor = getTeamIterator.next().value;
    expect(delayDescriptor).toMatchSnapshot();

    const selectDescriptor = getTeamIterator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should return error if username is empty', () => {
    username = '';
    const putDescriptor = getTeamIterator.next(username).value;
    expect(putDescriptor).toEqual(
      put(slice.actions.teamError(TeamErrorType.TEAMNAME_EMPTY)),
    );

    const iteration = getTeamIterator.next();
    expect(iteration.done).toBe(true);
  });

  it('should dispatch the teamsLoaded action if it requests the data successfully', () => {
    const teamname = 'new_york_giants';
    const teams = [
      {
        name: 'New York Giants',
      },
    ];

    const requestDescriptor = getTeamIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getTeamIterator.next(repos).value;
    expect(putDescriptor).toEqual(put(slice.actions.teamLoaded(teams)));
  });

  it('should dispatch the user not found error', () => {
    username = 'test';

    const requestDescriptor = getTeamIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getTeamIterator.throw({ response: { status: 404 } })
      .value;
    expect(putDescriptor).toEqual(
      put(slice.actions.teamError(TeamErrorType.TEAM_NOT_FOUND)),
    );
  });
  it('should dispatch the user has no repo error', () => {
    username = 'test';
    repos = [];

    const requestDescriptor = getTeamIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getTeamIterator.next(repos).value;
    expect(putDescriptor).toEqual(
      put(slice.actions.teamError(TeamErrorType.TEAM_HAS_NO_DATA)),
    );
  });
  it('should dispatch the github rate limit error', () => {
    username = 'test';

    const requestDescriptor = getTeamIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getTeamIterator.throw(new Error('Failed to fetch'))
      .value;
    expect(putDescriptor).toEqual(
      put(slice.actions.teamError(TeamErrorType.SPORTSDB_RATE_LIMIT)),
    );
  });

  it('should dispatch the response error', () => {
    username = 'test';

    const requestDescriptor = getTeamIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getTeamIterator.throw(new Error('some error')).value;
    expect(putDescriptor).toEqual(
      put(slice.actions.teamError(TeamErrorType.RESPONSE_ERROR)),
    );
  });
});

describe('sportsDbFormSaga Saga', () => {
  const apiFormIterator = sportsDbFormSaga();
  it('should start task to watch for loadRepos action', () => {
    const takeLatestDescriptor = apiFormIterator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(slice.actions.loadTeam.type, getTeam),
    );
  });
});
