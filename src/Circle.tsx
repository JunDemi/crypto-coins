import React from 'react';
import styled from 'styled-components';

interface Containerprops {
    bagColor: string,
    bborderColor: string
}
interface Circleprops {
    bgColor: string
    borderColor?: string;
    text?: string;
}

const Container = styled.div<Containerprops>`
    background-color: ${props => props.bagColor};
    width: 200px; 
    height: 200px;
    border-radius: 100px;
    border: 3px solid ${props => props.bborderColor};
`;


function Circle({bgColor, borderColor, text = "default text"}: Circleprops){
    return <Container bagColor={bgColor} bborderColor={borderColor ?? bgColor}>
        {text}
    </Container>;
}

export default Circle;