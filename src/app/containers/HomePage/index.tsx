import React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from '../NavBar';
import { Masthead } from './Masthead';
import { Features } from './Features';
import { PageWrapper } from 'app/components/PageWrapper';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { useSelector } from 'react-redux';
import { selectLoading, selectTeam } from '../SportsDBForm/selectors';
import { nfl } from '../../teams';
import styled from 'styled-components/macro';

export function HomePage() {
  const isLoading = useSelector(selectLoading);
  const teams = useSelector(selectTeam);
  const colors =
    teams.length > 0
      ? nfl.filter(t => t.name === teams[0].strTeam)[0].colors.hex
      : '';
  return (
    <>
      <Helmet>
        <title>NFL Team Viewer</title>
        <meta
          name="description"
          content="A quick way to look at your favorite NFL teams"
        />
      </Helmet>
      <NavBar />
      {isLoading && <LoadingIndicator />}
      <SideBarL color={`${'#' + colors[1]}`} />
      <SideBarR color={`${'#' + colors[0]}`} />
      <PageWrapper>
        <Masthead />
        <Features />
      </PageWrapper>
    </>
  );
}

const SideBarR = styled.div`
width: 20vw;
height: 100%;
box-sizing: content-box;
background-color: ${p => (p.color !== '#undefined' ? p.color : 'white')};
position: fixed;
z-index: 2;
margin-right: 80vw;
@media (max-width: 768px) {
display: none
}
}
`;

const SideBarL = styled.div`
width: 30vw;
height: 100%;
box-sizing: content-box;
background-color: ${p => (p.color !== '#undefined' ? p.color : 'white')};
position: fixed;
z-index: 2;
margin-left: 80vw;
@media (max-width: 768px) {
display: none
}
}
`;
