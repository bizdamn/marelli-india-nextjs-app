import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Box from '@mui/material/Box';

export default function DatePickerComponent({ startDate, SetStartDate, endDate, SetEndDate }) {

  function setValue(value) {
    SetStartDate(value)
    SetEndDate(value)
    console.log(value)
  }

  return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Box m={2}>
        <DatePicker
          label="Choose a date"
          value={startDate}
          onChange={setValue}
          renderInput={(params) => <TextField {...params} />}
        />
    </Box>
      </LocalizationProvider>
  );
}
