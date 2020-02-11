import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { likeCommentRequest } from '~/store/modules/like/actions';
import { openModalWithLikes } from '~/store/modules/modal/actions';

import {
  Container,
  UsernameAndContent,
  UsernameLink,
  LikeAndTime,
} from './styles';

import standardProfilePic from '~/assets/ninja.jpg';

export default function Comment({ comment }) {
  const dispatch = useDispatch();
  const handleLike = () => {
    dispatch(
      likeCommentRequest({ post_id: comment.post_id, comment_id: comment.id })
    );
  };
  return (
    <Container>
      <img
        src={comment.user.avatar ? comment.user.avatar.url : standardProfilePic}
        alt={comment.user.name || comment.user.username}
      />

      <div>
        <UsernameAndContent>
          <p>
            <UsernameLink to={`/profile/${comment.user.username}`}>
              {comment.user.name || comment.user.username}
            </UsernameLink>
            {comment.content}
          </p>
        </UsernameAndContent>
        <LikeAndTime liked={comment.liked}>
          <svg
            onClick={handleLike}
            width="23px"
            height="22px"
            viewBox="0 0 23 22"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g
              id="Web"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="Home"
                transform="translate(-449.000000, -713.000000)"
                stroke="#000000"
                strokeWidth="1.44"
              >
                <g id="Group-3" transform="translate(430.000000, 102.000000)">
                  <g id="Group-2" transform="translate(0.000000, 20.000000)">
                    <g
                      id="Like,-comment,-send,-collect"
                      transform="translate(20.000000, 583.000000)"
                    >
                      <path
                        d="M10.4483946,29.0625 L8.93337735,27.6740458 C3.55245415,22.7379084 -5.68434189e-14,19.4805856 -5.68434189e-14,15.4947206 C-5.68434189e-14,12.2373978 2.52328729,9.6875 5.74661701,9.6875 C7.56463766,9.6875 9.30951955,10.5427452 10.4483946,11.8889645 C11.5872696,10.5427452 13.3321515,9.6875 15.1501721,9.6875 C18.3735018,9.6875 20.8967891,12.2373978 20.8967891,15.4947206 C20.8967891,19.4805856 17.344335,22.7379084 11.9634118,27.6740458 L10.4483946,29.0625 Z"
                        id="Like"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
          <span
            onClick={() => {
              dispatch(openModalWithLikes({ likes: comment.likes }));
            }}
          >
            {comment.likes && comment.likes.length}
          </span>
          <small title={comment.time}>
            {comment.timeDistance === 'less than a minute'
              ? 'right now'
              : comment.timeDistance}
          </small>
        </LikeAndTime>
      </div>
    </Container>
  );
}
