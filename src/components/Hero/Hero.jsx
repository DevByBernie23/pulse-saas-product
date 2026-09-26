
import './Hero.css';
import { useState, useEffect } from 'react';
import StatCard from '../../Pages/Overview Page/overview elements/StatCard/StatCard'
import Transactions from '../../Pages/Overview Page/overview elements/Transactions/Transactions'
import Dashboard from '../../Elements/Dashboard.jsx';
import RevenueChart from '../../Pages/Overview Page/overview elements/RevenueChart/RevenueChart';
import { useWorkspace } from '../../context/WorkSpaceContext.jsx';

console.log('Hero rendered')
const Hero = () => {
  const { workspace } = useWorkspace()
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
  const getStats = async () => {
    if (!workspace) return;

    try {
      setLoading(true);

      const [ordersResponse, customersResponse] = await Promise.all([
        fetch(`http://localhost:3000/orders?workspaceId=${workspace.id}`),
        fetch(`http://localhost:3000/customers?workspaceId=${workspace.id}`),
      ]);

      if (!ordersResponse.ok || !customersResponse.ok) {
        throw new Error('Failed to fetch overview data');
      }

      const orders = await ordersResponse.json();
      const customers = await customersResponse.json();

      const completedOrders = orders.filter(
        (order) => order.status === 'Completed'
      );

      const totalRevenue = completedOrders.reduce(
        (total, order) => total + order.amount,
        0
      );


      const totalCustomers = customers.length;
const totalOrders = orders.length;

const conversionRate =
  totalOrders > 0
    ? ((completedOrders.length / totalOrders) * 100).toFixed(2)
    : 0;

      setStats([
        {
          id: '1',
          title: 'Total Revenue',
          value: `$${totalRevenue.toLocaleString()}`,
          change: '',
        },
        {
          id: '2',
          title: 'Total Customers',
          value: totalCustomers.toLocaleString(),
          change: '',
        },
        {
          id: '3',
          title: 'Total Orders',
          value: totalOrders.toLocaleString(),
          change: '',
        },
        {
          id: '4',
          title: 'Conversion Rate',
          value: `${conversionRate}%`,
          change: '',
        },
      ]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  getStats();
}, [workspace]);
  
  if(loading){
    return <main className= 'hero'>Loading overview...</main>
  }
  if(error){
    return(
      <main className='hero'>
        <p>{error}</p>
      </main>
    )
  }
  return (
    <main className='hero'>
      <Dashboard/>
      <div className="stats-grid">
      {stats.map ((stat) => {
          const id = stat.id
        return(
        <StatCard key={id} stat={stat}/>
    )}
        )}
    </div>
    <RevenueChart/>
    <Transactions/>
    </main>
    
  );
};

export default Hero;