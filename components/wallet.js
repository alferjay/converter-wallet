import React, { useState, useEffect } from "react";
import { injected } from "./connectors";
import style from "./wallet.module.scss";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";

const Wallet = ({ handleHideWallet }) => {
  const { active, account, library, connector, activate, deactivate, chainId } =
    useWeb3React();
  const [connected, setConnected] = useState(false);
  const [curBalance, setCurBallance] = useState(null);

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function getBalance() {
    try {
      const bal = await library.eth.getBalance(account);
      const conv_bal = Web3.utils.fromWei(bal, "ether");
      setCurBallance(parseFloat(conv_bal).toFixed(1));
    } catch (ex) {
      console.log(ex);
    }
  }

  console.log(chainId);

  useEffect(() => {
    if (active) {
      getBalance();
    }
  }, [active]);

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  const handleConnect = () => {
    connect();
    setConnected(true);
  };

  const handleDisConnect = () => {
    disconnect();
    setConnected(false);
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <h3>Wallet Details</h3>

        {connected ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Account</td>
                  <td>
                    {active &&
                      `${account.slice(0, 6)}...${account.slice(
                        account.length - 4,
                        account.length
                      )}`}
                  </td>
                </tr>
                <tr>
                  <td>Chain ID</td>
                  <td>{active && chainId}</td>
                </tr>
                <tr>
                  <td>Balance</td>
                  <td>{active && curBalance}</td>
                </tr>
              </tbody>
            </table>
            <p style={{ textAlign: "center", color: "#888" }}>Wallet Details</p>
            <button className={style.button_danger} onClick={handleDisConnect}>
              Disconnect
            </button>
          </>
        ) : (
          <>
            <div>
              <p className={style.error}>
                Wallet not connected. Please click the "Connect Now" button
                below.
              </p>
              <button className={style.button_primary} onClick={handleConnect}>
                Connect
              </button>{" "}
              <button
                className={style.button_secondary}
                onClick={handleHideWallet}
              >
                Cancel
              </button>
            </div>
          </>
        )}
        <button className={style.close_button} onClick={handleHideWallet}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Wallet;
