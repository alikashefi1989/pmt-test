// module
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// custom
import useIslogin from "./login-hook";
import { RouteModel } from '../models/route'
import routes from "../routes/routes";

const useAuth = () => {
    const authLessPath: Array<string> = routes.filter((route: RouteModel) => { return !route.needAuth }).map((route: RouteModel) => route.path)
    const isLogin = useIslogin();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin && authLessPath.includes(pathname)) {
            navigate('/');
            return
        }
        if (!isLogin && !authLessPath.includes(pathname)) {
            navigate('/login');
            return;
        }
    }, [pathname, isLogin, authLessPath]);

    return;
}

export default useAuth;