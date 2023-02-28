import {Component} from 'react'

import {BsFillStarFill} from 'react-icons/bs'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class BookDetailsRoute extends Component {
  state = {
    bookDetails: '',
    status: apiConstants.initial,
  }

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    this.setState({status: apiConstants.progress})
    const bookApiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    console.log(bookApiUrl)
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(bookApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const bookDetailsData = await data.book_details
      console.log(bookDetailsData)
      const bookDetails = {
        id: bookDetailsData.id,
        authorName: bookDetailsData.author_name,
        coverPic: bookDetailsData.cover_pic,
        aboutBook: bookDetailsData.about_book,
        rating: bookDetailsData.rating,
        readStatus: bookDetailsData.read_status,
        title: bookDetailsData.title,
        aboutAuthor: bookDetailsData.about_author,
      }
      this.setState({
        bookDetails,
        status: apiConstants.success,
      })
    } else {
      this.setState({status: apiConstants.failure})
    }
  }

  renderOnSuccess = () => {
    const {bookDetails} = this.state
    const {
      id,
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      title,
      aboutAuthor,
    } = bookDetails
    return (
      <>
        <div className="book-details-container">
          <div className="image-container">
            <img alt={title} src={coverPic} className="book-details-image" />
            <div>
              <h1 className="book-details-heading">{title}</h1>
              <p className="book-details">{authorName}</p>
              <div className="book-detail-content-container">
                <p className="book-details-content">Avg Rating</p>
                <BsFillStarFill className="star-icon" />
                <p className="book-details-content">{rating}</p>
              </div>
              <p className="book-details">
                Status:
                <span className="book-details book-details-span">
                  {readStatus}
                </span>
              </p>
            </div>
          </div>

          <div>
            <hr />
            <h1 className="book-details-about-heading">About Author</h1>
            <p className="book-details-about-details">{aboutAuthor}</p>
            <h1 className="book-details-about-heading">About Book</h1>
            <p className="book-details-about-details">{aboutBook}</p>
          </div>
        </div>
      </>
    )
  }

  onClickTryAgainButton = () => {
    this.getBookDetails()
  }

  renderOnFailure = () => (
    <div>
      <img
        alt="failure view"
        src="https://res.cloudinary.com/dxekjdhel/image/upload/v1677492735/Group_7522_epcahg.png"
      />
      <p>Something went wrong, Please try again.</p>
      <div>
        <button
          type="button"
          className="find-book-button"
          onClick={this.onClickTryAgainButton}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderBooksBasedOnApiStatus = () => {
    const {status} = this.state

    switch (status) {
      case apiConstants.inProgress:
        return this.renderLoader()
      case apiConstants.success:
        return this.renderOnSuccess()
      case apiConstants.failure:
        return this.renderOnFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bookshelf-main-container">
        <Header />
        {this.renderBooksBasedOnApiStatus()}
        <Footer />
      </div>
    )
  }
}

export default BookDetailsRoute
