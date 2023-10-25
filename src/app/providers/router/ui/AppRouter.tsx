import { Suspense } from "react";
import { RouteConfig } from "../config/RouteConfig";
import { Route, Routes } from 'react-router-dom';

const AppRouter = () => (
    <Routes>
        {
            Object.values(RouteConfig).map(({ element, path }) => (
                <Route
                    key={path}
                    path={path}
                    element={(
                        <Suspense fallback={<div>Loading...</div>}>
                            {element}
                        </Suspense>
                    )}
                />
            ))
        }
    </Routes>
)

export default AppRouter;