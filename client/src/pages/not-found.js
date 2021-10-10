import { useEffect } from 'react';
import Leftbar from '../components/leftbar';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Not Found - Touch';
  }, []);

  return (
    <>
      <div className="dashboard">      <div className="dashboard__leftbar">
        <Leftbar />
      </div>
        <div className="mx-auto max-w-screen-lg">
          <p className="text-center text-2xl">Not Found!</p>
        </div>
      </div>
    </>
  );
}
