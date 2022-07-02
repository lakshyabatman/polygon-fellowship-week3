
const hre = require("hardhat");

async function main() {

  const LoanManager = await hre.ethers.getContractFactory("LoanManager");
  const loanManager = await LoanManager.deploy("0xe6b8a5cf854791412c1f6efc7caf629f5df1c747");

  await loanManager.deployed();

  console.log("loanManager deployed to:", loanManager.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


  "0x5FbDB2315678afecb367f032d93F642f64180aa3"