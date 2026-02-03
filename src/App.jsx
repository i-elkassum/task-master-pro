import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Box,
  Typography,
  Tabs, 
  Tab,
  Snackbar, 
  Alert,
  Chip, 
  Stack, 
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";
import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import EditTaskDialog from "./components/EditTaskDialog";

// 1. إنشاء ثيم مخصص باحترافية
const theme = createTheme({
  direction: "rtl",
  palette: {
    mode: "dark", 
    primary: {
      main: "#7c4dff", 
    },
    background: {
      default: "#0a1929", 
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
    severity: "success",
  });

  // --- حالات إدارة نافذة تأكيد الحذف ---
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const showMessage = (msg, sev = "success") => {
    setSnackbar({ open: true, message: msg, severity: sev });
  };

  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title: title,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
    showMessage("تم إضافة المهمة بنجاح! ✨");
  };

  // 2. دالة فتح نافذة التأكيد (بدلاً من الحذف المباشر)
  const openDeleteConfirmation = (id) => {
    setTaskIdToDelete(id);
    setIsConfirmOpen(true);
  };

  // 3. دالة الحذف الفعلي بعد التأكيد
  const confirmDeleteTask = () => {
    setTasks(tasks.filter((task) => task.id !== taskIdToDelete));
    setIsConfirmOpen(false);
    setTaskIdToDelete(null);
    showMessage("تم حذف المهمة بنجاح", "error");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.isCompleted;
    if (filter === "active") return !task.isCompleted;
    return true;
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleEditClick = (task) => {
    setTaskToEdit(task);
    setIsEditOpen(true);
  };

  const updateTask = (id, newTitle) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, title: newTitle } : t)));
    showMessage("تم تحديث المهمة 📝");
  };

  const totalTasks = tasks.length;
  const completedCount = tasks.filter((t) => t.isCompleted).length;
  const progress = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography
            variant="h2"
            fontWeight="bold"
            align="center"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "3.5rem" },
              mb: 3,
              background: "linear-gradient(45deg, #7b1fa2 30%, #4a148c 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            مخطط المهام الذكي
          </Typography>

          <TaskInput onAddTask={addTask} />

          <Box sx={{ mb: 1, mt: 1 }}>
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
              <Chip
                label={`إجمالي المهام: ${totalTasks}`}
                variant="outlined"
                sx={{ color: "white", borderColor: "#7c4dff", fontFamily: "Cairo" }}
              />
              <Chip
                label={`المنجزة: ${completedCount}`}
                color="primary"
                sx={{ fontFamily: "Cairo", fontWeight: "bold" }}
              />
            </Stack>

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: "rgba(255,255,255,0.1)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 5,
                  background: "linear-gradient(45deg, #7c4dff 30%, #00e5ff 90%)",
                },
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

          <TaskList
            tasks={filteredTasks}
            onDeleteTask={openDeleteConfirmation} // نمرر دالة فتح التأكيد هنا
            onToggleTask={toggleTask}
            onEditTask={handleEditClick}
          />

          <EditTaskDialog
            key={taskToEdit?.id}
            open={isEditOpen}
            task={taskToEdit}
            onClose={() => {
              setIsEditOpen(false);
              setTaskToEdit(null);
            }}
            onSave={updateTask}
          />
        </Box>
      </Container>

      {/* --- نافذة تأكيد الحذف --- */}
      <Dialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        PaperProps={{
          sx: { borderRadius: "20px", padding: "10px", backgroundColor: "#132f4c" }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', fontFamily: 'Cairo', fontWeight: 'bold' }}>
          تأكيد الحذف
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: 'center', fontFamily: 'Cairo', color: '#eee' }}>
            هل أنت متأكد من رغبتك في حذف هذه المهمة؟ لا يمكن التراجع عن هذا الإجراء.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-around', pb: 2 }}>
          <Button 
            onClick={() => setIsConfirmOpen(false)} 
            sx={{ fontFamily: 'Cairo', color: '#fff' }}
          >
            إلغاء
          </Button>
          <Button 
            onClick={confirmDeleteTask} 
            variant="contained" 
            color="error" 
            sx={{ fontFamily: 'Cairo', borderRadius: '10px' }}
          >
            نعم، احذفها
          </Button>
        </DialogActions>
      </Dialog>

      {/* رسالة التنبيه (Snackbar) */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            width: "100%",
            fontFamily: "Cairo",
            borderRadius: "15px",
            fontSize: "1.1rem",
            boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;