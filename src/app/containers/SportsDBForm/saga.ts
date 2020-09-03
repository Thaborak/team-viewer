import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { request } from 'utils/request';
import { selectName } from './selectors';
import { actions } from './slice';
import { Team } from 'types/Team';
import { TeamErrorType } from './types';

/**
 * SportsDB teams request/response handler
 */
export function* getTeam() {
  yield delay(500);
  // Select teamname from store
  const teamname: string = yield select(selectName);
  if (teamname.length === 0) {
    yield put(actions.teamError(TeamErrorType.TEAMNAME_EMPTY));
    return;
  }
  const requestURL = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${teamname}`;

  try {
    // Call our request helper (see 'utils/request')
    const res = yield call(request, requestURL);
    const teams: Team[] = res.teams;
    if (teams?.length > 0) {
      yield put(actions.teamLoaded(teams));
    } else {
      yield put(actions.teamError(TeamErrorType.TEAM_HAS_NO_DATA));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.teamError(TeamErrorType.TEAM_NOT_FOUND));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.teamError(TeamErrorType.SPORTSDB_RATE_LIMIT));
    } else {
      yield put(actions.teamError(TeamErrorType.RESPONSE_ERROR));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* sportsDbFormSaga() {
  // Watches for loadRepos actions and calls getTeam when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loadTeam.type, getTeam);
}
