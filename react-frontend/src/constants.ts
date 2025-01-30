import { AlertProps } from '@mui/material/Alert';

export const ALERTS = {
    cancel_success: { content: 'The booking was cancelled successfully', severity: 'success' as AlertProps['severity'] },
    cancel_error: { content: 'There was an issue cancelling this booking. Please try again', severity: 'error' as AlertProps['severity'] },
    booking_success: { content: 'Your booking was successful', severity: 'success' as AlertProps['severity'] },
    booking_error: { content: 'There was an issue booking this slot. Please try again', severity: 'error' as AlertProps['severity'] }
}