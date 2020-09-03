import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { Title } from 'app/containers/HomePage/components/Title';
import { Lead } from './components/Lead';
import { SubTitle } from 'app/containers/HomePage/components/SubTitle';
import { P } from './components/P';
import { LanguageSwitch } from '../LanguageSwitch';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { selectTeam } from '../SportsDBForm/selectors';
import { SmallHeader } from './components/SmallHeader';

export function Features() {
  const teams = useSelector(selectTeam);
  const { t } = useTranslation();

  return (
    <>
      <Title as="h2">{teams?.length > 0 ? teams[0].strTeam : ''}</Title>
      <Lead>
        {t(translations.Facts.established)}:{' '}
        {teams?.length > 0 ? teams[0].intFormedYear.toString() : ''}
        <br />
        {t(translations.Facts.coach)}:{' '}
        {teams?.length > 0 ? teams[0].strManager : ''}
      </Lead>
      <LanguageSwitch />
      <List>
        <Lead></Lead>

        <Feature>
          <Content>
            <SubTitle>{t(translations.intro.title)}</SubTitle>
            <P>{teams?.length > 0 ? teams[0].strDescriptionEN : ''}</P>
          </Content>
        </Feature>
        <Feature>
          <img
            alt="stadium"
            src={teams?.length > 0 ? teams[0].strStadiumThumb : ''}
            className="feature-icon"
          />
          <Content>
            <SubTitle>{teams?.length > 0 ? teams[0].strStadium : ''}</SubTitle>
            <SmallHeader>
              {teams?.length > 0 ? teams[0].strStadiumLocation : ''}
              {<br />}
            </SmallHeader>
            Capacity:{' '}
            {teams?.length > 0 ? teams[0].intStadiumCapacity.toString() : ''}
            <P>{teams?.length > 0 ? teams[0].strStadiumDescription : ''}</P>
          </Content>
        </Feature>
        <Feature>
          <Content>
            <SubTitle>Team Gallery</SubTitle>
            <br />
            <Art>
              <img
                alt="fanart"
                src={teams?.length > 0 ? teams[0].strTeamFanart1 : ''}
                className="gallery"
              />
            </Art>
            <Art>
              {' '}
              <img
                alt="fanart"
                src={teams?.length > 0 ? teams[0].strTeamFanart2 : ''}
                className="gallery"
              />
            </Art>
            <Art>
              {' '}
              <img
                alt="fanart"
                src={teams?.length > 0 ? teams[0].strTeamFanart3 : ''}
                className="gallery"
              />
            </Art>
            <Art>
              <img
                alt="fanart"
                src={teams?.length > 0 ? teams[0].strTeamFanart4 : ''}
                className="gallery"
              />
            </Art>
          </Content>
        </Feature>
      </List>
    </>
  );
}

const Art = styled.li`
  display: inline-flexbox;
  /* margin: 6.25rem 0 6.25rem 2.25rem; */
  @media (max-width: 768px) {
  min-width: 340px
  display: block;
    /* font-size: 1rem; */
  }
`;

const Feature = styled.li`
  display: flex;
  margin: 6.25rem 0 6.25rem 2.25rem;
  @media (max-width: 768px) {
    display: block;
    max-width: 350px;
  }
  .gallery {
    width: 14.25rem;
    height: 14.25rem;
    flex-shrink: 0;
    @media (max-width: 768px) {
      display: block;
    }
  }

  .feature-icon {
    width: 6.25rem;
    height: 6.25rem;
    margin-right: 2.25rem;
    flex-shrink: 0;
    @media (max-width: 768px) {
      display: none;
      /* text-align: center */
    }
  }
`;
const Content = styled.div`
  flex: 1;
`;

const List = styled.ul`
  padding: 0;
  margin: 6.25rem 0 0 0;
`;
