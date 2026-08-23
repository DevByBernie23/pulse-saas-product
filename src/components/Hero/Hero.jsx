import { stats } from '../../data/data';
import './Hero.css';
import StatCard from '../../Pages/Overview Page/overview elements/StatCard/StatCard'
import Transactions from '../../Pages/Overview Page/overview elements/Transactions/Transactions'
import Dashboard from '../../Elements/Dashboard.jsx';
import RevenueChart from '../../Pages/Overview Page/overview elements/RevenueChart/RevenueChart';

const Hero = () => {
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