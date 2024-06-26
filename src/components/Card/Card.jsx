/* eslint-disable react/prop-types */
import '@css/main.css';
import '@css/card.css';


export default function Card ({ account }) {
  let balance = account.balance;
  parseInt(balance);
  console.log(balance);
  console.log(account);
  if(!account) {
    return null;
  }
  return (
    <div className="card-custom" style={{ backgroundColor: account.color }}>
      <div className="card-header">
        <div className="card-icon">
          <i className="fa fa-credit-card"></i>
        </div>
        <div className="card-amount">
          ${balance}
        </div>
      </div>
      <div className="card-body">
        <div className="card-detail">
          {account.number}
        </div>
        <div className="card-detail">
          {account.holder}
        </div>
      </div>
      <div className="card-footer">
        <div className="card-detail">
          {account.expiry}
        </div>
        <div className="card-detail">
          {account.type}
        </div>
      </div>
    </div>
  );
}

// {
//   id: 1,
//   number: "**** **** **** 1234",
//   holder: "cesar cordova",
//   balance: 728.53,
//   expiry: "12/24",
//   type: "VISA",
//   color: "lightpink"
// },