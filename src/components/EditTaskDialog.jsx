import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useState } from 'react';




const EditTaskDialog = ({ open, task, onClose, onSave }) => {
  const [editedTitle, setEditedTitle] = useState("");

  
  // تحديث النص داخل النافذة عند فتحها بناءً على المهمة المختارة

  const handleSave = () => {
    onSave(task.id, editedTitle);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" dir="rtl">
      <DialogTitle sx={{ textAlign: 'right', fontFamily: 'Cairo' }}>تعديل المهمة</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="عنوان المهمة"
          fullWidth
          variant="outlined"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          sx={{ mt: 1 }}
          inputProps={{ style: { textAlign: 'right', fontFamily: 'Cairo' } }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-start', p: 2 }}>
        <Button onClick={onClose} color="inherit">إلغاء</Button>
        <Button onClick={handleSave} variant="contained" color="primary">حفظ التعديل</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskDialog;