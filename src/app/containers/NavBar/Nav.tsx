import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { ReactComponent as DocumentationIcon } from './assets/documentation-icon.svg';
import { ReactComponent as TwitterIcon } from './assets/twitter-1.svg';
import { selectTeam } from '../SportsDBForm/selectors';

export function Nav() {
  const teams = useSelector(selectTeam);
  return (
    <Wrapper>
      <Item
        href={`http://${teams?.length > 0 ? teams[0].strWebsite : '/'}`}
        target="_blank"
        title="Offical Page"
        rel="noopener noreferrer"
      >
        <DocumentationIcon />
        Offical Page
      </Item>
      <Item
        href={`http://${teams?.length > 0 ? teams[0].strTwitter : '/'}`}
        target="_blank"
        title="Twitter Page"
        rel="noopener noreferrer"
      >
        <TwitterIcon className="icon" />
        Twitter
      </Item>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  margin-right: -1rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Item = styled.a`
  color: black;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }

  .icon {
    margin-left: 0.1rem;
  }
`;
