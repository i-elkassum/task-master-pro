import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Box,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { Tabs, Tab } from "@mui/material";
import EditTaskDialog from "./components/EditTaskDialog";
import { Snackbar, Alert } from '@mui/material';
import { Chip, Stack, LinearProgress } from '@mui/material';



// 1. إنشاء ثيم مخصص باحترافية
const theme = createTheme({
  direction: "rtl",
  palette: {
    mode: "dark", // وضع داكن فخم
    primary: {
      main: "#7c4dff", // لون بنفسجي عصري
    },
    background: {
      default: "#0a1929", // كحلي غامق جداً (Professional Dark Blue)
      paper: "#132f4c",
    },
  },
  typography: {
    fontFamily: "Cairo, sans-serif",
    h2: { fontWeight: 700 },
    body1: { fontSize: "1.1rem" },
  },
});



function App() {

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("myTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });


  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
  }, [tasks]);
  


  const [filter, setFilter] = useState("all");
  const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "success", // يمكن أن تكون success, error, info, أو warning
});

// دالة لإغلاق الرسالة
const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

// دالة مساعدة لإظهار الرسالة بسهولة
const showMessage = (msg, sev = "success") => {
  setSnackbar({ open: true, message: msg, severity: sev });
};



  //دالة الاضافة 
  const addTask = (title) => {
  const newTask = {
    id: Date.now(),
    title: title,
    isCompleted: false,
  };
  setTasks([...tasks, newTask]);
  showMessage("تم إضافة المهمة بنجاح! ✨"); // رسالة نجاح خضراء افتراضية
};


//دالة الحذف  
const deleteTask = (id) => {
  // نطلب من ريآكت تحديث المهام بحيث يستبعد المهمة التي نمرر رقمها (id)
  setTasks(tasks.filter(task => task.id !== id));
  showMessage("تم حذف المهمة بنجاح", "error"); // رسالة حمراء للتنبيه بالحذف
};


//دالة الانجاز  
const toggleTask = (id) => {
  setTasks(tasks.map(task => 
    // إذا كان هذا هو الـ ID المطلوب، اعكس حالة الإنجاز، وإلا اترك المهمة كما هي
    task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
  ));
};



  // 2. منطق التصفية 
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.isCompleted;
    if (filter === "active") return !task.isCompleted;
    return true;
  });




  // 1. حالات إدارة النافذة
const [isEditOpen, setIsEditOpen] = useState(false);
const [taskToEdit, setTaskToEdit] = useState(null);

// 2. دالة فتح النافذة
const handleEditClick = (task) => {
  setTaskToEdit(task);
  setIsEditOpen(true);
};

// 3. دالة حفظ التعديل
const updateTask = (id, newTitle) => {
  setTasks(tasks.map(t => t.id === id ? { ...t, title: newTitle } : t));
  showMessage("تم تحديث المهمة 📝");
};




// حساب إجمالي المهام
const totalTasks = tasks.length;

// حساب المهام المنجزة فقط
const completedCount = tasks.filter(t => t.isCompleted).length;

// حساب النسبة المئوية للإنجاز 
const progress = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;




  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="h2" fontWeight="bold" sx={{background: "linear-gradient(45deg, #7c4dff 30%, #00e5ff 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            مخطط المهام الذكي
          </Typography>

          <TaskInput onAddTask={addTask} />


    
      {/* إضافة عداد مهام (Task Counter) */}
    <Box sx={{ mb: 1, mt: 1 }}>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
        <Chip 
          label={`إجمالي المهام: ${totalTasks}`} 
          variant="outlined" 
          sx={{ color: 'white', borderColor: '#7c4dff', fontFamily: 'Cairo' }} 
        />
        <Chip 
          label={`المنجزة: ${completedCount}`} 
          color="primary" 
          sx={{ fontFamily: 'Cairo', fontWeight: 'bold' }} 
        />
      </Stack>

        {/* شريط تقدم صغير (Progress Bar) لإظهار نسبة الإنجاز */}
      <LinearProgress 
        variant="determinate" 
        value={progress} 
        sx={{ 
          height: 8, 
          borderRadius: 5, 
          backgroundColor: 'rgba(255,255,255,0.1)',
          '& .MuiLinearProgress-bar': {
            borderRadius: 5,
            background: 'linear-gradient(45deg, #7c4dff 30%, #00e5ff 90%)',
          }
        }} 
      />
    </Box>


          <Tabs 
            value={filter} 
            onChange={(e, newValue) => setFilter(newValue)} 
            centered 
            sx={{ mb: 3 }}
          >
            <Tab label="غير منجزة" value="active" sx={{ color: "white", fontFamily: "Cairo" }} />
            <Tab label="المنجزة" value="completed" sx={{ color: "white", fontFamily: "Cairo" }} />
            <Tab label="الكل" value="all" sx={{ color: "white", fontFamily: "Cairo" }} />
          </Tabs>


          {/* نمرر المصفوفة المفلترة */}
          <TaskList 
          tasks={filteredTasks}
          onDeleteTask={deleteTask}
          onToggleTask={toggleTask}
          onEditTask={handleEditClick}
          /> 


        <EditTaskDialog 
          key={taskToEdit?.id}
          open={isEditOpen} 
          task={taskToEdit} 
          onClose={() => { 
          setIsEditOpen(false)
          setTaskToEdit(null);
          }}
          onSave={updateTask} 
        />

        </Box>
      </Container>



      {/*   رسالة التنبيه   */}
      <Snackbar 
          open={snackbar.open} 
          autoHideDuration={3000} 
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}} // مكان الظهور
        >
        <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity} 
            variant="filled" 
            sx={{ 
              width: '100%',
              fontFamily: 'Cairo',
              borderRadius: '15px',
              fontSize: '1.2rem', 
              padding: '12px 24px',
              boxShadow: '0 8px 16px rgba(0,0,0,0.3)', 
              '& .MuiAlert-icon': 
              {
              fontSize: '2rem' // تكبير الأيقونة (الصح أو الخطأ)
              }
              }}
          >
            {snackbar.message}
        </Alert>
    </Snackbar>

    </ThemeProvider>
  );
}

export default App;
