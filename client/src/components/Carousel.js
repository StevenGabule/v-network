import React from 'react'
import { useSelector } from 'react-redux'

const Carousel = ({images, id}) => {
  const isActive = index => (index === 0) ? "active" : ""
  const {theme} = useSelector((state: any) => state)

  return (
    <div key={id} id={`image${id}`} className="carousel slide" data-ride="carousel">
      <ol className='carousel-indicators'>
        {images.map((img, idx) => (<li key={idx} data-target={`image${id}`} data-slide-to={idx} className={isActive(idx)} />))}
      </ol>
      <div className='carousel-inner'>
        {images.map((img, idx) => (
          <div key={idx} className={`carousel-item ${isActive(idx)}`}>
            {
              img.url.match(/video/i)
              ? <video 
                  controls
                  src={img.url} 
                  className="d-block w-100" 
                  alt={img.url} 
                  style={{filter: theme ? 'invert(1)' : 'invert(0)'}} />
              : <img 
                  src={img.url} 
                  className="d-block w-100" 
                  alt={img.url} 
                  style={{filter: theme ? 'invert(1)' : 'invert(0)'}} />
            }
          </div>
        ))}
      </div>
	  {
		  images.length > 1 && 
		    <>
			  <a
				style={{width: '5%'}} 
				href={`#image${id}`} 
				className="carousel-control-prev" 
				role="button" 
				data-slide="prev">
				  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
				  <span className="sr-only">Previous</span>
			  </a>
			  <a 
				style={{width: '5%'}} 
				href={`#image${id}`} 
				className="carousel-control-next" 
				role="button" 
				data-slide="next">
				  <span className="carousel-control-next-icon" aria-hidden="true"></span>
				  <span className="sr-only">Next</span>
			  </a>
		    </>
	  }
    </div>
  )
}

export default Carousel