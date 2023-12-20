import JobItem from '../JobItem'

import LoadingView from '../LoadingView'

import './index.css'

const LoadingStatus = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

const JobItemsCard = props => {
  const {details, isLoading, onRetryJobRoute} = props

  const getNoItemsView = () => (
    <div className="NoItems_view_container">
      <img
        className="noJobs_img"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="noJobs_h1">No Jobs Found</h1>
      <p className="noJobs_p">We could not find any jobs. Try other filters</p>
    </div>
  )

  const getItemsView = () => {
    if (details.length === 0) {
      return getNoItemsView()
    }
    return (
      <>
        {details.map(each => (
          <JobItem details={each} key={each.id} />
        ))}
      </>
    )
  }

  const getItemsFailure = () => (
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
        onClick={onRetryJobRoute}
      >
        Retry
      </button>
    </div>
  )

  switch (isLoading) {
    case LoadingStatus.success:
      return getItemsView()
    case LoadingStatus.loading:
      return <LoadingView />
    default:
      return getItemsFailure()
  }
}
export default JobItemsCard
