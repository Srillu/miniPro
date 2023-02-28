// import {Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {Link} from 'react-router-dom'

import Slider from 'react-slick'
import Footer from '../Footer'

import Header from '../Header'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomeRoute extends Component {
  state = {
    status: apiConstants.initial,
    topRatedBooksList: [],
  }

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({status: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: ` Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const topRatedBooksApiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'

    const response = await fetch(topRatedBooksApiUrl, options)
    const data = await response.json()
    console.log(data)
    console.log(response)
    if (response.ok === true) {
      const updatedTopTenBookDetails = data.books.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }))
      this.setState({
        status: apiConstants.success,
        topRatedBooksList: updatedTopTenBookDetails,
      })
    } else {
      this.setState({status: apiConstants.failure})
    }
  }

  onClickTryAgainButton = () => {
    this.getTopRatedBooks()
  }

  renderSlider = () => {
    const {topRatedBooksList} = this.state

    return (
      <Slider {...settings}>
        {topRatedBooksList.map(eachItem => {
          const {id, authorName, coverPic, title} = eachItem
          return (
            <Link to={`/books/${id}`} className="link-items">
              <li className="slick-item" key={id}>
                <img className="slick-logo-image" src={coverPic} alt="title" />
                <h1 className="slick-title">{title}</h1>
                <p className="slick-author">{authorName}</p>
              </li>
            </Link>
          )
        })}
      </Slider>
    )
  }

  renderHomePage = () => (
    <div className="home-bottom-container">
      <div className="home-text-container">
        <h1 className="heading-home">Find Your Next Favorite Books?</h1>
        <p className="paragraph-home">
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past, and we will give you surprisingly insightful
          recommendations.
        </p>
        <div className="find-book-button-container-mobile">
          <Link to="/shelf">
            <button type="button" className="find-book-button">
              Find Books
            </button>
          </Link>
        </div>
      </div>

      <div className="slick-container">
        <div className="top-rated-books-container">
          <h1 className="top-rated-heading">Top Rated Books</h1>
          <div className="find-book-button-container-screen">
            <Link to="/shelf">
              <button type="button" className="find-book-button">
                Find Books
              </button>
            </Link>
          </div>
        </div>
        <div className="slick-items-container">{this.renderSlider()}</div>
      </div>
      <Footer />
    </div>
  )

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

  renderBasedOnApiStatus = () => {
    const {status} = this.state

    switch (status) {
      case apiConstants.inProgress:
        return this.renderLoader()
      case apiConstants.success:
        return this.renderHomePage()
      case apiConstants.failure:
        return this.renderOnFailure()
      default:
        return null
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  render() {
    return (
      <div className="home-container">
        <Header />
        {this.renderBasedOnApiStatus()}
      </div>
    )
  }
}

export default HomeRoute
