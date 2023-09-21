const Rating = ({ rating }) => {
  // Define an array to hold the rating icons
  const ratingIcons = [];

  // Iterate through the rating and add filled or empty star icons
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.ceil(rating)) {
      if (Math.ceil(rating) === i) {
        const index = rating - (i - 1);
        if (i - rating === 0) {
          ratingIcons.push(<i key={i} className="fas fa-star text-gold"></i>);
        } else if (index < 0.5) {
          ratingIcons.push(<i key={i} className="fas fa-star text-light"></i>);
        } else if (index >= 0.5) {
          ratingIcons.push(
            <i key={i} className="fas fa-star-half-alt text-gold"></i>
          );
        } else {
          ratingIcons.push(<i key={i} className={`fas fa-star- text-grey`}></i>);
        }
      } else {
        ratingIcons.push(<i key={i} className="fas fa-star text-gold"></i>);
      }

      // Add a filled star icon
    } else {
      // Add an empty star icon
      ratingIcons.push(<i key={i} className="fas fa-star text-light"></i>);
    }
  }

  return <span className="product-rating">{ratingIcons}</span>;
};

export default Rating;
