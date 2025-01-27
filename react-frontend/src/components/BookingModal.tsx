import React, {useState} from 'react';
import { useNavigate } from "react-router";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { formatTime, formatDate } from '../pages/utils';
import { bookSlot } from '../services/slot';

import { Slot } from '../types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 4,
  p: 4,
};

export default function BookingModal({ slot, open, onClose }: { slot: Slot, open: boolean, onClose: () => void}) {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const navigate = useNavigate()

  /**
   * Edge cases:
   * 1. no name input
   */

  const handleBook = async () => {
    setLoading(true)
    const res = await bookSlot(slot.id, name);
    setLoading(false)
    onClose()

    if (res.data.isBooked) {
      navigate(`${slot.id}/confirmation`)
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Book this slot?
          </Typography>
            <div>
              Your name:
              <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
              >
                <TextField id="standard-basic" variant="standard" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)}}/>
              </Box>
            </div>
            <div>Date: {formatDate(slot?.startDate)}</div>
            <div>Time: {formatTime(slot?.startDate)}</div>
            <div>Duration: 30 minutes</div>    
            <Stack spacing={2} direction="row">
              <Button variant="text" onClick={onClose}>Cancel</Button>
              <Button variant="contained" onClick={handleBook} loading={loading}>Book</Button>
            </Stack>      
        </Box>
      </Modal>
    </div>
  );
}
