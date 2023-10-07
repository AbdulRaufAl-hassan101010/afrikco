import styled from 'styled-components';
import Navbar from '../../components/client/Navbar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useCallback, useEffect, useState } from 'react';
import Rating from '../../components/Rating';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Styles = styled.main``;

const Comment = () => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('I like it!!!');
  const [verified, setVerified] = useState(null);

  const { token, product_id } = useParams();

  const navigate = useNavigate();

  // verify token
  useEffect(() => {
    const VerifyToken = async () => {
      try {
        await axios(`/apis/tokens/${token}`);
        setVerified(true);
      } catch (error) {
        setVerified(false);
      }
    };

    VerifyToken();
  }, [token]);

  //   protect route
  useEffect(() => {
    if (verified === false) {
      navigate('/');
    }
  }, [navigate, verified]);

  //   validate rating input
  useEffect(() => {
    const ratingFloat = parseFloat(rating);

    if (ratingFloat > 5 || ratingFloat < 0) {
      setRating(0);
    }
  }, [rating]);

  const submitCommentHandler = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await axios.post(`/apis/ratings`, {
          score: rating,
          product_id,
          comment,
          token,
        });
        setVerified(false);
      } catch (error) {
        console.log(error);
      }
    },
    [comment, product_id, rating, token]
  );

  return (
    <>
      <Navbar />
      <Styles className="container">
        <form onSubmit={submitCommentHandler}>
          <h1 className="mb-1">
            <legend>Product Review</legend>
            <Rating rating={rating} />
          </h1>

          <fieldset>
            <Input
              type="number"
              placeholder="Rating score"
              max="5"
              min="0"
              value={rating}
              update={setRating}
            />
            <textarea
              name=""
              id=""
              style={{ width: '100%', height: '20rem' }}
              placeholder=" Comment"
              maxLength={200}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>

            <Button type="submit">Submit</Button>
          </fieldset>
        </form>
      </Styles>
    </>
  );
};

export default Comment;
