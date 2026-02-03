import { Box, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment'; // أيقونة مهام
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDeleteTask, onToggleTask, onEditTask }) => {
  // إذا كانت القائمة فارغة
  if (tasks.length === 0) {
    return (
      <Box 
        sx={{ 
          mt: 10, 
          textAlign: 'center', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <AssignmentIcon sx={{ fontSize: '100px', color: '#7c4dff', mb: 2 }} />
        <Typography variant="h6" sx={{ fontFamily: 'Cairo', color: 'white' }}>
          لا توجد مهام حالياً..
        </Typography>
        <Typography sx={{ fontFamily: 'Cairo', color: '#00e5ff' }}>
          ابدأ بإضافة أول مهمة لإنجازها اليوم! 🚀
        </Typography>
      </Box>
    );
  }

  // إذا كانت تحتوي على مهام، نعرض القائمة كالمعتاد
  return (
    <Box>
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onDelete={onDeleteTask} 
          onToggle={onToggleTask}
          onEdit={onEditTask}
        />
      ))}
    </Box>
  );
};

export default TaskList;
