import { Paper, Typography, IconButton, Checkbox, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; // استيراد أيقونة التعديل

const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {

  return (
    <Paper 
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        mb: 2,
        borderRadius: '15px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        direction: 'rtl' // لضمان ترتيب العناصر من اليمين لليسار
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox 
          checked={task.isCompleted} 
          onChange={() => onToggle(task.id)} // استدعاء الدالة عند التغيير
          sx={{ color: '#7c4dff', '&.Mui-checked': { color: '#00e5ff' } }} 
        />
        <Typography 
          sx={{ 
            color: 'white', 
            textDecoration: task.isCompleted ? 'line-through' : 'none',
            opacity: task.isCompleted ? 0.5 : 1,
            mr: 1 // مسافة بسيطة بعد التشيك بوكس
          }}
        >
          {task.title}
        </Typography>
      </Box>

      <Box>
        {/* زر التعديل بلون أزرق أو سماوي */}
        <IconButton sx={{ color: '#00e5ff', ml: 1 }}
        onClick={() => onEdit(task)}
        >
        <EditIcon />
        </IconButton>
        
        {/* زر الحذف */}
        <IconButton sx={{ color: '#ff5252' }}
        onClick={() => onDelete(task.id)} // استدعاء الدالة مع تمرير رقم المهمة
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default TaskItem;