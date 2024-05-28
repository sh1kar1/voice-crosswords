import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100vh;
`;

export const DescContainer = styled.div`
    margin: 0 5vw;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1.5;
    white-space: pre-wrap;
`;

export const BoardContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Desc = styled.div<{ is_focused: boolean }>`
    padding: 0 5px;
    border: ${({ is_focused }) => (is_focused ? '1px dotted black' : 'none')};
`;

export const Board = styled.table`
    border-collapse: collapse;
`;

export const Cell = styled.td`
    position: relative;
    padding: 0;
    border: ${({ content }) => (content !== ' ' ? '1px solid black' : 'none')};
`;

export const Index = styled.div`
    position: absolute;
    top: 0;
    left: 1px;
    font-size: 10px;

    &::selection {
        background: transparent;
    }
`;

export const Input = styled.input`
    border: hidden;
    width: 30px;
    height: 30px;
    text-align: center;
    font-size: 20px;
    caret-color: transparent;
    background-color: transparent;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px black;
    }

    &::selection {
        background: transparent;
    }
`;
