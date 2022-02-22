import { FC, useEffect, useMemo, useState } from 'react';
import * as anchor from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletDialogButton } from '@solana/wallet-adapter-material-ui';
import { GatewayProvider } from '@civic/solana-gateway-react';
import {
  Typography,
  Box,
  CardActions,
  CardContent,
  Snackbar,
  Alert,
} from '@mui/material';

import { MintButton, PhaseHeader } from 'common/components';
import { Phase } from 'common/components/PhaseHeader/PhaseHeader.types';
import { welcomeSettings } from 'common/components/UserSettings/UserSettings';
import { MinterProps, AlertState } from './Minter.types';
import {
  awaitTransactionSignatureConfirmation,
  CANDY_MACHINE_PROGRAM,
  getCandyMachineState,
  mintOneToken,
} from 'common/utils/candymachine';
import {
  getPhase,
  // TOKEN_MINT_ADDRESS,
  // findAssociatedTokenAddress,
} from 'common/utils/misc';
import { CandyMachineAccount } from 'types/candymachine';
import styles from './Minter.styles';

const initialAlersState = {
  open: false,
  message: '',
  severity: undefined,
};

const Minter: FC<MinterProps> = ({
  connection,
  rpcHost,
  txTimeout,
  candyMachineId,
}) => {
  // const [yourSOLBalance, setYourSOLBalance] = useState<number | null>(null);
  const [whiteListTokenBalance, setWhiteListTokenBalance] = useState<number>(0);
  const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT
  const [mintingTotal, setMintingTotal] = useState<number | null>(0);
  const [itemsAvailable, setItemsAvailable] = useState<number | null>(0);
  const [showTotalMinted, setShowTotalMinted] = useState(false);
  const [pubKey, setPubKey] = useState<PublicKey>();
  const [candyMachine, setCandyMachine] = useState<CandyMachineAccount>();
  const [price, setPrice] = useState<number | null>(null);
  const [alertState, setAlertState] = useState<AlertState>(initialAlersState);
  const { publicKey, signAllTransactions, signTransaction, connected } =
    useWallet();
  const phase = getPhase(candyMachine);
  const rpcUrl = rpcHost;

  const anchorWallet = useMemo(() => {
    if (!publicKey || !signAllTransactions || !signTransaction) return;

    return {
      publicKey,
      signAllTransactions,
      signTransaction,
    } as anchor.Wallet;
  }, [publicKey, signAllTransactions, signTransaction]);

  // useEffect(() => {
  //   if (publicKey) {
  //     findAssociatedTokenAddress(publicKey, TOKEN_MINT_ADDRESS).then(
  //       response => {
  //         console.log('findAssociatedTokenAddress response', response);
  //       },
  //     );
  //   }
  // }, [publicKey]);

  useEffect(() => {
    if (itemsAvailable && mintingTotal) {
      if (mintingTotal > itemsAvailable / 2) setShowTotalMinted(true);
    }
  }, [itemsAvailable, mintingTotal]);

  useEffect(() => {
    (async () => {
      if (!anchorWallet) return console.log('anchor wallet not found');

      console.log('wallet connected');
      if (anchorWallet.publicKey) setPubKey(anchorWallet.publicKey);

      // try {
      //   const balance = await connection.getBalance(
      //     anchorWallet.publicKey
      //   );
      //   console.log("Sol balance is: " + balance);
      //   setYourSOLBalance(balance);
      // } catch (e) {
      //   console.log("Problem getting fair launch state");
      //   console.log(e);
      // }

      if (candyMachineId) {
        try {
          const cndy = await getCandyMachineState(
            anchorWallet,
            candyMachineId,
            connection,
          );
          await setCandyMachine(cndy);
        } catch (e) {
          console.log('Problem getting candy machine state');
          console.log(e);
        }
      } else {
        console.log('No candy machine detected in configuration.');
      }
    })();
  }, [anchorWallet, candyMachineId, connection]);

  useEffect(() => {
    const getTokenAmount = async () => {
      if (pubKey && candyMachine?.state.whitelistMintSettings?.mint) {
        try {
          const tokenAmount = await connection.getParsedTokenAccountsByOwner(
            pubKey,
            {
              mint: candyMachine?.state.whitelistMintSettings?.mint,
            },
          );

          return tokenAmount.value[0].account.data.parsed.info.tokenAmount
            .amount;
        } catch {
          return 0;
        }
      }
    };

    getTokenAmount().then(wlToken => {
      setWhiteListTokenBalance(wlToken);
      if (candyMachine?.state.whitelistMintSettings?.discountPrice && wlToken) {
        setPrice(
          candyMachine?.state.whitelistMintSettings?.discountPrice.toNumber() /
            1000000000,
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
  }, [candyMachine, pubKey, connection]);

  const onMint = async () => {
    try {
      setIsMinting(true);
      document.getElementById('#identity')?.click();
      if (connected && candyMachine?.program && publicKey) {
        const mintTxId = (await mintOneToken(candyMachine, publicKey))[0];
        let status: any = { err: true };

        if (mintTxId) {
          status = await awaitTransactionSignatureConfirmation(
            mintTxId,
            txTimeout,
            connection,
            'singleGossip',
            true,
          );
        }

        if (!status?.err) {
          setAlertState({
            open: true,
            message: 'Congratulations! Mint succeeded!',
            severity: 'success',
          });

          setMintingTotal(mintingTotal! + 1);

          if (whiteListTokenBalance && whiteListTokenBalance > 0) {
            setWhiteListTokenBalance(whiteListTokenBalance - 1);
          }
        } else {
          setAlertState({
            open: true,
            message: 'Mint failed! Please try again!',
            severity: 'error',
          });
        }
      }
    } catch (error: any) {
      // TODO: blech:
      let message = error.msg || 'Minting failed! Please try again!';
      if (!error.msg) {
        if (!error.message) {
          message = 'Transaction Timeout! Please try again.';
        } else if (error.message.indexOf('0x138')) {
          console.log(error.message);
        } else if (error.message.indexOf('0x137')) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf('0x135')) {
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
        severity: 'error',
      });
    } finally {
      setIsMinting(false);
    }
  };

  const showMinted =
    phase === Phase.WhiteListMint || phase === Phase.PublicMint;

  const showPrice =
    (phase === Phase.Welcome && welcomeSettings.showPrice) ||
    phase === Phase.WhiteListMint ||
    phase === Phase.PublicMint;

  const availableTotal = !!itemsAvailable && !!mintingTotal && showTotalMinted;

  const getVisibleTotal = () => {
    if (!connected) return 'loading';
    else if (connected && !showTotalMinted) return '';

    return '';
  };

  const onAlertClose = () => setAlertState(initialAlersState);

  return (
    <>
      <CardActions sx={styles.actionsBox}>
        <PhaseHeader
          phase={phase}
          candyMachine={candyMachine}
          rpcUrl={rpcUrl}
        />

        {(phase === Phase.PublicMint || Phase.WhiteListMint) && (
          <>
            {phase === Phase.WhiteListMint && (
              <Box className="card minting-info text-center">
                {whiteListTokenBalance >= 0 ? (
                  <Typography variant="h2" component="h2">
                    {whiteListTokenBalance}
                  </Typography>
                ) : (
                  <Box sx={{ mb: '16px' }} className="loading"></Box>
                )}

                <Typography>Mints to Claim</Typography>
              </Box>
            )}

            <Box sx={styles.stats} style={{ marginLeft: 0 }}>
              {showMinted && (
                <Typography className={getVisibleTotal()}>
                  {availableTotal && mintingTotal + ' / ' + itemsAvailable}
                </Typography>
              )}

              {showPrice && (
                <Typography
                  sx={{ paddingRight: !price ? '10px' : '' }}
                  className={!price ? 'loading' : ''}
                >
                  {price ? `${price} Sol` : ''}
                </Typography>
              )}
            </Box>

            {!connected ? (
              <WalletDialogButton
                sx={styles.walletBtn}
                variant="contained"
                fullWidth
              >
                <Typography sx={styles.walletBtnText} variant="body1">
                  Connect Wallet
                </Typography>
              </WalletDialogButton>
            ) : (
              <>
                {candyMachine?.state.isActive &&
                candyMachine?.state.gatekeeper &&
                publicKey &&
                signTransaction ? (
                  <GatewayProvider
                    wallet={{
                      publicKey:
                        publicKey || new PublicKey(CANDY_MACHINE_PROGRAM),
                      //@ts-ignore
                      signTransaction,
                    }}
                    gatekeeperNetwork={
                      candyMachine?.state?.gatekeeper?.gatekeeperNetwork
                    }
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
              </>
            )}
          </>
        )}
      </CardActions>

      <CardContent sx={styles.contentBoxSecond}>
        <Typography sx={styles.walletText} variant="body1" component="span">
          Wallet
        </Typography>
        <Typography
          sx={connected ? styles.connected : styles.notConnected}
          variant="body1"
          component="span"
        >
          {connected ? 'Connected' : 'Not connected'}
        </Typography>
      </CardContent>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={alertState.open}
        autoHideDuration={6000}
        onClose={onAlertClose}
      >
        <Alert
          onClose={onAlertClose}
          severity={alertState.severity}
          variant="filled"
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Minter;
