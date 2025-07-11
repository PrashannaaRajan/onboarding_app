import React from 'react';
import { TextField } from '@mui/material';

interface Props {
  value: string;
  onChange: (name: string, value: string) => void;
}

const BirthdateField: React.FC<Props> = ({ value, onChange }) => {
  return (
    <TextField
      label="Birthdate"
      type="date"
      fullWidth
      InputLabelProps={{ shrink: true }}
      value={value}
      onChange={(e) => onChange('birthdate', e.target.value)}
    />
  );
};

export default BirthdateField;
