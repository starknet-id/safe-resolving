import styles from '@/styles/Home.module.css'
import { connect, disconnect, StarknetWindowObject } from 'get-starknet'
import { useState } from 'react';

export default function Home() {

  const selector = 483169958307474692663332918813952323073956179318861159525186903285592065456;
  const [wallet, setWallet] = useState<StarknetWindowObject | null>(null);
  async function clicked() {
    console.log(wallet)
    if (!wallet || !wallet.account) {
      console.log("ooops your wallet didn't load correctly:", wallet)
      return;
    }

    await wallet.account.execute([
      // toggle smart multicall
      {
        contractAddress: '0x0',
        entrypoint: 'use_smart_multicall',
        calldata: [],
      },
      // convert fricoben.stark to a string
      {
        contractAddress: '0x3bab268e932d2cecd1946f100ae67ce3dff9fd234119ea2f6da57d16d29fce',
        entrypoint: 'domain_to_address',
        // value: array_length
        // value: fricoben encoded
        calldata: [0, 1, 0, 1499554868251],
      },

      {
        contractAddress: '0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7',
        entrypoint: 'transfer',
        // ref: output[0]
        // value: 1 (wei)
        calldata: [1, 0, 0, 1],
      },

    ]
    )
  }

  return (
    <main className={styles.main}>

      <button onClick={wallet ? clicked : () => {
        connect().then((wallet) => setWallet(wallet))
      }} className={styles.button}>{
          wallet ?
            "send 1 wei to fricoben.stark"
            : "connect"}</button>

    </main>

  )
}
