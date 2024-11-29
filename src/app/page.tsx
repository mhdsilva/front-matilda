'use client';

import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/strapiService';
import { useToast } from '@/hooks/use-toast';

interface Content {
  id: string;
  title: string;
  description: string;
}

export default function Home() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [contents, setContents] = useState<Content[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    async function fetchContents() {
      try {
        const res = await api.getContents();
        if (res) {
          setContents(res.data);
        }
      } catch (error) {
        toast({
          title: 'Erro',
          description: (error as Error).message,
          variant: 'destructive',
        });
      }
    }

    if (user) {
      fetchContents();
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Seção de Bem-vindo */}
      <section className="h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Bem-vindo {user?.name}!</h2>
          <p className="text-xl text-gray-600">
            Estamos felizes em tê-lo aqui. Aproveite sua experiência!
          </p>
        </div>
        <Button className="mt-4" onClick={() => logout()}>
          Logout
        </Button>
      </section>

      {/* Listagem de Artigos */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-4">Conteúdos Recentes</h3>
          {contents.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {contents.map((contents) => (
                <div
                  key={contents.id}
                  className="p-4 min-h-48 flex flex-col justify-between border rounded-md shadow-sm hover:shadow-md"
                >
                  <div>
                    <h4 className="text-lg font-semibold">{contents.title}</h4>
                    <p className="text-gray-600">{contents.description}</p>
                  </div>
                  <Button className="mt-2">Leia Mais</Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              Nenhum conteúdo disponível no momento.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
