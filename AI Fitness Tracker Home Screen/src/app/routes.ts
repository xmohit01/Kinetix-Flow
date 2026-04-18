import { createBrowserRouter } from 'react-router';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import PermissionsCameraScreen from './screens/PermissionsCameraScreen';
import PermissionsMotionScreen from './screens/PermissionsMotionScreen';
import PermissionsNotificationsScreen from './screens/PermissionsNotificationsScreen';
import HomeScreen from './screens/HomeScreen';
import WorkoutTrackingScreen from './screens/WorkoutTrackingScreen';
import WorkoutSummaryScreen from './screens/WorkoutSummaryScreen';
import EmptyStateScreen from './screens/EmptyStateScreen';
import LoadingScreen from './screens/LoadingScreen';
import StatsScreen from './screens/StatsScreen';
import ProfileScreen from './screens/ProfileScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: SplashScreen,
  },
  {
    path: '/login',
    Component: LoginScreen,
  },
  {
    path: '/permissions/camera',
    Component: PermissionsCameraScreen,
  },
  {
    path: '/permissions/motion',
    Component: PermissionsMotionScreen,
  },
  {
    path: '/permissions/notifications',
    Component: PermissionsNotificationsScreen,
  },
  {
    path: '/home',
    Component: HomeScreen,
  },
  {
    path: '/workout',
    Component: WorkoutTrackingScreen,
  },
  {
    path: '/summary',
    Component: WorkoutSummaryScreen,
  },
  {
    path: '/empty',
    Component: EmptyStateScreen,
  },
  {
    path: '/loading',
    Component: LoadingScreen,
  },
  {
    path: '/stats',
    Component: StatsScreen,
  },
  {
    path: '/profile',
    Component: ProfileScreen,
  },
]);
