import React, { lazy, useContext, Suspense } from 'react'
import { Route, Switch, Link, NavLink } from 'react-router-dom';
import { Redirect, useLocation } from 'react-router'
import * as ROUTES from '../../constants/routes';
import { useUser } from '../../context/userContext';
import MaterialContext from '../../context/material';
import useMaterial from '../../hooks/use-materail';
import ReactLoader from '../loader';

const PursMaterial = lazy(() => import('./pursMaterial'));
const MyMaterial = lazy(() => import('./myMaterial'));

export default function Bookshell() {
    const { user } = useUser()
    console.log(user);

    const { material, purcMaterial, loading } = useMaterial(user)

    return (
        <MaterialContext.Provider value={{ MyMaterial: material, PursMaterial: purcMaterial, loading }}>
            <div>
                <div className="bookshell__head">
                    <NavLink className="bookshell__title" exact activeClassName="bookshell__head-active" to={`/bookshell/mymaterial`} aria-label="Profile">
                        My Material
                    </NavLink>
                    <NavLink className="bookshell__tittle" activeClassName="bookshell__head-active" to={`/bookshell/pursmaterial`} aria-label="Profile">
                        Purchased Material
                    </NavLink>
                </div>
                <Suspense fallback={<ReactLoader />}>
                    <Switch>
                        <Redirect exact from={ROUTES.BOOKSHELL} to={ROUTES.MYMATERIAL} />
                        <Route path={ROUTES.PURSMATERIAL} component={PursMaterial} />
                        <Route path={ROUTES.MYMATERIAL} component={MyMaterial} />
                    </Switch>
                </Suspense>
            </div>
        </MaterialContext.Provider>
    )
}
