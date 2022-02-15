import { useEffect, useMemo, useState } from "react";
import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";
import { GatewayProvider } from "@civic/solana-gateway-react";
import { Container, Snackbar, Paper, Grid, Alert, Box } from "@mui/material";

import {
  awaitTransactionSignatureConfirmation,
  CANDY_MACHINE_PROGRAM,
  getCandyMachineState,
  mintOneToken,
} from "common/utils/candymachine";
import { CandyMachineAccount } from "types/candymachine";

import { MintButton, PhaseHeader } from "common/components";
import { getPhase } from "common/components/PhaseHeader/PhaseHeader";
import { Phase } from "common/components/PhaseHeader/PhaseHeader.types";
import { AlertState } from "common/utils/utils";
import {
  whitelistSettings,
  publicSaleSettings,
  welcomeSettings,
  MintWelcomeCustomHTML,
  MintWhitelistCustomHTML,
  MintPublicSaleCustomHTML,
} from "common/components/UserSettings/UserSettings";

export interface HomeProps {
  candyMachineId?: anchor.web3.PublicKey;

  connection: anchor.web3.Connection;
  startDate: number;
  txTimeout: number;
  rpcHost: string;
}

const Home = (props: HomeProps) => {
  // const [yourSOLBalance, setYourSOLBalance] = useState<number | null>(null);
  const rpcUrl = props.rpcHost;
  const [whiteListTokenBalance, setWhiteListTokenBalance] = useState<number>(0);
  const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT
  const [mintingTotal, setMintingTotal] = useState<number | null>(null);
  const [itemsAvailable, setItemsAvailable] = useState<number | null>(null);
  const [publicKey, setPublicKey] = useState<PublicKey>();

  const [candyMachine, setCandyMachine] = useState<CandyMachineAccount>();

  const [price, setPrice] = useState<number | null>(null);

  const wallet = useWallet();

  const anchorWallet = useMemo(() => {
    if (
      !wallet ||
      !wallet.publicKey ||
      !wallet.signAllTransactions ||
      !wallet.signTransaction
    ) {
      return;
    }

    return {
      publicKey: wallet.publicKey,
      signAllTransactions: wallet.signAllTransactions,
      signTransaction: wallet.signTransaction,
    } as anchor.Wallet;
  }, [wallet]);

  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  const onMint = async () => {
    try {
      setIsMinting(true);
      document.getElementById("#identity")?.click();
      if (wallet.connected && candyMachine?.program && wallet.publicKey) {
        const mintTxId = (
          await mintOneToken(candyMachine, wallet.publicKey)
        )[0];

        let status: any = { err: true };
        if (mintTxId) {
          status = await awaitTransactionSignatureConfirmation(
            mintTxId,
            props.txTimeout,
            props.connection,
            "singleGossip",
            true
          );
        }

        if (!status?.err) {
          setAlertState({
            open: true,
            message: "Congratulations! Mint succeeded!",
            severity: "success",
          });

          setMintingTotal(mintingTotal! + 1);

          if (whiteListTokenBalance && whiteListTokenBalance > 0)
            setWhiteListTokenBalance(whiteListTokenBalance - 1);
        } else {
          setAlertState({
            open: true,
            message: "Mint failed! Please try again!",
            severity: "error",
          });
        }
      }
    } catch (error: any) {
      // TODO: blech:
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (!error.message) {
          message = "Transaction Timeout! Please try again.";
        } else if (error.message.indexOf("0x138")) {
          message = ``;
        } else if (error.message.indexOf("0x137")) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
          window.location.reload();
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      setAlertState({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      setIsMinting(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (!anchorWallet) {
        console.log("anchor wallet not found");
        return;
      }
      console.log("wallet connected");
      if (anchorWallet.publicKey) {
        setPublicKey(anchorWallet.publicKey);
      }

      // try {
      //   const balance = await props.connection.getBalance(
      //     anchorWallet.publicKey
      //   );
      //   console.log("Sol balance is: " + balance);
      //   setYourSOLBalance(balance);
      // } catch (e) {
      //   console.log("Problem getting fair launch state");
      //   console.log(e);
      // }

      if (props.candyMachineId) {
        try {
          const cndy = await getCandyMachineState(
            anchorWallet,
            props.candyMachineId,
            props.connection
          );
          await setCandyMachine(cndy);
        } catch (e) {
          console.log("Problem getting candy machine state");
          console.log(e);
        }
      } else {
        console.log("No candy machine detected in configuration.");
      }
    })();
  }, [anchorWallet, props.candyMachineId, props.connection]);

  useEffect(() => {
    async function getTokenAmount() {
      if (publicKey && candyMachine?.state.whitelistMintSettings?.mint) {
        try {
          const tokenAmount =
            await props.connection.getParsedTokenAccountsByOwner(publicKey, {
              mint: candyMachine?.state.whitelistMintSettings?.mint,
            });

          return tokenAmount.value[0].account.data.parsed.info.tokenAmount
            .amount;
        } catch {
          return 0;
        }
      }
    }

    getTokenAmount().then((wlToken) => {
      setWhiteListTokenBalance(wlToken);
      if (candyMachine?.state.whitelistMintSettings?.discountPrice && wlToken) {
        setPrice(
          candyMachine?.state.whitelistMintSettings?.discountPrice.toNumber() /
            1000000000
        );
      } else if (candyMachine?.state.price) {
        setPrice(candyMachine?.state.price.toNumber() / 1000000000);
      }
    });

    if (candyMachine?.state.itemsAvailable) {
      setItemsAvailable(candyMachine?.state.itemsAvailable);
    }

    if (candyMachine?.state.itemsRedeemed == null) {
      setMintingTotal(0);
    } else {
      setMintingTotal(candyMachine?.state.itemsRedeemed);
    }
  }, [candyMachine, publicKey, props.connection]);

  const phase = getPhase(candyMachine);

  return (
    <Container>
      <Container maxWidth="xs" style={{ position: "relative" }}>
        <Paper
          style={{
            padding: "34px 24px 90px 24px",
            display: "flex",

            borderRadius: 6,
          }}
          className="minting-box"
        >
          <Grid container justifyContent="space-between" direction="column">
            <PhaseHeader
              phase={phase}
              candyMachine={candyMachine}
              rpcUrl={rpcUrl}
            />

            <div>
              {phase === Phase.Welcome && welcomeSettings.enableCustomHTML && (
                <MintWelcomeCustomHTML />
              )}
              {phase === Phase.WhiteListMint &&
                whitelistSettings.enableCustomHTML && (
                  <MintWhitelistCustomHTML />
                )}
              {phase === Phase.PublicMint &&
                publicSaleSettings.enableCustomHTML && (
                  <MintPublicSaleCustomHTML />
                )}

              {(phase === Phase.PublicMint || Phase.WhiteListMint) && (
                <>
                  {phase === Phase.WhiteListMint && (
                    <div className="card minting-info text-center">
                      {whiteListTokenBalance >= 0 ? (
                        <h1>{whiteListTokenBalance}</h1>
                      ) : (
                        <div className="loading"></div>
                      )}

                      <div>
                        <p>Mints to Claim</p>
                      </div>
                    </div>
                  )}

                  <Grid
                    container
                    justifyContent="space-between"
                    color="textSecondary"
                  >
                    <div className="test-stat">
                      {(phase === Phase.WhiteListMint ||
                        phase === Phase.PublicMint) &&
                        (itemsAvailable !== null && mintingTotal !== null ? (
                          <p>{mintingTotal + " / " + itemsAvailable}</p>
                        ) : (
                          <p className="loading"></p>
                        ))}
                    </div>

                    <div className="text-end">
                      {(phase === Phase.Welcome && welcomeSettings.showPrice) ||
                      phase === Phase.WhiteListMint ||
                      phase === Phase.PublicMint ? (
                        <>
                          {price ? (
                            <p>{price} Sol</p>
                          ) : (
                            <p className="loading"></p>
                          )}
                        </>
                      ) : (
                        ""
                      )}

                      {/* {formatSol(yourSOLBalance || 0).toLocaleString()} SOL */}
                    </div>
                  </Grid>

                  {wallet.connected ? (
                    <WalletDialogButton>Connect{""}</WalletDialogButton>
                  ) : (
                    <Box>
                      {candyMachine?.state.isActive &&
                      candyMachine?.state.gatekeeper &&
                      wallet.publicKey &&
                      wallet.signTransaction ? (
                        <GatewayProvider
                          wallet={{
                            publicKey:
                              wallet.publicKey ||
                              new PublicKey(CANDY_MACHINE_PROGRAM),
                            //@ts-ignore
                            signTransaction: wallet.signTransaction,
                          }}
                          // // Replace with following when added
                          // gatekeeperNetwork={candyMachine.state.gatekeeper_network}
                          gatekeeperNetwork={
                            candyMachine?.state?.gatekeeper?.gatekeeperNetwork
                          } // This is the ignite (captcha) network
                          /// Don't need this for mainnet
                          clusterUrl={rpcUrl}
                          options={{ autoShowModal: false }}
                        >
                          <MintButton
                            candyMachine={candyMachine}
                            isMinting={isMinting}
                            onMint={onMint}
                          />
                        </GatewayProvider>
                      ) : (
                        <MintButton
                          candyMachine={candyMachine}
                          isMinting={isMinting}
                          onMint={onMint}
                        />
                      )}
                    </Box>
                  )}
                </>
              )}
            </div>
          </Grid>
        </Paper>
      </Container>

      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={() => setAlertState({ ...alertState, open: false })}
      >
        <Alert
          onClose={() => setAlertState({ ...alertState, open: false })}
          severity={alertState.severity}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Home;