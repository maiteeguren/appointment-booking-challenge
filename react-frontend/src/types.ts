import { Dayjs } from "dayjs";
import { AlertProps } from '@mui/material/Alert';

export type Slot = {
    id: string;
    startDate: Dayjs;
    isBooked?: string;
    bookedCustomerName?: string;
}

export type Flag = {
    content: string,
    severity: AlertProps['severity']
}