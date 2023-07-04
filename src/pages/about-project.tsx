// module
import { ReactNode } from "react";
import styled from "@emotion/styled";

const AboutProject = (): ReactNode => {

    return (
        <AboutProjectWrapper>
            <Title>about the project</Title>
            <Info>
                This project was created with React and TypeScript, also be mentioned we used Vite to increase the speed of HMR and project building.
            </Info>
            <Info>
                The most important libraries that have been used in this project are:
            </Info>
            <Ol>
                <Li>react-hook-form: for managing form</Li>
                <Li>yup: for validating form data</Li>
                <Li>zustand: for use in the state management and persisting data in LocalStorage</Li>
                <Li>react-router-dom: for routes handling</Li>
                <Li>react-icons: used for showing icons</Li>
                <Li>react-toastify: for toasting messages</Li>
                <Li>emotion: used for handling styles</Li>
            </Ol>
        </AboutProjectWrapper>
    );
};

export default AboutProject;

const AboutProjectWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '10px',
}));

const Title = styled.h1(() => ({
    fontWeight: 900,
    fontSize: '35px',
    textTransform: 'capitalize',
}));

const Info = styled.p(() => ({
    width: '50%',
    fontWeight: 500,
    fontSize: '18px',
    transition: 'all 2s linear',
}));

const Ol = styled.ol(() => ({
    width: '50%',
    fontWeight: 500,
    fontSize: '18px',
    transition: 'all 2s linear',
}));

const Li = styled.li(() => ({
    paddingBlock: '5px',
}))