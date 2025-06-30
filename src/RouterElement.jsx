import { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getKeyForTable } from './Utils';
import { PageLoader } from './Loader';
import HomeLayout from './Components/user/layout/HomeLayout';
import AdminRoutes from './AdminRoutes';
const HomePageContent = lazy(() => import('./Components/user/HomePageContent'));
const SignupPage = lazy(() => import('./Components/SignupPage'));
const LoginPage = lazy(() => import('./Components/Login'));
const PageNotFound = lazy(() => import('./Components/user/PageNotFound'));

function PrivateRoute({ children }) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You are not logged in. Please log in to access this page.');
    }
    return token ? children : <Navigate to="/" replace />;
}
PrivateRoute.propTypes = {
    children: PropTypes.any,
};


const routes = [
    { path: "/master/*", element: <AdminRoutes /> },
    {
        element: <HomeLayout />,
        children: [
            { index: true, element: <HomePageContent /> },
            { path: "/", element: <HomePageContent /> },
            { path: "/page", element: <PrivateRoute><PageNotFound /></PrivateRoute> },
            { path: "/register", element: <SignupPage /> },
            { path: "/login", element: <LoginPage /> },
        ]
    }

];
function RouterElement() {
    return (
        <Routes>
            {routes.map((route, index) => {
                const { path, element, children, ...rest } = route;
                return <Route key={getKeyForTable('parent', index)} path={path} element={element} {...rest}>
                    {children?.map((child, idx) => (
                        <Route key={getKeyForTable('child', idx)} path={child.path}
                            element={
                                <Suspense fallback={<PageLoader />}>
                                    {child.element}
                                </Suspense>
                            }
                            {...child} />
                    ))}
                </Route>
            })}
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}

export default RouterElement


