import { RouterProvider } from 'react-router-dom';
import router from 'pages/router';
import type { FC } from 'react';

const AppRouterProvider: FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouterProvider;
