import {Link} from 'react-router-dom'

import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const AllBooks = props => {
  const {eachBook} = props
  const {id, title, authorName, rating, readStatus, coverPic} = eachBook

  return (
    <Link to={`/books/${id}`} className="link-item">
      <li className="all-books-item-container">
        <img alt={title} src={coverPic} className="all-books-image" />
        <div className="content-container">
          <h1 className="all-books-item-heading">{title}</h1>
          <p className="all-books-item-author">{authorName}</p>
          <div className="star-icon-container">
            <p className="all-books-item-rating">Avg Rating </p>
            <BsFillStarFill className="star-icon" />
            <p>{rating}</p>
          </div>
          <p className="all-books-item-rating">
            Status:
            <span className="all-books-item-span all-books-item-rating">
              {readStatus}
            </span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default AllBooks
