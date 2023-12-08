import {Component} from 'react'

import Cookies from 'js-cookie'

import LoadingView from '../LoadingView'

import './index.css'

const LoadingStatus = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {userProfile: {}, isLoading: ''}

  componentDidMount() {
    this.getUserProfile()
  }

  getProfile = profileDetails => ({
    name: profileDetails.name,
    profileImageUrl: profileDetails.profile_image_url,
    shortBio: profileDetails.short_bio,
  })

  getUserProfile = async () => {
    this.setState({isLoading: LoadingStatus.loading})
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch('https://apis.ccbp.in/profile', options)
    if (response.ok === true) {
      const data = await response.json()
      const dataProfileUpdated = this.getProfile(data.profile_details)

      this.setState({
        userProfile: dataProfileUpdated,
        isLoading: LoadingStatus.success,
      })
    } else {
      this.setState({
        isLoading: LoadingStatus.failure,
      })
    }
  }

  onRetryProfile = () => {
    this.getUserProfile()
  }

  getFailureView = () => (
    <div className="Failure_container">
      <button
        className="Failure_button"
        type="button"
        onClick={this.onRetryProfile}
      >
        Retry
      </button>
    </div>
  )

  getUserDetailsView = () => {
    const {userProfile} = this.state
    const {name, profileImageUrl, shortBio} = userProfile

    return (
      <div className="profile_container">
        <img className="profile_img" src={profileImageUrl} alt="profile" />
        <h1 className="profile_h1">{name}</h1>
        <p className="profile_p">{shortBio}</p>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    switch (isLoading) {
      case LoadingStatus.success:
        return this.getUserDetailsView()
      case LoadingStatus.failure:
        return this.getFailureView()
      default:
        return <LoadingView />
    }
  }
}
export default Profile
