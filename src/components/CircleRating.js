import React from 'react';
import StarRating from 'react-native-star-rating';

const CircleRating = props => (
  <StarRating
    disabled={false}
    maxStars={3}
    emptyStar={'circle'}
    emptyStarColor={'#d8d8d8'}
    fullStar={'circle'}
    starStyle={{ fontSize: 32 }}
    containerStyle={{ padding: 8, height: 48 }}
    {...props}
  />
);

export default CircleRating;