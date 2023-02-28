import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import TabItemRoute from '../TabItemRoute'

import Header from '../Header'
import Footer from '../Footer'
import AllBooks from '../AllBooks'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookShelvesRoute extends Component {
  state = {
    status: apiConstants.initial,
    allBooksList: [],
    bookshelfName: bookshelvesList[0].value,
    searchText: '',
    heading: bookshelvesList[0].label,
    activeTabId: bookshelvesList[0].id,
  }

  componentDidMount() {
    this.getBooksBasedOnTabItem()
  }

  getBooksBasedOnTabItem = async () => {
    this.setState({status: apiConstants.inProgress})
    const {bookshelfName, searchText} = this.state
    const booksApiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`
    // console.log(booksApiUrl)
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(booksApiUrl, options)

    if (response.ok === true) {
      const booksData = await response.json()
      //   console.log(booksData)
      const booksList = booksData.books.map(eachBook => ({
        id: eachBook.id,
        rating: eachBook.rating,
        readStatus: eachBook.read_status,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }))
      this.setState({
        status: apiConstants.success,
        allBooksList: booksList,
      })
    } else {
      this.setState({status: apiConstants.failure})
    }
  }

  onClickTryAgainButton = () => {
    this.getBooksBasedOnTabItem()
  }

  renderBasedOnApiTabBooks = () => {
    const {status} = this.state

    switch (status) {
      case apiConstants.inProgress:
        return this.renderLoader()
      case apiConstants.success:
        return this.renderBooksListItems()
      case apiConstants.failure:
        return this.renderOnFailure()
      default:
        return null
    }
  }

  renderLoader = () => (
    <div className="books-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={30} width={30} />
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

  renderBooksListItems = () => {
    const {allBooksList, searchText} = this.state
    const noBooks = allBooksList.length === 0
    return noBooks ? (
      <div className="no-books-container">
        <img
          alt="no books"
          className="no-books-image"
          src="https://res.cloudinary.com/dxekjdhel/image/upload/v1677566623/Asset_1_1_j5ys4q.png"
        />
        <p className="no-books-des">
          Your search for {searchText} did not find any matches.
        </p>
      </div>
    ) : (
      <ul className="all-books-container">
        {allBooksList.map(eachBook => (
          <AllBooks eachBook={eachBook} key={eachBook.id} />
        ))}
      </ul>
    )
  }

  onClickTabItemLabel = (id, label, value) => {
    this.setState(
      {bookshelfName: value, heading: label, activeTabId: id},
      this.getBooksBasedOnTabItem,
    )
    // console.log(label)
  }

  renderBookShelvesTabItems = () => {
    const {activeTabId} = this.state
    // console.log(activeTabId)
    return (
      <ul className="book-shelf-tab-container">
        <h1 className="bookshelf-heading">Bookshelves</h1>
        {bookshelvesList.map(eachItem => (
          <TabItemRoute
            eachItem={eachItem}
            key={eachItem.id}
            onClickTabItemLabel={this.onClickTabItemLabel}
            isActive={activeTabId === eachItem.id}
          />
        ))}
      </ul>
    )
  }

  onClickSearchInput = () => {
    this.getBooksBasedOnTabItem()
  }

  onChangeSearchInput = event => {
    this.setState({searchText: event.target.value})
  }

  renderDisplayBooksContainer = () => {
    const {heading, searchText} = this.state
    return (
      <div className="books-display-container">
        <div className="input-container">
          <h1 className="books-display-heading">{`${heading} Books`}</h1>
          <div className="search-input-container">
            <input
              type="search"
              className="input-box"
              placeholder="search"
              onChange={this.onChangeSearchInput}
              value={searchText}
            />
            <button
              type="button"
              testid="searchButton"
              className="search-icon-button"
              onClick={this.onClickSearchInput}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
        </div>
        {this.renderBasedOnApiTabBooks()}
      </div>
    )
  }

  renderOnMobileView = () => {
    const {searchText, activeTabId, allBooksList} = this.state

    return (
      <div className="display-mobile-view">
        <div className="search-input-container">
          <input
            type="search"
            className="input-box"
            placeholder="search"
            onChange={this.onChangeSearchInput}
            value={searchText}
          />
          <button
            type="button"
            testid="searchButton"
            className="search-icon-button"
            onClick={this.onClickSearchInput}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>

        <h1 className="bookshelf-heading">Bookshelves</h1>
        <ul className="book-shelf-tab-container">
          {bookshelvesList.map(eachItem => (
            <TabItemRoute
              eachItem={eachItem}
              key={eachItem.id}
              onClickTabItemLabel={this.onClickTabItemLabel}
              isActive={activeTabId === eachItem.id}
            />
          ))}
        </ul>

        <ul className="all-books-container">
          {allBooksList.map(eachBook => (
            <AllBooks eachBook={eachBook} key={eachBook.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="bookshelf-main-container">
        <Header />
        <div className="bookshelf-bottom-container">
          {this.renderBookShelvesTabItems()}
          {this.renderDisplayBooksContainer()}
        </div>
        {/* {this.renderOnMobileView()} */}
        <Footer />
      </div>
    )
  }
}

export default BookShelvesRoute
