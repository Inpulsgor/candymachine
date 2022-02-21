import * as anchor from '@project-serum/anchor';

export interface HeaderProps {
  phaseName: string;
  desc: string | undefined;
  date?: anchor.BN | undefined;
  status?: string;
  countdown?: boolean;
  countdownEnable?: boolean;
}
