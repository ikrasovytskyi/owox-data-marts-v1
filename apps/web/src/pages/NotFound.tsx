import { Button } from '@owox/ui/components/button';
import { Link } from 'react-router-dom';
import { useProjectRoute } from '../shared/hooks';
import { Telescope, ChevronRight } from 'lucide-react';

function NotFound() {
  const { scope } = useProjectRoute();
  return (
    <div className='relative flex h-full w-full items-center justify-center overflow-hidden px-4 sm:px-12'>
      {/* Foreground card ===   */}
      <div className='relative z-10 flex w-full flex-col items-center justify-center rounded-lg border-b border-neutral-200 bg-neutral-50 px-4 pt-16 pb-20 dark:border-neutral-800 dark:bg-neutral-950'>
        <Telescope className='dm-empty-state-ico' strokeWidth={1} />

        <h1 className='dm-empty-state-title'>Lost in the 404th Data Realm</h1>

        <p className='dm-empty-state-subtitle'>
          In this dimension, 1 + 1 = 3, percentages exceed 100%, and dashboards predict{' '}
          <i>yesterday</i>.<br />
          Escape while you can!
        </p>

        <Button variant='outline' asChild>
          <Link
            to={scope('/data-marts')}
            className='flex items-center gap-1'
            aria-label='Back to Reality'
          >
            Back to Reality
            <ChevronRight className='h-4 w-4' />
          </Link>
        </Button>
      </div>

      {/* Tunnel background */}
      <div className='bg-grid animate-zoomTunnel absolute inset-0 z-0 opacity-50 dark:opacity-70' />
    </div>
  );
}

export default NotFound;
