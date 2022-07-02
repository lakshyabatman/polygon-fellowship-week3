//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


enum LoanStatus {
    NOT_ISSUED,
    PROCESSING,
    ISSUED,
    CLOSED,
    DEFAULT
}
struct Loan {
    LoanStatus status;
    uint256 amt;
    uint256 issued_timestamp;
}

contract LoanManager is Ownable {
    mapping(address => Loan) private loans;

    IERC20 private _token;

    constructor (IERC20 token) {
        _token = token;
    }

    function getLoanDetails(address _user) public view returns  (Loan memory) {
        require(msg.sender == _user || address(msg.sender) == owner()," only owner and issuer can see details");
        return loans[_user];
    }

    function issueLoan( ) payable public returns (Loan memory) {
        require(loans[msg.sender].status == LoanStatus.NOT_ISSUED , "there is already a loan" );
        loans[msg.sender] = Loan(LoanStatus.PROCESSING, msg.value, block.timestamp);
        _token.transfer(msg.sender, msg.value);
        loans[msg.sender].status = LoanStatus.ISSUED;
        return loans[msg.sender];

    }

    function repayLoan() public returns (Loan memory) {
        require(loans[msg.sender].status == LoanStatus.ISSUED , "no loan taken " );
        Loan memory currentLoan = loans[msg.sender];
        _token.approve(address(this), currentLoan.amt);
        loans[msg.sender].status = LoanStatus.CLOSED;
        return loans[msg.sender];
    } 

    fallback() external  payable  { } 


}


