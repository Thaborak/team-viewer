import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { Logo } from './Logo';
import { StyleConstants } from 'styles/StyleConstants';
import { Nav } from './Nav';
import { selectTeam } from '../SportsDBForm/selectors';
import { nfl } from '../../teams';
import { PageWrapper } from '../../components/PageWrapper';

export function NavBar() {
  const teams = useSelector(selectTeam);
  const colors =
    teams.length > 0
      ? nfl.filter(t => t.name === teams[0].strTeam)[0].colors.hex
      : '';

  return (
    <Wrapper color={`${'#' + colors[3]}`}>
      <PageWrapper>
        <Logo />
        <Nav />
      </PageWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  box-shadow: 0 1px 0 0 ${p => p.theme.borderLight};
  height: ${StyleConstants.NAV_BAR_HEIGHT};
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${p => (p.color !== '#undefined' ? p.color : 'white')};
  z-index: 4;

  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
    background-color: ${p =>
      p.theme.background.replace(
        /rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/,
        'rgba$1,0.75)',
      )};
  }

  ${PageWrapper} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
