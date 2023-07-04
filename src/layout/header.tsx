// module
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";
import { BsSunFill, BsMoonStars, BsPerson } from 'react-icons/bs';
// custom
import routes from '../routes/routes';
import { RouteModel } from "../models/route";
import useStore from "../state-management/store";
import { useState } from "react";
import { Store } from "../models/store";
import useIslogin from "../custom-hooks/login-hook";

const Header = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const darkMode = useStore((store: Store) => store.darkMode);
    const isLogin: boolean = useIslogin()
    const { pathname } = useLocation();
    const token = useStore((store: Store) => store.token);
    const setDarkMode = useStore((store: Store) => store.setDarkMode);
    const resetToken = useStore((store: Store) => store.resetToken);
    const navigate = useNavigate();

    return (
        <HeaderWrapper>
            <Nav>
                {
                    isLogin && routes.filter((item: RouteModel) => item.showInHeaderNav).map((item: RouteModel) => (
                        <NavItem
                            key={item.path}
                            isMatch={pathname === item.path}
                            onClick={() => pathname !== item.path && navigate(item.path)}
                        >{item.name}</NavItem>
                    ))
                }
            </Nav>
            <UserActions>
                {
                    isLogin && <UserMenu>
                        <BsPerson size='25px' onClick={() => setShowMenu(!showMenu)} />
                        {
                            showMenu && <UserMenuInner>
                                <UserMenuItem >{token?.split('-')[0]}</UserMenuItem>
                                <UserMenuItem
                                    cursor='pointer'
                                    action='true'
                                    onClick={() => {
                                        setShowMenu(false)
                                        resetToken()
                                    }}
                                >
                                    Logout
                                </UserMenuItem>
                            </UserMenuInner>
                        }
                    </UserMenu>
                }
                <DarkMode onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? <BsSunFill size='25px' /> : <BsMoonStars size='25px' />}
                </DarkMode>
            </UserActions>
        </HeaderWrapper>
    );
};

export default Header;

const HeaderWrapper = styled.div<any>(({ theme }) => ({
    position: 'fixed',
    top: 0,
    width: '100%',
    height: theme.styleConfig.headerHeight,
    backgroundColor: theme.palette.headerBgColor,
    color: theme.palette.headerColor,
    paddingBlock: '10px',
    paddingInline: '35px',
    margin: 0,
    zIndex: 2,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    transition: 'all 1s linear',
}));

const Nav = styled.div(() => ({
    width: 'max-content',
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: '15px',
}));

const NavItem = styled.div<any>(({ isMatch, theme }) => ({
    boxSizing: 'border-box',
    width: 'max-content',
    height: '100%',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: isMatch ? `1px solid ${theme.palette.headerColor}` : 'none',
    fontSize: '16px',
    fontWeight: 600,
    textTransform: 'capitalize',
    cursor: isMatch ? 'default' : 'pointer',
    ':hover': {
        fontWeight: 900,
        color: 'greenyellow',
        borderBottomColor: 'greenyellow',
    },
}));

const UserActions = styled.div(() => ({
    boxSizing: 'border-box',
    height: 'max-content',
    width: 'max-content',
    display: 'inline-flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '15px',
}))

const UserMenu = styled.div(() => ({
    boxSizing: 'border-box',
    height: 'max-content',
    width: 'max-content',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    cursor: 'pointer',
    zIndex: 10,
}))

const UserMenuInner = styled.div<any>(({ theme }) => ({
    boxSizing: 'border-box',
    height: 'max-content',
    width: 'max-content',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '10px',
    position: 'absolute',
    borderRadius: '5px',
    backgroundColor: theme.palette.headerBgColor,
    color: theme.palette.headerColor,
    top: `calc(${theme.styleConfig.headerHeight} - 10px)`,
    right: 0,
}))

const UserMenuItem = styled.div<any>(({ theme, cursor, action }) => ({
    boxSizing: 'border-box',
    height: 'max-content',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingInline: '25px',
    paddingBlock: '5px',
    fontSize: '20px',
    color: theme.palette.headerColor,
    cursor,
    ':hover': {
        color: action ? 'red' : theme.palette.headerColor,
        backgroundColor: action ? 'gray' : 'transparent',
        borderRadius: '5px',
    }
}))

const DarkMode = styled.div(() => ({
    boxSizing: 'border-box',
    width: 'max-content',
    height: '100%',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
}))