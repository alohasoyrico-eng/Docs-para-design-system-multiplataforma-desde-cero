import { createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router'
import { DocsLayout } from './layout/DocsLayout'
import { ComponentDetailPage } from './pages/ComponentDetailPage'
import { IndexPage } from './pages/IndexPage'

const rootRoute = createRootRoute({ component: Outlet })

const docsLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: 'docs',
  component: DocsLayout,
})

const indexRoute = createRoute({
  getParentRoute: () => docsLayout,
  path: '/',
  component: IndexPage,
})

const componentDetailRoute = createRoute({
  getParentRoute: () => docsLayout,
  path: '/docs/$componentId',
  component: ComponentDetailPage,
})

const routeTree = rootRoute.addChildren([
  docsLayout.addChildren([
    indexRoute,
    componentDetailRoute,
  ]),
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
