import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import SlotDescription from './SlotDescription';
import { Slot } from '../types';

import { Section, InputWrapper, ButtonGroup } from './styled';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
  borderRadius: '5px',
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

  return (
    slot && (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        data-testid='confirmation-modal'
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Book this slot?
          </Typography>
          <Section>
            <InputWrapper>
              <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch', margin: 0 } }}
                noValidate
                autoComplete="off"
              >
                <TextField id="name-input" variant="standard" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setName(event.target.value)
                }} label='Your name' />
              </Box>
            </InputWrapper>
          </Section>
          <SlotDescription startDate={slot.startDate} />
          <ButtonGroup>
            <Button variant="text" onClick={onClose}>Cancel</Button>
            <Button variant="contained" onClick={() => onBookSlot(slot.id, name)} loading={loading} disabled={!name.length} data-testid='book-slot-button'>Book</Button>
          </ButtonGroup>
        </Box>
      </Modal>
    )
  );
}
