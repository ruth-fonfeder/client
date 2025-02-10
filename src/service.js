import axios from 'axios';
console.log("API URL:", process.env.REACT_APP_API_URL);

// הגדרת כתובת ה-API כ-default
axios.defaults.baseURL =process.env.REACT_APP_API_URL; // הכתובת החדשה של ה-API

// הוספת interceptor לטיפול בשגיאות ב-response
axios.interceptors.response.use(
  response => {
    // אם התשובה תקינה, פשוט מחזירים אותה
    return response;
  },
  error => {
    // אם קרתה שגיאה בתשובה, נרשום את השגיאה
    console.error('Error in response:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

export default {
  // פונקציה לשליפת כל המשימות - לא דורשת פרמטרים, מחזירה את כל הרשימה
  getTasks: async () => {
    const result = await axios.get("/items");
    return result.data;
  },

  // פונקציה להוספת משימה חדשה - מקבלת שני פרמטרים: name ו-isComplete
  addTask: async (name, isComplete) => {
    console.log('הוספת משימה:', { name, isComplete: false });
    const result = await axios.post("/items", { 
      id: 0, 
      name, 
      isComplete: Boolean(isComplete) // תיקון: המרה לבוליאני אמיתי
    });
    return result.data;
  },

  // פונקציה לעדכון סטטוס (השלמה) של משימה - מקבלת 3 פרמטרים: id, name, isComplete
  setCompleted: async (id, isComplete) => {
    console.log('עדכון סטטוס משימה:', { id, isComplete });

    try {
      // 🔹 1. שליפת המשימה הנוכחית מהשרת כדי לקבל את השם
      const existingTask = await axios.get(`/items/${id}`);
      const name = existingTask.data.name; // שליפת שם המשימה מהנתונים
      
      // 🔹 2. שליחת עדכון עם ה-ID, ה-Name והסטטוס החדש
      const result = await axios.put(`/items/${id}`, { 
        id,  
        name, // חובה לשלוח גם את שם המשימה
        isComplete: Boolean(isComplete) // תיקון: המרה לבוליאני אמיתי
      });

      return result.data;

    } catch (error) {
      console.error("שגיאה בעדכון המשימה:", error);
      throw error;
    }
  },

  // פונקציה למחיקת משימה - מקבלת id בלבד
  deleteTask: async (id) => {
    console.log('מחיקת משימה:', id);
    const result = await axios.delete(`/items/${id}`);
    return result.data;
  }
};
