import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  height: 20vh;
  background-image: url('/selected_child_post_it.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bolder;
  text-decoration: none; /* 밑줄 제거 */
  font-size: 25px;
  color: black;
  margin: 2rem 0 2rem 0;
  cursor: pointer;
`;

const SelectedChildPostit = (props) => {

  const navigate = {
    '/child_video_chatting_start': '화상채팅',
    '/child_whispher': '속닥속닥',
    '/child_raise_egg': '알키우기',
  }
  const childAddress = props.message
  
  return (
    <Container>
        {navigate[childAddress]}
    </Container>
  )
}

export default SelectedChildPostit