import React, { lazy, useContext } from 'react'
import { Route, Switch, Link, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router'
import * as ROUTES from '../../constants/routes';
import LoggedInUserContext from '../../context/logged-in-user';
import MaterialContext from '../../context/material';
import useMaterial from '../../hooks/use-materail';

const PursMaterial = lazy(() => import('./pursMaterial'));
const MyMaterial = lazy(() => import('./myMaterial'));

export default function Bookshell() {
    const { user } = useContext(LoggedInUserContext)
    const { material, purcMaterial } = useMaterial(user)

    return (
        <MaterialContext.Provider value={{ MyMaterial: material, PursMaterial: purcMaterial }}>
            <div>
                <div className="bookshell__head">
                    <NavLink className="bookshell__title" exact activeClassName="bookshell__head-active" to={`/bookshell`} aria-label="Profile">
                        My Material
                    </NavLink>
                    <NavLink className="bookshell__tittle" activeClassName="bookshell__head-active" to={`/bookshell/pursmaterial`} aria-label="Profile">
                        Purchased Material
                    </NavLink>
                </div>
                <Switch>
                    <Route path={ROUTES.BOOKSHELL} component={MyMaterial} exact />
                    <Route path={ROUTES.PURSMATERIAL} component={PursMaterial} />
                </Switch>
            </div>
        </MaterialContext.Provider>
    )
}
