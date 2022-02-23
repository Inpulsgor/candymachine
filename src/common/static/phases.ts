import * as anchor from '@project-serum/anchor';
import { date } from 'common/components/UserSettings/UserSettings';
import { toDate } from 'common/utils/misc';

export interface Phase {
  phase: number;
  description: string;
  duration: string;
  starts: string;
  startDate: anchor.BN;
  endDate: anchor.BN;
}

export const phases: Array<Phase> = [
  {
    phase: 1,
    description:
      'Active CPro members who are on the Whitelist can mint ONLY ONE.',
    duration: 'Lasts 24 hours',
    starts: 'starts at 00:00 UTC on 25/02/2022',
    startDate: date('25 Feb 2022 00:00:00 UTC'),
    endDate: date('25 Feb 2022 23:59:59 UTC'),
  },
  {
    phase: 2,
    description:
      'Active CPro members will be able to return and mint up to 14 more NFTs.',
    duration: 'Lasts 24 hours',
    starts: 'starts at 00:00 UTC on 26/02/2022',
    startDate: date('26 Feb 2022 00:00:00 UTC'),
    endDate: date('26 Feb 2022 23:59:59 UTC'),
  },
  {
    phase: 3,
    description:
      'Anyone on the Whitelist will be able to mint one NFT. Active CPro members can continue minting up to their limit of 14 NFTs.',
    duration: 'Lasts 12 hours',
    starts: 'starts at 12:00 UTC on 26/02/2022',
    startDate: date('26 Feb 2022 12:00:00 UTC'),
    endDate: date('26 Feb 2022 23:59:59 UTC'),
  },
  {
    phase: 4,
    description: 'Anyone will be able to mint as many NFTs as they want.',
    duration: '',
    starts: 'starts at 00:00 UTC on 27/02/2022',
    startDate: date('27 Feb 2022 00:00:00 UTC'),
    endDate: date('27 Feb 2122 00:00:00 UTC'),
  },
];
