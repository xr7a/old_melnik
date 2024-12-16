import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/atoms/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/atoms/ui/form';
import { Input } from '@/components/atoms/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../atoms/ui/card';
import { useAuth } from '@/features/context/AuthContext';
import { AuthService } from '@/features/api/services/auth.service';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  email: z.string().email({
    message: 'Введите верный тип почты!'
  }),
  password: z.string()
});

interface ILoginProps {
  setRegister: () => void;
}
export function LoginForm({ setRegister }: ILoginProps) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    AuthService.login({ email: values.email, password: values.password });
    login();
    navigate('/');
  }
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Войти</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Почта</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите почту" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите пароль" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Войти
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="gap-[6px]">
        <p>Нет аккаунта?</p>
        <a onClick={() => setRegister()} className="cursor-pointer text-indigo-500 hover:underline">
          Создать аккаунт
        </a>
      </CardFooter>
    </Card>
  );
}
