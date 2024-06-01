import styled from 'styled-components';

export const AppContainer = styled.div`
    background-color: whitesmoke;
`;

export const LevelContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100vh;
    
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
        margin: 2vw;
    }
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
