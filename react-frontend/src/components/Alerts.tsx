import { Section } from '../components/styled';

import Alert from '@mui/material/Alert';
import { Flag } from '../types';

export const Alerts = ({ alert, onClose }: { alert?: Flag, onClose: () => void }) => {
  if (!alert) return null

  return (
    <Section>
      <Alert severity={alert.severity} onClose={onClose}>{alert.content}</Alert>
    </Section>
  )
}
