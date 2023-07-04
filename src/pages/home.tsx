// module
import { ReactNode } from "react";
import styled from "@emotion/styled";
import { ROUTES } from "../routes/routes.enum";

const Home = (): ReactNode => {

    return (
        <HomeWrapper>
            <Title>home</Title>
            <Info>Hello dear</Info>
            <Info>
                According to the e-mail received and based on the explanations in the e-mail, the current task has been completed and you can test the project according to the following steps. Also, a page about the project has been created, which explains the general structure and important libraries used in the project. given.
            </Info>
            <h2>
                Header Section
            </h2>
            <Info>
                This section consists of two parts, the first part is related to the pages menu, which is located on the left side, and the second part is related to the user's actions, which is located on the right side. It should also be mentioned that if the user is logged out, in In the header section, only the icons related to day and night mode will be displayed, and the rest will be unavailable to the user.
            </Info>
            <h2>
                Routes & Pages
            </h2>
            <Info>
                This app contains 4 routes, each route has its own page, and all pages except the login page will be available based on the token, which means that if the login is not done, the pages will not be available and will not be visible. Also, on the login page, there is an action to change the status of the form from login to registration. Also, if an address not existing in the app is entered in the address bar, it will be redirected to the 404 page by default. It should be noted that the current page is related to the home page, which includes general explanations about the project. A page called <a href={ROUTES.ABOUT_PROJECT}>About The Project</a> explains the technical aspects, which you can access from the menu in the header.
            </Info>
        </HomeWrapper>
    );
};

export default Home;

const HomeWrapper = styled.div(() => ({
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