
// const provider = new ethers.providers.Web3Provider(window.ethereum);
// provider.send("eth_requestAccounts", []);

import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

// 0x104F89d9c3c46a294cDcC31a1279f0707611497a

const abi = [
  "function heranca(address herdeiro) public view returns(uint256)",
  "function adicionarFundos(address herdeiro) public payable",
  "function saque() public",
];

export default function useInventario (provider) {
  const [valorHeranca, setValorHeranca] = useState(null)
  const [contract, setContract] = useState(null)

  useEffect(() => {
    if (provider) {
      (async () => {
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        const contract = new ethers.Contract('0x104F89d9c3c46a294cDcC31a1279f0707611497a', abi, provider)
        const valorHeranca = await contract.heranca(address)
        setValorHeranca(valorHeranca)

        setContract(contract)
      })()
    }
  }, [provider])

  return [valorHeranca, contract]
}
