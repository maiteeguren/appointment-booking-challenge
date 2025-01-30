import React from 'react';

import { formatTime, formatDate } from '../pages/utils';

import { Slot } from '../types';
import { SectionTitle, Section } from './styled';

type Props = {
  startDate: Slot['startDate']
}

export default function SlotDescription({ startDate }: Props) {
  return (
    <Section>
        <div><SectionTitle>Date: </SectionTitle>
          {formatDate(startDate)}</div>
        <div><SectionTitle>Time: </SectionTitle>
          {formatTime(startDate)}</div>
        <div><SectionTitle>Duration: </SectionTitle>
          30 minutes</div>
    </Section>
  );
}
