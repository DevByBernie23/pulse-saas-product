import { transactions } from './../../../../data/data';
import "./Transactions.css";

const Transactions = () => {
  return (
    <section className="transactions">
      <div className="transactions-header">
        <div>
          <h2>Recent Transactions</h2>
          <p>Keep track of your latest customer activity.</p>
        </div>

        <button>View all →</button>
      </div>

      <div className="table-container">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.customer}</td>
                <td>{transaction.product}</td>
                <td>${transaction.amount}</td>
                <td>
  <span
    className={`status status-${transaction.status.toLowerCase()}`}
  >
    {transaction.status}
  </span>
</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Transactions;