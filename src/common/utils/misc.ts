import { CandyMachineAccount } from "types/candymachine";
import { Phase } from "common/components/PhaseHeader/PhaseHeader.types";
import { mintPanic } from "common/components/UserSettings/UserSettings";
import { toDate } from "common/utils/utils";
import {
  publicSaleSettings,
  whitelistSettings,
} from "common/components/UserSettings/UserSettings";

export const getPhase = (
  candyMachine: CandyMachineAccount | undefined
): Phase => {
  const curr = new Date().getTime();
  // const candyMachineGoLive = toDate(candyMachine?.state.goLiveDate)?.getTime();
  const whiteListStart = toDate(whitelistSettings.startDate)?.getTime();
  const whiteListEnd = toDate(whitelistSettings.endDate)?.getTime();
  const publicSaleStart = toDate(publicSaleSettings.startDate)?.getTime();
  // const publicSaleEnd = toDate(publicSaleSettings.endDate)?.getTime();

  //Countdown, WhiteList Minting, Public Minting,

  if (mintPanic.enabled === true) {
    return Phase.Panic;
  } else if (publicSaleStart && curr > publicSaleStart) {
    return Phase.PublicMint;
  } else if (
    whitelistSettings.enabled &&
    whiteListStart &&
    whiteListEnd &&
    curr > whiteListStart &&
    curr < whiteListEnd
  ) {
    return Phase.WhiteListMint;
  } else {
    return Phase.Welcome;
  }
};
