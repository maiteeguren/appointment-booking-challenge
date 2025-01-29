import React from 'react';

import { formatTime, formatDate } from '../pages/utils';

import { Slot } from '../types';
import { SectionTitle } from './styled';

type Props = {
  startDate: Slot['startDate']
}

export default function SlotDescription({ startDate }: Props) {
  return (
    <>
        <div><SectionTitle>Date: </SectionTitle>
          {formatDate(startDate)}</div>
        <div><SectionTitle>Time: </SectionTitle>
          {formatTime(startDate)}</div>
        <div><SectionTitle>Duration: </SectionTitle>
          30 minutes</div>
    </>
  );
}
