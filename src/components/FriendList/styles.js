import styled, { css } from 'styled-components';
import PerfectScrollBar from 'react-perfect-scrollbar';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  padding: 0px 0px;
  height: calc(100vh - 64px); /*64px = header, 10px = extra margin*/
  position: fixed;
  width: 18vw;
  right: 17px; /*17px = scrolllbar*/
  bottom: 0px;
  display: flex;
  flex-direction: column;

  & > span {
    padding: 10px 0px 10px 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  h3 {
    margin-bottom: 15px;
    padding: 0px 5px;
  }

  img {
    height: 34px;
    width: 34px;
    border-radius: 50%;
    margin-right: 10px;
  }

  @media (max-width: 1050px) {
    width: 200px;
    max-height: calc(100vh - 64px - 30px);
    right: calc(17px + 20px);
    cursor: pointer;
  }

  ${props =>
    props.friendsBarStatus
      ? css`
          @media (max-width: 1050px) {
            z-index: 2;
          }
          & > span {
            background: #eee;
          }
        `
      : css`
          height: auto;
          transform: translateY(5px);
          background: #333;
          border: 0;
          color: #fff;
        `}
`;

export const Scroll = styled(PerfectScrollBar)`
  padding: 5px 5px 0px;

  /* whatever CSS property I change here based on props.friendBarStatus 
   will make so that the scrollbar end up not scrolling anymore
   until I refresh the page */
`;

export const Friend = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 5px;
  display: ${props => !props.friendsBarStatus && 'none'};

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &:link {
    color: black;
  }
  &:visited {
    color: black;
  }

  &:hover {
    background: #ccc;
    cursor: pointer;
  }
`;

export const GreenCircle = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background: rgba(66, 183, 42, 1);
`;

export const SearchBar = styled.div`
  border: 1px solid #eee;
  width: 100%;
  padding: 0px;

  input {
    outline: 0;
    width: 100%;
    border-radius: 4px;
    border: 0;
    padding: 5px 10px;
    color: #222;
  }

  ${props =>
    props.friendsBarStatus
      ? css`
          display: flex;
        `
      : css`
          display: none;
        `}
`;
