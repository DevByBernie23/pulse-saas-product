import './App.css';
import './index.css'
import { Routes, Route } from 'react-router-dom';
import { analytics, customers, home, customerOrders, overview, productsInStore, billing, settings, getstarted, signin, homepage, analyticsstats } from './data/routes';
import Home from './Pages/HomePage/Home';
import Overview from './Pages/Overview Page/Overview'
import Analytics from './Pages/Analytics Page/Analytics';
import Customers from './Pages/Customer Page/Customer';
import Orders from './Pages/Orders Page/Orders';
import Products from './Pages/Products Page/Products';
import Billing from './Pages/Billing Page/Billing';
import Settings from './Pages/Settings Page/Settings';
import GetStarted from './Pages/GetStartedPage/GetStarted';
import SignIn from './Pages/SignInPage/SignIn';
import AnalyticsStats from './components/Analytics stats/AnalyticsStats';

const App = () => {
  return (
   <Routes>
    <Route path={home} element={<Home/>}/>
    <Route path={overview} element={<Overview/>}/>
    <Route path={analytics} element={<Analytics/>}/>
    <Route path={customers} element={<Customers/>}/>
    <Route path={customerOrders} element={<Orders />} />
    <Route path={productsInStore} element= {<Products/>}/>
    <Route path={billing} element={<Billing/>}/>
    <Route path={settings} element={<Settings/>}/>
    <Route path={getstarted} element={<GetStarted/>}/>
    <Route path={signin} element={<SignIn/>}/>
    <Route path={homepage} element={<Home/>}/>
    <Route path={analyticsstats} element={<AnalyticsStats/>}/>
   </Routes>
  )
};

export default App;