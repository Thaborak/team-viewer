import React from 'react';
import styled from 'styled-components/macro';
import { Logos } from './Logos';

export function Masthead() {
  return (
    <Wrapper>
      <Logos />
      {/* <Lead>
        Quick Facts:
      Coach: {teams?.length > 0 ? teams[0].strManager : ''}
      Stadium: {teams?.length > 0 ? teams[0].strStadium : ''}
      </Lead> */}
    </Wrapper>
  );
}

const Wrapper = styled.main`
  /* height: 40vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* min-height: 320px; */
`;
