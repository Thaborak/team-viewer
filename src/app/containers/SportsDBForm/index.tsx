import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { FormLabel } from 'app/components/FormLabel';
import { Select } from './components/Select';
import { TextButton } from './components/TextButton';
import { sliceKey, reducer, actions } from './slice';
import { sportsDbFormSaga } from './saga';
import { selectTeam, selectName, selectError } from './selectors';
import { TeamErrorType } from './types';
import nfl from '../../teams.json';

export function SportsDBRepoForm() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: sportsDbFormSaga });
  const [selectedOption, setSelectedOption] = useState('new_york_giants');

  const name = useSelector(selectName);
  const teams = useSelector(selectTeam);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const Dropdown = () => {
    return (
      <Select
        value={selectedOption}
        onChange={e => {
          setSelectedOption(e.target.value);
          dispatch(actions.changeTeamName(e.target.value));
          dispatch(actions.loadTeam());
        }}
      >
        {nfl.map(team => (
          <option label={team.name} value={team.query}>
            {team.name}
          </option>
        ))}
      </Select>
    );
  };

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    // When initial state name is not null, submit the form to load teams
    if (name && name.trim().length > 0) {
      dispatch(actions.loadTeam());
    }
  });

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    /* istanbul ignore next  */
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }
  };
  return (
    <Wrapper>
      <FormGroup onSubmit={onSubmitForm}>
        <InputWrapper>
          <Dropdown />
        </InputWrapper>
      </FormGroup>
      {teams?.length > 0 ? (
        ''
      ) : error ? (
        <ErrorText>{teamErrorText(error)}</ErrorText>
      ) : null}
    </Wrapper>
  );
}

export const teamErrorText = (error: TeamErrorType) => {
  switch (error) {
    case TeamErrorType.TEAM_NOT_FOUND:
      return 'There is no such team';
    case TeamErrorType.TEAMNAME_EMPTY:
      return 'Type any team name';
    case TeamErrorType.TEAM_HAS_NO_DATA:
      return 'Team has no data';
    case TeamErrorType.SPORTSDB_RATE_LIMIT:
      return 'Looks like the api`s rate limit has exceeded';
    default:
      return 'An error has occurred!';
  }
};

const Wrapper = styled.div`
  ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  ${Select} {
    /* width: ${100 / 3}%; */
    margin-right: 0.5rem;
  }
`;

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  ${FormLabel} {
    margin-bottom: 0.25rem;
    margin-left: 0.125rem;
  }
`;
