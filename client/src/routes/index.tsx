import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import {
  Login,
  VerifyEmail,
  Registration,
  ResetPassword,
  ApiErrorWatcher,
  TwoFactorScreen,
  RequestPasswordReset,
} from '~/components/Auth';
import { OAuthSuccess, OAuthError } from '~/components/OAuth';
import { AuthContextProvider } from '~/hooks/AuthContext';
import RouteErrorBoundary from './RouteErrorBoundary';
import StartupLayout from './Layouts/Startup';
import LoginLayout from './Layouts/Login';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsOfService from './Pages/TermsOfService';
import PricingPage from './Pages/PricingPage';
import AgentsPage from './Pages/Agents/AgentsPage';
import AgentProfilePage from './Pages/Agents/AgentProfilePage';
import dashboardRoutes from './Dashboard';
import ShareRoute from './ShareRoute';
import ChatRoute from './ChatRoute';
import Search from './Search';
import Root from './Root';
import Logged from '~/routes/Logged';
import PaymentSuccess from '~/components/Chat/PaymentSuccess';
import ContactUs from '~/routes/Pages/ContactUs';
import { AiStudioPage } from '~/routes/Pages/AiStudio';

const AuthLayout = () => (
  <AuthContextProvider>
    <Outlet />
    <ApiErrorWatcher />
  </AuthContextProvider>
);

const baseEl = document.querySelector('base');
const baseHref = baseEl?.getAttribute('href') || '/';

export const router = createBrowserRouter(
  [
    {
      path: 'pages/contact-us',
      element: <ContactUs />,
    },
    {
      path: 'pages/privacy-policy',
      element: <PrivacyPolicy />,
    },
    {
      path: 'pages/tos',
      element: <TermsOfService />,
    },
    {
      path: 'pages/pricing',
      element: <PricingPage />,
    },
    {
      path: 'ai-studio',
      element: <AiStudioPage />,
      errorElement: <RouteErrorBoundary />,
    },
    {
      path: 'ai-studio/:agent_name',
      element: <AgentProfilePage />,
      errorElement: <RouteErrorBoundary />,
    },
    {
      path: 'share/:shareId',
      element: <ShareRoute />,
      errorElement: <RouteErrorBoundary />,
    },
    {
      path: 'oauth',
      errorElement: <RouteErrorBoundary />,
      children: [
        {
          path: 'success',
          element: <OAuthSuccess />,
        },
        {
          path: 'error',
          element: <OAuthError />,
        },
      ],
    },
    {
      path: '/',
      element: <StartupLayout />,
      errorElement: <RouteErrorBoundary />,
      children: [
        {
          path: 'register',
          element: <Registration />,
        },
        {
          path: 'forgot-password',
          element: <RequestPasswordReset />,
        },
        {
          path: 'reset-password',
          element: <ResetPassword />,
        },
      ],
    },
    {
      path: 'verify',
      element: <VerifyEmail />,
      errorElement: <RouteErrorBoundary />,
    },
    {
      element: <AuthLayout />,
      errorElement: <RouteErrorBoundary />,
      children: [
        {
          path: '/',
          element: <LoginLayout />,
          children: [
            {
              path: 'login',
              element: <Login />,
            },
            {
              path: 'login/2fa',
              element: <TwoFactorScreen />,
            },
            {
              path: 'logged',
              element: <Logged />,
            },
          ],
        },
        dashboardRoutes,
        {
          path: '/',
          element: <Root />,
          children: [
            {
              index: true,
              element: <Navigate to="/c/new" replace={true} />,
            },
            {
              path: 'c/:conversationId?',
              element: <ChatRoute />,
            },
            {
              path: 'search',
              element: <Search />,
            },
            {
              path: 'pages/payment-success',
              element: <PaymentSuccess />,
            },
          ],
        },
      ],
    },
  ],
  { basename: baseHref },
);
