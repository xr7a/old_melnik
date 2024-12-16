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
import { Tabs, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs';
import { AuthService, RegisterData } from '@/features/api/services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/context/AuthContext';

const formSchema = z
  .object({
    email: z.string().email({
      message: 'Введите верный тип почты!'
    }),
    password: z.string(),
    confirmPassword: z.string(),
    role: z.literal('Reader').or(z.literal('Author'))
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли должны совпадать!',
    path: ['confirmPassword']
  });

interface IRegisterProps {
  setRegister: () => void;
}
export function RegisterForm({ setRegister }: IRegisterProps) {
  const { register } = useAuth();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      role: 'Reader'
    }
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const user: RegisterData = {
      email: values.email,
      password: values.password,
      role: values.role
    };
    AuthService.register(user);
    register();
    navigate('/');
  }
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Создать аккаунт</CardTitle>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Повторите пароль</FormLabel>
                  <FormControl>
                    <Input placeholder="Повторите пароль" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Выберите роль</FormLabel>
                  <FormControl>
                    <div className="flex space-x-4">
                      {/* Используем Tabs.Trigger */}
                      <Tabs value={field.value} onValueChange={(value) => field.onChange(value)}>
                        <TabsList className="grid grid-cols-2 w-full">
                          <TabsTrigger value="Reader" className="text-sm">
                            Читатель
                          </TabsTrigger>
                          <TabsTrigger value="Author" className="text-sm">
                            Автор
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Создать аккаунт
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="gap-[6px]">
        <p>У вас уже есть аккаунт?</p>
        <a onClick={() => setRegister()} className="cursor-pointer text-indigo-500 hover:underline">
          Войти
        </a>
      </CardFooter>
    </Card>
  );
}
