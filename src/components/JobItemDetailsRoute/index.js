import {Component} from 'react'

import Cookies from 'js-cookie'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaStar} from 'react-icons/fa'

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
            <img
              className="company_logo"
              src={companyLogoUrl}
              alt="company logo"
              key="company_logo_url"
            />
            <div className="jobDetails_title_rating_container">
              <h1>{title}</h1>
              <div className="jobDetails_rating_star_container">
                <FaStar />
                <p key="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="jobDetails_location_employment_package_container">
            <div className="jobDetails_location_employment_container">
              <div className="jobDetails_location_p_container">
                <IoLocationSharp />
                <p className="jobDetails_location_p" key="location">
                  {location}
                </p>
              </div>
              <div className="jobDetails_employment_p_container">
                <BsBriefcaseFill />
                <p className="jobDetails_employment_p" key="employment_type">
                  {employmentType}
                </p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="jobDetails_descriptionH1_p_container">
            <div>
              <h1>Description</h1>
            </div>
            <p key="job_description">{jobDescription}</p>
          </div>
          <div className="jobDetails_skills_container">
            <h1>Skills</h1>
            <ul className="jobDetails_skills_ul">
              {skills.map(each => (
                <li className="jobDetails_skills_li" key={each.name}>
                  <img
                    className="jobDetails_skills_img"
                    src={each.imageUrl}
                    alt={each.name}
                  />
                  <p className="skills_p">{each.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lifeAtCompany_container">
            <h1>Life at Company</h1>
            <div className="lifeAtCompany_p_img_container">
              <p>{lifeAtCompany.description}</p>
              <img
                className="lifeAtCompany_img"
                src={lifeAtCompany.imageUrl}
                alt="life at company"
              />
            </div>
          </div>
        </div>
        <div className="similar_Jobs_container">
          <h1>Similar Jobs</h1>
          <ul className="similarJobs_ul">
            {similarJobs.map(each => (
              <li className="similarJobs_li" key="company_logo_url">
                <div className="similarJobs_logo_title_rating_container">
                  <img
                    className="company_logo"
                    src={each.companyLogoUrl}
                    alt="similar job company logo"
                  />
                  <div className="similarJobs_title_rating_container">
                    <h1 key="title">{each.title}</h1>
                    <div className="similarJobs_rating_star_container">
                      <FaStar />
                      <p key="rating">{each.rating}</p>
                    </div>
                  </div>
                </div>

                <h1>Description</h1>
                <p key="job_description">{each.jobDescription}</p>

                <div className="similarJobs_location_employment_container">
                  <div className="similarJobs_location_container">
                    <IoLocationSharp />
                    <p key="location">{each.location}</p>
                  </div>
                  <div className="similarJobs_employment_container">
                    <BsBriefcaseFill />
                    <p key="employment_type">{each.employmentType}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {jobObject, isLoading} = this.state
    console.log(isLoading, jobObject)

    let value
    switch (isLoading) {
      case LoadingStatus.success:
        value = this.getSuccessView()
        break
      case LoadingStatus.failure:
        value = (
          <FailureView
            onRetryJobItemDetailsRoute={this.onRetryJobItemDetailsRoute}
          />
        )
        break
      default:
        value = <LoadingView />
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
