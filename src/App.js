import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import useInventario from './useInventario'
import useMetamask from './useMetamask'
import './App.css';

function App() {
  const provider = useMetamask();
  const [myAddress, myBalance] = useUserAddress(provider)
  const [valorHeranca, contract] = useInventario(provider)

  return (
    <div className="App">
      <h1>My Address: {myAddress}</h1>
      <h2>My Balance: {myBalance && ethers.utils.formatEther(myBalance)}</h2>
      <p>Valor da minha herança: {valorHeranca && ethers.utils.formatEther(valorHeranca)}</p>
      <button onClick={async () => {
        const signer = provider.getSigner()
        await contract.connect(signer).adicionarFundos(myAddress, { value: ethers.utils.parseEther('0.001') })
      }}>Adicionar 0.001 ETH a herança</button>
    </div>
  );
}

function useUserAddress(provider) {
  const [userAddress, setUserAddress] = useState(null)
  const [balance, setBalance] = useState(null)

  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner()
      signer.getAddress().then(setUserAddress)
      signer.getBalance().then(setBalance)
    }
  }, [provider])

  return [userAddress, balance]
}

export default App;
