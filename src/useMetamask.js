
// const provider = new ethers.providers.Web3Provider(window.ethereum);
// provider.send("eth_requestAccounts", []);

import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

export default function useMetamask () {
  const [provider, setProvider] = useState(null)

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.send("eth_requestAccounts", []).then(() => setProvider(provider));
    }
  }, [])

  return provider
}
