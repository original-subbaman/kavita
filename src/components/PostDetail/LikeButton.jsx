import React from 'react'; 
import { Button } from '@radix-ui/themes';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';

export default function LikeButton({like}) {
  return (
    <Button className='bg-transparent'>
        { like ? <HeartFilledIcon color='red'/> :  < HeartIcon />  }
    </Button>
  )
}
