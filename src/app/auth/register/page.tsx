'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import api from '@/lib/strapiService';
import { useAuth } from '@/context/authContext';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const { login } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const name = form.elements.namedItem('name') as HTMLInputElement;
    const email = form.elements.namedItem('email') as HTMLInputElement;
    const password = form.elements.namedItem('password') as HTMLInputElement;

    try {
      const response = await api.register(
        name.value,
        email.value,
        password.value
      );
      if (response) {
        const { jwt, user } = response;
        login(user, jwt);
        setLoading(false);
        router.push('/');
      } else {
        setLoading(false);
        toast({
          title: 'Erro',
          description: 'Erro ao cadastrar usuário',
          variant: 'destructive',
        });
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: 'Erro',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-6">
            <img
              src="/placeholder.svg?height=64&width=64"
              alt="Logo"
              className="h-16 w-16"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Cadastro
          </CardTitle>
          <CardDescription className="text-center">
            Coloque suas informações para se cadastrar
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" type="text" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Cadastrar
            </Button>
            <Button
              type="button"
              variant="link"
              onClick={() => router.push('/auth/login')}
              className="w-full"
              disabled={loading}
            >
              Já tem uma conta? Faça login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
