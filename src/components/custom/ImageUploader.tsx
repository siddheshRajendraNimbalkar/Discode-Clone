'use client';

import { SingleImageDropzone } from '@/components/custom/SingleImageDropzone';
import { useEdgeStore } from '@/lib/edgestore';
import { useState } from 'react';
import { Button } from '../ui/button';

export function SingleImageDropzoneUsage({values,onChange}:{values:any,onChange:(file:File|undefined|string|any)=>void}) {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [mystyle,setMystyle] = useState<Number>(0);
  const [display,setDisplay] = useState<boolean>(false)

  return (
    <div>
      <SingleImageDropzone
        width={200}
        height={200}
        value={file}
        onChange={(file) => {
          setFile(file);
          onChange(values)
        }}
      />
      <div className={`h-4 mt1 mb-1 rounded-sm p-1 ${display ? 'block' : 'hidden'}`}>
      <div className='bg-blue-600 h-2 rounded' style={{ width: `${mystyle}%` }}>
  
      </div>
      </div>
      <Button
      variant='ghost'
      className='dark:bg-white dark:text-black bg-black text-white'
        onClick={async () => {
          setDisplay(true)
          if (file) {
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress:any) => {
                // you can use this to show a progress bar
                setMystyle(progress);
                {progress == 100 ? setDisplay(false) : setDisplay(true)}
                // {progress == 0 ? setDisplay(false) : setDisplay(true)}
              },
            });
            // you can run some server action or api here
            // to add the necessary data to your database
            if(!res) return null;
            onChange(res?.url)
          }
        }}
      >
        Upload
      </Button>
    </div>
  );
}