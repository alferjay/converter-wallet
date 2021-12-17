import Head from "next/head";
import styles from "./style.module.scss";
import Wallet from "../components/wallet";
import { useState } from "react";

export default function Home() {
  const [txtValues, setTxtValues] = useState({
    nep: 0,
    busd: 0,
  });
  const [showWallet, setShowWallet] = useState(false);

  const busd = 3;

  const handleNEP = (e) => {
    const { value } = e.target;
    const busdValue = parseFloat(value * busd).toFixed(2);
    setTxtValues({ ...txtValues, nep: value, busd: busdValue });
  };

  const handleBUSD = (e) => {
    const { value } = e.target;
    const nepValue = parseFloat(value / busd).toFixed(2);
    setTxtValues({ ...txtValues, busd: value, nep: nepValue });
  };

  const handleShowWallet = (e) => {
    e.preventDefault();
    setShowWallet(true);
  };

  const handleHideWallet = () => {
    setShowWallet(false);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showWallet && <Wallet handleHideWallet={handleHideWallet} />}
      <main className={styles.main}>
        <div className={styles.container}>
          <img src="https://neptunemutual.com/neptune-mutual.svg" alt="Logo" />

          <form>
            <h1>Crypto Converter</h1>
            <div className={styles["field-container"]}>
              <label htmlFor="nep">NEP</label>
              <input
                type="number"
                name="nep"
                id="nep"
                value={txtValues.nep}
                onChange={handleNEP}
              />
            </div>
            <img
              className={styles.refresh_img}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUGqIKHcAWi225qD0Cz_OnWCvIoGcyV48Qeal8BI64juEZdFp6N81-eOkdyvvkGSjmmxk&usqp=CAU"
              alt="refresh"
            />
            <div className="field-container">
              <label htmlFor="busd">BUSD</label>
              <input
                type="number"
                name="busd"
                id="busd"
                value={txtValues.busd}
                onChange={handleBUSD}
              />
            </div>

            <button onClick={handleShowWallet}>Check Wallet Details</button>
          </form>
        </div>
      </main>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
      ;
    </>
  );
}
