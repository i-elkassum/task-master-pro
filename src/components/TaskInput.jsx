import { useState } from "react"; // 1. استيراد الـ Hook
import { Box, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const TaskInput = ({ onAddTask }) => {
  // 2. تعريف الحالة لتخزين النص
  const [inputValue, setInputValue] = useState("");

  // 3. دالة التعامل مع الضغط على الزر
  const handleAddClick = () => {
    if (inputValue.trim() !== "") {
      // التأكد أن الحقل ليس فارغاً
      onAddTask(inputValue);
      setInputValue(""); // مسح الحقل بعد الإضافة
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1, mb: 4 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="ما هي خطتك القادمة؟"
        dir="rtl"
        value={inputValue} // ربط القيمة بالـ State
        onChange={(e) => setInputValue(e.target.value)} // تحديث الـ State عند كل حرف
        slotProps={{
          htmlInput: {
            style: { textAlign: "right", direction: "rtl" },
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            color: "white",
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddClick} // ربط الزر بالدالة
        sx={{ borderRadius: "12px", px: 3 }}
      >
        <AddIcon />
      </Button>
    </Box>
  );
};

export default TaskInput;

