import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const HomeRoute = () => (
  <>
    <Header />
    <div className="home_container">
      <h1>Find The Job That Fits Your Life</h1>
      <p>
        Millions of people are Searching for jobs. salary information,company
        reviews. Find the job thats fits your abilities and potential
      </p>
      <Link to="/jobs">
        <button className="button" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)
export default HomeRoute
