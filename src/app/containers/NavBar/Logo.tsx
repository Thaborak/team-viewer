import React from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { SportsDBRepoForm } from '../SportsDBForm';
import { selectTeam } from '../SportsDBForm/selectors';

export function Logo() {
  const teams = useSelector(selectTeam);
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Title>{t(translations.nav.title)}</Title>
      <img
        alt="logo"
        src={teams?.length > 0 ? teams[0].strTeamBadge : ''}
        className="icon"
      />
      <Description>{t(translations.nav.dropdown)}</Description>
      <Dropdown>
        <SportsDBRepoForm />
      </Dropdown>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.25rem;
  color: ${p => p.theme.text};
  font-weight: bold;
  margin-right: 1rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Description = styled.div`
  font-size: 0.875rem;
  color: ${p => p.theme.textSecondary};
  font-weight: normal;
  padding-left: 2rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Dropdown = styled.div`
  font-size: 0.875rem;
  color: ${p => p.theme.textSecondary};
  font-weight: normal;
  margin-left: 2vw;
  height: 6vh;
  position: flex;
`;
