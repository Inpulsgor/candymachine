import { CSSProperties } from 'react';

export interface PhaseCountdownProps {
  date: Date | undefined;
  style?: CSSProperties;
  status?: string;
  onComplete?: () => void;
  start?: Date;
  end?: Date;
}

export interface CountdownRender {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}
