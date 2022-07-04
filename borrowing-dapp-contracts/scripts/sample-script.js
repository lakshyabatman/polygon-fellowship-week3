
const hre = require("hardhat");

async function main() {

  const LoanManager = await hre.ethers.getContractFactory("LoanManager");
  const loanManager = await LoanManager.deploy("0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b");
  
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