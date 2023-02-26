// import {Link} from 'react-router-dom'
import {Component} from 'react'

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
        slidesToShow: 3,
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

class HomeRoute extends Component {
  //   renderSlider = () => (
  //     <Slider {...settings}>
  //       {companyLogosData.map(eachLogo => {
  //         const {id, company_logo_url} = eachLogo
  //         return (
  //           <div className="slick-item" key={id}>
  //             <img
  //               className="logo-image"
  //               src={company_logo_url}
  //               alt="company logo"
  //             />
  //           </div>
  //         )
  //       })}
  //     </Slider>
  //   )

  render() {
    return (
      <div className="home-container">
        <Header />
        <div className="home-bottom-container">
          <div className="home-text-container">
            <h1 className="heading-home">Find Your Next Favorite Books?</h1>
            <p className="paragraph-home">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
          </div>

          <div className="slick-container">
            <div className="top-rated-books-container">
              <h1 className="top-rated-heading">Top Rated Books</h1>
              <div>
                <button type="button" className="find-book-button">
                  Find Books
                </button>
              </div>
            </div>

            {/* <div className="slick-container">{this.renderSlider()}</div> */}
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default HomeRoute
