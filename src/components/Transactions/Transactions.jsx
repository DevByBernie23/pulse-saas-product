
import { Link } from "react-router-dom";
import { useWorkspace } from "../../../../context/WorkSpaceContext";
import "./Transactions.css";
import { useState, useEffect } from 'react';
import { customerOrders } from "../../../../data/routes";

const Transactions = () => {
    const { workspace } = useWorkspace()
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
  
    useEffect(() => {
      const getTransactions = async () => {
        if(!workspace) return
        try{
          setLoading(true)
        const response = await fetch(`http://localhost:3000/orders?workspaceId=${workspace.id}`);
        
        if(!response.ok){
          throw new Error('Failed to fetch transactions')
        }
        const data = await response.json();
        
        const recentTransactions = [...data]
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 6);

setTransactions(recentTransactions);
        }catch(error){
          setError(error.message)
        }finally{
          setLoading(false)
        }
      };
  
      getTransactions();
    }, [workspace]);

    if(loading){
      return (
      <section>
        <h2>Loading transactions...</h2>
      </section>
      )
    }
    if(error){
      return(
        <section>
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </section>
      )
    }
  return (
    <section className="transactions">
      <div className="transactions-header">
        <div>
          <h2>Recent Transactions</h2>
          <p>Keep track of your latest customer activity.</p>
        </div>

        <Link to={customerOrders}><button>View all →</button></Link>
      </div>

      <div className="table-container">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody className='tbody'>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.customer}</td>
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