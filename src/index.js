import React from 'react';
import ReactDOM from 'react-dom/client'; // שימוש ב-client כפי שדורש React 18
import App from './App';

// יצירת root חדש עם createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// רינדור עם React.StrictMode עבור בדיקות וניהול שגיאות טוב יותר
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
