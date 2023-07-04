// custom
import { ROUTES } from "./routes.enum";
import { RouteModel } from "../models/route";
import Home from "../pages/home";
import NotFound from "../pages/404";
import LoginOrRegister from "../pages/loginOrRegister";
import AboutProject from "../pages/about-project";

const routes: Array<RouteModel> = [
    {
        name: 'home',
        path: ROUTES.HOME,
        showInHeaderNav: true,
        needAuth: true,
        cmp: Home,
    },
    {
        name: 'about the project',
        path: ROUTES.ABOUT_PROJECT,
        showInHeaderNav: true,
        needAuth: true,
        cmp: AboutProject,
    },
    {
        name: 'not-found',
        path: ROUTES.NOT_FOUND,
        showInHeaderNav: false,
        needAuth: true,
        cmp: NotFound,
    },
    {
        name: 'login',
        path: ROUTES.LOGIN,
        showInHeaderNav: false,
        needAuth: false,
        cmp: LoginOrRegister,
    },
];

export default routes;