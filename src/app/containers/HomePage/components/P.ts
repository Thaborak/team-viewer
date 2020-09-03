import styled from 'styled-components/macro';

export const P = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: ${p => p.theme.textSecondary};
  margin: 0.625rem 0 1.5rem 0;
  @media (max-width: 768px) {
    /* font-size: 14px; */
    text-align: left;
    max-width: 300px;
  }
`;
