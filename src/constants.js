// App
export const APP_NAME = 'Zatiq';
export const API_URL = process.env.REACT_APP_API_URL;

// Actions
export const CAPTURE_COGNITO_USER = 'CAPTURE_COGNITO_USER';
export const CAPTURE_USER = 'CAPTURE_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const CAPTURE_COMPANY = 'CAPTURE_COMPANY';
export const CAPTURE_LOCATIONS = 'CAPTURE_LOCATIONS';
export const CAPTURE_LOCATION = 'CAPTURE_LOCATION';
export const CAPTURE_MENUS = 'CAPTURE_MENUS';
export const CAPTURE_ITEMS = 'CAPTURE_ITEMS';
export const CAPTURE_RESERVATIONS = 'CAPTURE_RESERVATIONS';

// Endpoints
export const API_USERS = `${process.env.REACT_APP_API_URL}/api/users`;
export const API_COMPANY = `${process.env.REACT_APP_API_URL}/api/companies`;
export const API_LOCATIONS = `${process.env.REACT_APP_API_URL}/api/locations`;
export const API_MENUS = `${process.env.REACT_APP_API_URL}/api/menus`;
