import { Grid, TextField } from '@mui/material';

const AddressFields = ({ formData, onChange }: any) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField label="Street" fullWidth name="street" value={formData.street || ''} onChange={(e) => onChange('street', e.target.value)} />
    </Grid>
    <Grid item xs={6}>
      <TextField label="City" fullWidth name="city" value={formData.city || ''} onChange={(e) => onChange('city', e.target.value)} />
    </Grid>
    <Grid item xs={3}>
      <TextField label="State" fullWidth name="state" value={formData.state || ''} onChange={(e) => onChange('state', e.target.value)} />
    </Grid>
    <Grid item xs={3}>
      <TextField label="Zip" fullWidth name="zip" value={formData.zip || ''} onChange={(e) => onChange('zip', e.target.value)} />
    </Grid>
  </Grid>
);

export default AddressFields;
