import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { formatTime, formatDate } from '../pages/utils';

import { Slot, Flag } from '../types';

import { Section, SectionTitle, InputWrapper, ButtonGroup } from './styled';

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

type Props = {
  slot: Slot | null;
  open: boolean;
  onClose: () => void;
  onBookSlot: (id: string, name: string) => void;
  loading: boolean,
}

export default function SlotConfirmation({ slot, open, onClose, onBookSlot, loading }: Props) {
  const [name, setName] = useState('')

  /**
   * Edge cases:
   * 1. no name input
   */

  return (
    slot && (
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
          <Section>
            <InputWrapper>
              <SectionTitle>Your name: </SectionTitle>
              <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
              >
                <TextField id="standard-basic" variant="standard" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setName(event.target.value)
                }} />
              </Box>
            </InputWrapper>
            <div><SectionTitle>Date: </SectionTitle>
              {formatDate(slot?.startDate)}</div>
            <div><SectionTitle>Time: </SectionTitle>
              {formatTime(slot?.startDate)}</div>
            <div><SectionTitle>Duration: </SectionTitle>
              30 minutes</div>
          </Section>
          <ButtonGroup>
            <Button variant="text" onClick={onClose}>Cancel</Button>
            <Button variant="contained" onClick={() => onBookSlot(slot.id, name)} loading={loading}>Book</Button>
          </ButtonGroup>
        </Box>
      </Modal>
    )
  );
}
