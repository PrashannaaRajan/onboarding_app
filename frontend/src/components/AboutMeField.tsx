import React from 'react';
import { TextField } from '@mui/material';

interface Props {
  value: string;
  onChange: (name: string, value: string) => void;
}

const AboutMeField: React.FC<Props> = ({ value, onChange }) => {
  return (
    <TextField
      label="About Me"
      multiline
      rows={4}
      fullWidth
      value={value}
      onChange={(e) => onChange('about_me', e.target.value)}
    />
  );
};

export default AboutMeField;
