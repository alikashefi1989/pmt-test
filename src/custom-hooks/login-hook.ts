// module
import { useLayoutEffect, useState } from "react";
// custom
import { Store } from '../models/store';
import useStore, { extractPersistedAppGolbalStore } from "../state-management/store";

const isLoginInitialState = (): boolean => {
    const token = extractPersistedAppGolbalStore<Store['token']>('token');
    if (token !== null) return true;
    return false;
}

const useIslogin = (): boolean => {
    const token: Store['token'] = useStore((store: Store) => store.token);

    const [isLogin, setIsLogin] = useState<boolean>(isLoginInitialState());

    useLayoutEffect(() => {
        if (token !== null) {
            if (!isLogin) {
                setIsLogin(true);
            }
        } else {
            if (isLogin) {
                setIsLogin(false);
            }
        }
    }, [token, isLogin, setIsLogin]);

    return isLogin;
}

export default useIslogin;