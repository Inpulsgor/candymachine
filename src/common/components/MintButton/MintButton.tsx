import { FC, useEffect, useState } from "react";
import { Button, Typography, CircularProgress } from "@mui/material";
import { GatewayStatus, useGateway } from "@civic/solana-gateway-react";
import { toDate } from "common/utils/misc";
import {
  whitelistSettings,
  publicSaleSettings,
  mintPanic,
} from "common/components/UserSettings/UserSettings";
import { MintButtonProps } from "./MintButton.types";
import styles from "./MintButton.styles";

const MintButton: FC<MintButtonProps> = ({
  onMint,
  candyMachine,
  isMinting,
}) => {
  const { requestGatewayToken, gatewayStatus } = useGateway();
  const [clicked, setClicked] = useState(false);
  const whitelistStartDate = toDate(whitelistSettings.startDate)?.getTime();
  const whitelistEndDate = toDate(whitelistSettings.endDate)?.getTime();
  const publicMintStart = toDate(publicSaleSettings.startDate)?.getTime();
  const publicMintEnd = toDate(publicSaleSettings.endDate)?.getTime();

  useEffect(() => {
    if (gatewayStatus === GatewayStatus.ACTIVE && clicked) {
      console.log("Minting");
      onMint();
      setClicked(false);
    }
  }, [gatewayStatus, clicked, setClicked, onMint]);

  const whiteListSaleCheck = () => {
    if (
      whitelistSettings.enabled &&
      whitelistStartDate &&
      whitelistEndDate &&
      Date.now() > whitelistStartDate &&
      Date.now() < whitelistEndDate
    ) {
      return true;
    } else {
      return false;
    }
  };

  const publicSaleCheck = () => {
    if (publicMintStart && publicMintEnd) {
      if (Date.now() > publicMintStart && Date.now() < publicMintEnd) {
        return true;
      } else {
        return false;
      }
    } else if (publicMintStart) {
      if (Date.now() > publicMintStart) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleClick = async () => {
    setClicked(true);
    if (candyMachine?.state.isActive && candyMachine?.state.gatekeeper) {
      console.log("gatekeeper active");
      if (gatewayStatus === GatewayStatus.ACTIVE) {
        console.log(gatewayStatus + GatewayStatus.ACTIVE);
        setClicked(true);
      } else {
        console.log("requeting token");
        let token = await requestGatewayToken();
        console.log(token);
      }
    } else {
      await onMint();
      setClicked(false);
    }
  };

  let WhitelistMintActive = whiteListSaleCheck();
  // console.log("is Whitelist Sale Active? " + whiteListSaleCheck());

  let PublicMintActive = publicSaleCheck();
  // console.log("is public sale live? " + publicSaleCheck());

  // console.log(
  //   candyMachine?.state.isSoldOut,
  //   isMinting,
  //   WhitelistMintActive || PublicMintActive,
  //   !candyMachine?.state.isActive
  // );

  const isDisabled =
    candyMachine?.state.isSoldOut ||
    isMinting ||
    mintPanic.enabled ||
    !(WhitelistMintActive || PublicMintActive);

  return (
    <Button
      sx={styles.button}
      disabled={isDisabled}
      onClick={handleClick}
      variant="contained"
    >
      <Typography sx={styles.buttonText} variant="body1">
        {candyMachine?.state.isSoldOut ? (
          "Sold out"
        ) : isMinting ? (
          <CircularProgress size={30} />
        ) : mintPanic.enabled ? (
          "Mint Paused"
        ) : (
          "Mint"
        )}
      </Typography>
    </Button>
  );
};

export default MintButton;
