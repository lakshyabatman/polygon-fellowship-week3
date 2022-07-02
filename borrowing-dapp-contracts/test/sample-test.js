const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });


describe("LoanManager", () => {
  it("should load erc20 tokens", async function() {
    // deploying test erc20 token
    const [owner, addr1] = await ethers.getSigners();
    const TestToken = await ethers.getContractFactory("MyToken");
    const testToken = await TestToken.deploy();
    await testToken.deployed();

    const tokenAddr = testToken.address;



    const LoanManager = await ethers.getContractFactory("LoanManager");
    const loanManager = await LoanManager.deploy(tokenAddr);
    // console.log(owner.address + " " + loanManager.address)
    await testToken.transfer(loanManager.address,100);

    expect(await testToken.balanceOf(loanManager.address)).to.equal("100")

  })
  it("simulate issue and repay the loan", async function() {
    // deploying test erc20 token
    const [owner, addr1] = await ethers.getSigners();
    const TestToken = await ethers.getContractFactory("MyToken");
    const testToken = await TestToken.deploy();
    await testToken.deployed();
    const tokenAddr = testToken.address;



    const LoanManager = await ethers.getContractFactory("LoanManager");
    const loanManager = await LoanManager.deploy(tokenAddr);
    expect(await testToken.balanceOf(addr1.address)).to.equal(0)
    testToken.transfer(loanManager.address, ethers.utils.parseEther("2.0"));
    // testToken.transfer(addr1.address, ethers.utils.parseEther("1.0"));
    const options = {value: ethers.utils.parseEther("1.0")}
    await loanManager.connect(addr1).issueLoan(options);
    let loanData =await loanManager.getLoanDetails(addr1.address);
    expect(loanData.status).to.equal(2)
    expect(loanData.amt).to.equal(ethers.utils.parseEther("1.0"))
    expect(await testToken.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("1.0"))


    testToken.connect(addr1.address).approve(loanManager.address, ethers.utils.parseEther("1.0") );

    await loanManager.connect(addr1).repayLoan();
    loanData =await loanManager.getLoanDetails(addr1.address);
    expect(loanData.status).to.equal(3)
    expect(loanData.amt).to.equal(ethers.utils.parseEther("1.0"))

    


  })
})