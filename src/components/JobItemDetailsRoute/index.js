import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'

import LoadingView from '../LoadingView'

import FailureView from '../FailureView'

import './index.css'

const LoadingStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobItemDetailsRoute extends Component {
  state = {jobObject: {}, isLoading: ''}

  componentDidMount() {
    this.getJobIdDetails()
  }

  getJobDetailsObject = jobDetails => ({
    companyLogoUrl: jobDetails.company_logo_url,
    companyWebsiteUrl: jobDetails.company_website_url,
    employmentType: jobDetails.employment_type,
    id: jobDetails.id,
    jobDescription: jobDetails.job_description,
    lifeAtCompany: jobDetails.life_at_company,
    location: jobDetails.location,
    packagePerAnnum: jobDetails.package_per_annum,
    rating: jobDetails.rating,
    skills: jobDetails.skills,
    title: jobDetails.title,
  })

  getJobIdDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({isLoading: LoadingStatus.loading})

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedJobDetails = this.getJobDetailsObject(data.job_details)

      const updatedJobDetailsLifeAtCompany = {
        description: updatedJobDetails.lifeAtCompany.description,
        imageUrl: updatedJobDetails.lifeAtCompany.image_url,
      }

      const updatedJobDetailsSkills = updatedJobDetails.skills.map(each => ({
        name: each.name,
        imageUrl: each.image_url,
      }))

      const updatedSimilarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      const jobDetailsNewObject = {
        jobDetails: {
          ...updatedJobDetails,
          lifeAtCompany: updatedJobDetailsLifeAtCompany,
          skills: updatedJobDetailsSkills,
        },
        similarJobs: updatedSimilarJobs,
      }
      this.setState({
        jobObject: jobDetailsNewObject,
        isLoading: LoadingStatus.success,
      })
    } else {
      this.setState({isLoading: LoadingStatus.failure})
    }
  }

  onRetryJobItemDetailsRoute = () => {
    this.getJobIdDetails()
  }

  getSuccessView = () => {
    const {jobObject} = this.state
    if (jobObject !== undefined) {
      const {jobDetails, similarJobs} = jobObject
      const {
        id,
        companyLogoUrl,
        location,
        title,
        rating,
        skills,
        employmentType,
        packagePerAnnum,
        lifeAtCompany,
        jobDescription,
      } = jobDetails
      return (
        <>
          <div className="jobDetails_container" key={id}>
            <div className="jobItemDetailsRoute_companyLogo_star_rating_container">
              <img src={companyLogoUrl} alt="job details company logo" />
              <div>
                <h1>{title}</h1>
                <div>
                  <p>{rating}</p>
                </div>
              </div>
            </div>
            <div>
              <div>
                <p>{location}</p>
              </div>
              <div>
                <p>{employmentType}</p>
              </div>
              <p>{packagePerAnnum}</p>
            </div>
            <hr />
            <div>
              <div>
                <h1>Description</h1>
              </div>
              <p>{jobDescription}</p>
            </div>
            <div>
              <h1>Skills</h1>
              <ul className="skills_ul">
                {skills.map(each => (
                  <li className="skills_li">
                    <img
                      className="skills_img"
                      src={each.imageUrl}
                      alt={each.name}
                    />
                    <p className="skills_p">{each.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h1>LifeAtCompany</h1>
              <div>
                <p>{lifeAtCompany.description}</p>
                <img src={lifeAtCompany.imageUrl} alt=" life at company" />
              </div>
            </div>
          </div>
          <div>
            <h1>SimilarJobs</h1>
            <ul>
              {similarJobs.map(each => (
                <li className="similarJobs_li">
                  <div>
                    <img
                      src={each.companyLogoUrl}
                      alt="similar job company logo"
                    />
                    <div>
                      <h1>{each.title}</h1>
                      <div>
                        <p>{each.rating}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h1>Description</h1>
                    <p>{each.jobDescription}</p>
                  </div>
                  <div>
                    <div>
                      <p>{each.location}</p>
                    </div>
                    <div>
                      <p>{each.employmentType}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )
    }
    return <h1>kalyan</h1>
  }

  render() {
    const {jobObject, isLoading} = this.state
    console.log(isLoading, jobObject)
    let value
    switch (isLoading) {
      case isLoading === LoadingStatus.success:
        value = this.getSuccessView()
        break
      case isLoading === LoadingStatus.failure:
        value = (
          <FailureView
            onRetryJobItemDetailsRoute={this.onRetryJobItemDetailsRoute}
          />
        )
        break
      default:
        value = <LoadingView />
        console.log('red')
        break
    }

    return (
      <>
        <Header />
        <div className="main_container_jobItemDetailsRoute_container">
          {value}
        </div>
      </>
    )
  }
}
export default JobItemDetailsRoute
