import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { selectTeam } from '../SportsDBForm/selectors';

export function Logos() {
  const teams = useSelector(selectTeam);
  return (
    <Wrapper>
      <img alt="Banner" src={teams?.length > 0 ? teams[0].strTeamBanner : ''} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${p => p.theme.border};
  @media (max-width: 768px) {
    display: none;
  }
  margin-top: 2rem;
`;
