
import { ethers } from "ethers";
import LoanManager from './abi/LoanManager.json'
const contractAddress = "0x39A82835038A5414E8167CC0c8457ef27F36e877"
export const connectWallet =async () => {
    try {
        const {ethereum} = window;
        if(!ethereum) {
            throw new Error("Metamask unavailable")
        }
        const provider = new ethers.providers.Web3Provider(ethereum);
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        return accounts[0];
    }catch(err) {
        console.error(err);
        console.error("Failed to connect")
    }
}


export const issueALoan =async (value) => {
    try {
        console.log(value)
        const {ethereum} = window;
        if(!ethereum) {
            throw new Error("Metamask unavailable")
        }
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
      
        const connectedContract = new ethers.Contract(contractAddress, LoanManager.abi, signer);

        await connectedContract.issueLoan(
            {
              value:ethers.utils.parseEther(value),
              gasLimit: 10000000
            }
          )
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        const loanStatus = await connectedContract.getLoanDetails(accounts[0]);
        console.log(loanStatus)
        return loanStatus;
    }catch(err) {
        console.error(err);
        console.error("Failed to connect")
    }
}


export const repay = async () => {
    try {
        const {ethereum} = window;
        if(!ethereum) {
            throw new Error("Metamask unavailable")
        }
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });

        const connectedContract = new ethers.Contract(contractAddress, LoanManager.abi, signer);

        await connectedContract.repayLoan({
            gasLimit: 10000000
        })
        const loanStatus = await connectedContract.getLoanDetails(accounts[0]);
        console.log(loanStatus)
        return loanStatus;
    }catch(err) {
        console.error(err);
        console.error("Failed to connect")
    }
}