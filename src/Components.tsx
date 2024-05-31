import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100vh;
    
    background-color: whitesmoke;
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
    padding: 0 0.25rem;
    
    border: ${({ is_focused }) => (is_focused ? '0.1rem dashed black' : 'none')};
`;

export const Board = styled.table`
    border-collapse: collapse;
`;

export const Cell = styled.td`
    position: relative;
    
    padding: 0;
    
    border: ${({ content }) => (content !== ' ' ? '0.05rem solid black' : 'none')};
`;

export const Index = styled.div`
    position: absolute;
    top: 0.05rem;
    left: 0.05rem;
    
    font-size: 0.7rem;

    &::selection {
        background: transparent;
    }
`;

export const Input = styled.input<{ is_word: boolean, is_mistake: boolean, is_solved: boolean }>`
    width: 2.5rem;
    height: 2.5rem;
    
    border: hidden;
    
    background-color: ${({ is_word }) => (is_word ? 'aliceblue' : 'white')};
    
    color: ${({ is_mistake, is_solved }) => (is_mistake ? 'crimson' : (is_solved ? 'seagreen' : 'black'))};
    font-size: 1.75rem;
    text-align: center;
    
    cursor: pointer;
    caret-color: transparent;

    &:focus {
        border: 0.15rem solid black;
        outline: none;
    }

    &::selection {
        background: transparent;
    }
`;
