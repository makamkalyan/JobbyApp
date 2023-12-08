import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const LoadingView = () => (
  <div className="loader-container" data-testid="loader">
    <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
  </div>
)
export default LoadingView
