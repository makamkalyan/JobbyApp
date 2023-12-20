import {Link} from 'react-router-dom'

import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaStar} from 'react-icons/fa'
import './index.css'

const JobItem = props => {
  const {details} = props
  const {
    id,
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
  } = details

  return (
    <Link className="job_item_link" to={`/jobs/${id}`}>
      <li className="job_item_li">
        <div className="title_company_logo_container">
          <img
            className="company_logo"
            src={companyLogoUrl}
            alt="company logo"
            key="company_logo_url"
          />
          <div className="title_rating_container">
            <h1 className="title">{title}</h1>
            <div className="rating_container">
              <FaStar className="star_img" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="salary_location_container">
          <div className="salary_location_inside_container">
            <div className="location_salary">
              <IoLocationSharp className="location_brieCase_img" />
              <p className="location_salary_p">{location}</p>
            </div>
            <div className="location_salary">
              <BsBriefcaseFill className="location_brieCase_img" />
              <p className="location_salary_p">{employmentType}</p>
            </div>
          </div>
          <p className="package_per_annum_p">{packagePerAnnum}</p>
        </div>
        <hr />
        <div>
          <h1 className="description_h1">Description</h1>
          <p className="description_p">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobItem
