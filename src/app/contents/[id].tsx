import React from 'react';
import { useRouter } from 'next/router';

export default function Content() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Content: {id}</h1>
    </div>
  );
}
