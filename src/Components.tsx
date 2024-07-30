import styled from 'styled-components';
import { text, surfaceLiquid02 } from '@salutejs/plasma-tokens';

export const LvlButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const LevelContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 85vh;

  @media (orientation: portrait) {
    flex-direction: column;
    justify-content: normal;
  }
`;

export const DescContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 0 2vw;

  font-size: 1rem;
  line-height: 1.5;
  white-space: pre-wrap;

  @media (orientation: portrait) {
    flex: none;
    order: 1;
    justify-content: flex-start;
    width: 100vw;
    margin: 2vw;

    font-size: 1.5rem;
  }
`;

export const BoardContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  @media (orientation: portrait) {
    flex: none;
    width: 100vw;
    margin: 1vw;
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  margin: 5vh;

  font-size: 4rem;
`;

export const Subtitle = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.25rem;

  font-size: 1.75rem;
  font-style: italic;
`;

export const LvlButtonIndex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 33%;
  padding: 0.5rem;

  border-bottom: 0.15rem solid;

  font-size: 1.75rem;
  text-align: center;
`;

export const LvlButtonDesc = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 66%;
  padding: 0 1rem;

  font-size: 1.25rem;
  text-align: center;
  line-height: 1.5;
`;

export const LvlButton = styled.button`
  all: unset;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 20rem;
  height: 10rem;
  margin: 1.25rem;

  border: 0.15rem solid;

  background-color: ${surfaceLiquid02};

  &:focus {
    outline: 0.3rem solid;
  }
`;

export const DescHeader = styled.div`
  padding: 0 0.5rem;

  font-size: 1.25rem;
  font-style: italic;
  line-height: 2;
`;

export const Desc = styled.div<{ isFocused: boolean }>`
  padding: 0 0.5rem;

  outline: ${({ isFocused }) => (isFocused ? '0.05rem dashed' : 'none')};

  background-color: ${({ isFocused }) => (isFocused ? `${surfaceLiquid02}` : 'none')};
`;

export const Board = styled.table`
  border-collapse: collapse;
`;

export const Cell = styled.td`
  position: relative;

  padding: 0;

  border: ${({ content }) => (content !== ' ' ? `0.05rem solid` : 'none')};
`;

export const Index = styled.div`
  position: absolute;
  top: -0.05rem;
  left: 0.0rem;

  font-size: 0.85rem;

  &::selection {
    background: transparent;
  }
`;

export const Input = styled.input<{ inWord: boolean, isMistake: boolean, isSolved: boolean }>`
  width: 2.5rem;
  height: 2.5rem;

  border: hidden;

  background-color: ${({ inWord }) => (inWord ? 'rgba(255, 255, 255, 0.25)' : surfaceLiquid02)};

  color: ${({ isMistake, isSolved }) => (isMistake ? 'tomato' : (isSolved ? 'lightgreen' : ''))};
  font-size: 1.75rem;
  text-align: center;

  cursor: pointer;
  caret-color: transparent;

  &:focus {
    border: 0.15rem solid ${text};
    outline: none;
  }

  &::selection {
    background: transparent;
  }
`;
