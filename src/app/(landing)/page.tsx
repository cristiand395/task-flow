import Link from 'next/link';
import { Medal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className='flex items-center justify-center flex-col'>
        <div className='flex items-center justify-center flex-col'>
            <div className='mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase'>
                <Medal className='h-6 w-6 mr-2'/>
                Most powerful task management
            </div>
            <h1 className='text-3xl md:text-6xl text-center text-neutral-800 mb-6'>
              Task Flow helps team move
            </h1>
            <div className='text-3xl md:text-6xl bg-gradient-to-r from-purple-500 to-orange-400 text-white px-4 p-2 rounded-md pb-4 w-fit'>
              work smoothly
            </div>
        </div>
        <div className='text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center'>
          Collaborate with your team, track progress, and get more done with Task Flow.
        </div>
        <Button className='mt-6' size='lg' asChild>
          <Link href='/app'>
            Get Task Flow for free
          </Link>
        </Button>
    </div>
  );
}