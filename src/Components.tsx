import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100vh;
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
`;

export const BoardContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Desc = styled.div<{ is_focused: boolean }>`
    padding: 0 0.3rem;
    
    border: ${({ is_focused }) => (is_focused ? '0.0625rem dotted black' : 'none')};
`;

export const Board = styled.table`
    border-collapse: collapse;
`;

export const Cell = styled.td`
    position: relative;
    
    padding: 0;
    
    border: ${({ content }) => (content !== ' ' ? '0.0625rem solid black' : 'none')};
`;

export const Index = styled.div`
    position: absolute;
    top: 0;
    left: 0.0625rem;
    
    font-size: 0.625rem;

    &::selection {
        background: transparent;
    }
`;

export const Input = styled.input`
    width: 1.875rem;
    height: 1.875rem;
    
    border: hidden;
    
    background-color: transparent;
    
    font-size: 1.25rem;
    text-align: center;
    caret-color: transparent;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 0.125rem black;
    }

    &::selection {
        background: transparent;
    }
`;
