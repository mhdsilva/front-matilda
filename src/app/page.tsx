'use client';

import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/auth/login');
    }
  }, [user, router]);
  return (
    <>
      <Button>Click me</Button>
    </>
  );
}
