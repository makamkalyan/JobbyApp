import {Route, Switch} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import NotFound from './components/NotFound'
import JobsRoute from './components/JobsRoute'
import JobItemDetailsRoute from './components/JobItemDetailsRoute'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'
// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={HomeRoute} />
    <ProtectedRoute exact path="/jobs" component={JobsRoute} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetailsRoute} />
    <Route component={NotFound} />
  </Switch>
)

export default App
