import {Component} from 'react'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'

import JobItemsCard from '../JobItemsCard'

import Profile from '../Profile'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const LoadingStatus = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class JobsRoute extends Component {
  state = {
    isLoading: '',
    searchInputValue: '',
    searchInput: '',
    salaryAmount: '',
    employmentType: [],
    jobs: [],
  }

  componentDidMount() {
    this.getUserDetails()
  }

  getUserDetails = async () => {
    this.setState({isLoading: LoadingStatus.loading})
    const {searchInputValue, salaryAmount, employmentType} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryAmount}&search=${searchInputValue}`,
      options,
    )

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      console.log(updatedData)

      this.setState({
        jobs: updatedData,
        isLoading: LoadingStatus.success,
      })
    } else {
      this.setState({
        isLoading: LoadingStatus.failure,
      })
    }
  }

  onSalaryId = event => {
    this.setState({salaryAmount: event.target.value}, this.getUserDetails)
  }

  onEmployId = event => {
    const {employmentType} = this.state
    const isTrueEmployeId = employmentType.includes(event.target.value)
    console.log(event.target.value)
    if (isTrueEmployeId === true) {
      const filteredEmployeId = employmentType.filter(
        each => each !== event.target.value,
      )
      console.log(filteredEmployeId)
      this.setState({employmentType: filteredEmployeId}, this.getUserDetails)
    } else {
      this.setState(
        prev => ({
          employmentType: [...prev.employmentType, event.target.value],
        }),
        this.getUserDetails,
      )
    }
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onRetryJobRoute = () => {
    this.getUserDetails()
  }

  onSearch = () => {
    const {searchInput} = this.state
    this.setState({searchInputValue: searchInput}, this.getUserDetails)
  }

  render() {
    const {searchInput, isLoading, jobs, employmentType} = this.state
    console.log(employmentType, isLoading)
    return (
      <>
        <Header />
        <div className="main_container">
          <div className="jobRoute_container">
            <Profile />
            <div className="">
              <input
                id="search"
                className="input"
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.onSearchInput}
              />

              <button
                className="search_button"
                type="button"
                data-testid="searchButton"
                onClick={this.onSearch}
              >
                s<BsSearch className="search-icon" />
              </button>
            </div>
            <hr />
            <ul className="employType_ul">
              <h1>Type of Employment</h1>
              {employmentTypesList.map(each => (
                <li className="li_employType">
                  <input
                    id={each.employmentTypeId}
                    type="checkbox"
                    value={each.employmentTypeId}
                    key={each.employmentTypeId}
                    onChange={this.onEmployId}
                  />
                  <label htmlFor={each.employmentTypeId}>{each.label}</label>
                </li>
              ))}
            </ul>
            <hr className="hr" />
            <ul className="salary_ul">
              <h1>Salary Range</h1>
              {salaryRangesList.map(each => (
                <li className="li_salary">
                  <input
                    id={each.salaryRangeId}
                    type="radio"
                    value={each.salaryRangeId}
                    name="salary"
                    key={each.salaryRangeId}
                    onChange={this.onSalaryId}
                  />
                  <label htmlFor={each.salaryRangeId}>{each.label}</label>
                </li>
              ))}
            </ul>
            <hr />
            <ul className="jobs_itemCard">
              <JobItemsCard
                details={jobs}
                isLoading={isLoading}
                onRetryJobRoute={this.onRetryJobRoute}
              />
            </ul>
          </div>
          <div className="jobRoute_large_container">
            <div className="profile_employ_salary_container">
              <Profile />
              <ul className="employType_ul">
                <h1>Type of Employment</h1>
                {employmentTypesList.map(each => (
                  <li className="li_employType">
                    <input
                      id={each.employmentTypeId}
                      type="checkbox"
                      value={each.employmentTypeId}
                      key={each.employmentTypeId}
                      onChange={this.onEmployId}
                    />
                    <label htmlFor={each.employmentTypeId}>{each.label}</label>
                  </li>
                ))}
              </ul>
              <ul className="salary_ul">
                <h1>Salary Range</h1>
                {salaryRangesList.map(each => (
                  <li className="li_salary">
                    <input
                      id={each.salaryRangeId}
                      type="radio"
                      value={each.salaryRangeId}
                      name="salary"
                      key={each.salaryRangeId}
                      onChange={this.onSalaryId}
                    />
                    <label htmlFor={each.salaryRangeId}>{each.label}</label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="input_items_large_container">
              <div className="input_search_button_large_container">
                <input
                  id="search"
                  className="input"
                  type="search"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onSearchInput}
                />

                <button
                  className="search_button"
                  type="button"
                  data-testid="searchButton"
                  onClick={this.onSearch}
                >
                  s<BsSearch className="search-icon" />
                </button>
              </div>
              <ul className="jobs_itemCard_large_container">
                <JobItemsCard
                  details={jobs}
                  isLoading={isLoading}
                  onRetryJobRoute={this.onRetryJobRoute}
                />
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default JobsRoute
