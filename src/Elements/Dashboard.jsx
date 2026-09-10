import {useState} from 'react';

const Dashboard = () => {
  const [currentUser] = useState(() => {
  const savedUser = localStorage.getItem('currentUser');

  return savedUser ? JSON.parse(savedUser) : null;
});
  return (
    <div className='overview-header'>
      <h4>
  Welcome back, {currentUser?.firstName}. Here's what's happening today.
</h4>
      <p>[ Aug 1 - Aug 31 ▼ ] </p>
    </div>
  );
}

export default Dashboard;
