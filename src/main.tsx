import './index.css';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
	RouterProvider,
	createRouter,
	createRoute,
	createRootRoute,
} from '@tanstack/react-router';
import AdminPage from './admin/AdminPage';
import ClientPage from './client/ClientPage';
const rootRoute = createRootRoute({});

const clientRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	component: ClientPage,
});

const adminRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
	component: AdminPage,
});

const routeTree = rootRoute.addChildren([clientRoute, adminRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>
	);
}
