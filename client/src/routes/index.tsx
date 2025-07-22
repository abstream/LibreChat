import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import {
  Login,
  Registration,
  RequestPasswordReset,
  ResetPassword,
  VerifyEmail,
  ApiErrorWatcher,
  TwoFactorScreen,
} from '~/components/Auth';
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

const AuthLayout = () => (
  <AuthContextProvider>
    <Outlet />
    <ApiErrorWatcher />
  </AuthContextProvider>
);

export const router = createBrowserRouter([
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
    index: true,
    element: <AgentsPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: 'agents/:agent_name',
    element: <AgentProfilePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: 'share/:shareId',
    element: <ShareRoute />,
    errorElement: <RouteErrorBoundary />,
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
]);
