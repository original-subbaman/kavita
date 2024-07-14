import React from 'react'
import { Container, Heading, Section, Text } from '@radix-ui/themes';
import { useParams } from 'react-router-dom'
import RootWrapper from '../components/RootWrapper';
import LikeButton from '../components/PostDetail/LikeButton';

export default function PostDetail() {
  let {id} = useParams(); 
  return (
    <RootWrapper>
      <Container>
        <Section size={"1"} className=' mt-5 pl-8 rounded-t-md border bg-dark'>
          <Heading className='text-white'>John Doe</Heading>
          <Text className='text-gray-500'>Posted On: 14-07-2024</Text>
        </Section>
        <Section className='bg-slate-50  px-4'>
        <Text size={"7"} className='text-black text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Suscipit praesentium vel, pariatur quas natus dolores consectetur nulla id magnam quae totam cum a
       officiis officia culpa at! Totam, incidunt enim.</Text>
        </Section>
       <Section size={"1"} className='border-t-4 bg-white flex align-top px-4'>  
          <LikeButton like={false}/>   
        </Section>
        <Section>
          Comments
        </Section>  
 
      </Container>

    </RootWrapper>
 )
}
