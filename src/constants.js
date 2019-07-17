/*
 * API_URL needs to be swapped when deploying to prod
 */

// export const API_URL = process.env.REACT_APP_API_URL_PROD;
export const API_URL = process.env.REACT_APP_API_URL;

// App
export const APP_NAME = 'Zatiq';

/**
 * Actions
 */
export const CAPTURE_COGNITO_USER = 'CAPTURE_COGNITO_USER';
export const CAPTURE_USER = 'CAPTURE_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const CAPTURE_RESTAURANT = 'CAPTURE_RESTAURANT';
export const CAPTURE_LOCATIONS = 'CAPTURE_LOCATIONS';
export const CAPTURE_LOCATION = 'CAPTURE_LOCATION';
export const CAPTURE_MENUS = 'CAPTURE_MENUS';
export const CAPTURE_RESERVATIONS = 'CAPTURE_RESERVATIONS';

// Dishes
export const CAPTURE_ITEMS = 'CAPTURE_ITEMS';
export const CAPTURE_ITEM = 'CAPTURE_ITEM';
export const FOCUS_DISH = 'FOCUS_DISH';

// Endpoints
export const API_USERS = `${API_URL}/api/users`;
export const API_RESTAURANT = `${API_URL}/api/restaurants`;
export const API_LOCATIONS = `${API_URL}/api/locations`;
export const API_MENUS = `${API_URL}/api/menus`;
export const API_DISHES = `${API_URL}/api/dishes`;

// Kulers
export const ORANGE = '#F05E63';

// Misc
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
