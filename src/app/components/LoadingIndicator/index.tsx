import React from 'react';
import styled from 'styled-components/macro';

export const LoadingIndicator = () => (
  <Loader className="loader center">
    <i className="fa fa-cog fa-spin" />
  </Loader>
);

const Loader = styled.div`
  margin: auto;
  background-color: rgba(128, 128, 128 1);
  z-index: 9999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 200px;
  div.loader {
    font-size: 100px;
  }

  .loaded {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;
