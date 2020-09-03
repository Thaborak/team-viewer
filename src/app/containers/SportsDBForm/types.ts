import { Team } from 'types/Team';
/* --- STATE --- */
export interface SportsDbFormState {
  teamname: string;
  loading: boolean;
  error?: TeamErrorType | null;
  teams: Team[];
}

export enum TeamErrorType {
  RESPONSE_ERROR = 1,
  TEAM_NOT_FOUND = 2,
  TEAMNAME_EMPTY = 3,
  TEAM_HAS_NO_DATA = 4,
  SPORTSDB_RATE_LIMIT = 5,
}

/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = SportsDbFormState;
