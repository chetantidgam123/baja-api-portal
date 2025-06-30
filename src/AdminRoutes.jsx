import { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getKeyForTable } from './Utils';
import { PageLoader } from './Loader';
const AdminLayout = lazy(() => import('./Components/admin/layout/AdminLayout'));
const AdminDashboard = lazy(() => import('./Components/admin/Dashboard'));
const CategoryList = lazy(() => import('./Components/admin/CategoryList'));
const SubCategoryList = lazy(() => import('./Components/admin/SubCategoryList'));
const ApiList = lazy(() => import('./Components/admin/ApiList'));
const CreateApi = lazy(() => import('./Components/admin/CreateApi'));
const UserList = lazy(() => import('./Components/admin/UserList'));
const PageNotFound = lazy(() => import('./Components/admin/PageNotFound'));

function PrivateRoute({ children }) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You are not logged in. Please log in to access this page.');
    }
    return token ? children : <Navigate to="/" replace />;
    // return children
}
PrivateRoute.propTypes = {
    children: PropTypes.any,
};


const routes = [
    {
        element: <AdminLayout />,
        children: [
            { path: "/dashboard", element: <PrivateRoute><AdminDashboard /></PrivateRoute> },
            { path: "/category-list", element: <PrivateRoute><CategoryList /></PrivateRoute> },
            { path: "/sub-category-list", element: <PrivateRoute><SubCategoryList /></PrivateRoute> },
            { path: "/sub-category-list", element: <PrivateRoute><SubCategoryList /></PrivateRoute> },
            { path: "/api-list", element: <PrivateRoute><ApiList /></PrivateRoute> },
            { path: "/create-api", element: <PrivateRoute><CreateApi /></PrivateRoute> },
            { path: "/user-list", element: <PrivateRoute><UserList /></PrivateRoute> },
        ]
    }

];
function AdminRoutes() {
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

export default AdminRoutes


