import './index.css'

const FailureView = props => {
  const {onRetryJobItemDetailsRoute} = props
  return (
    <div className="Failure_container">
      <img
        className="Failure_img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="Failure_h1">Oops! Something Went Wrong</h1>
      <p className="Failure_p">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="failure_button"
        type="button"
        onClick={onRetryJobItemDetailsRoute}
      >
        Retry
      </button>
    </div>
  )
}
export default FailureView
