import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/messenger');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/messenger');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="p-4 md:p-6 flex items-center justify-between border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <span className="text-2xl">⚡</span>
          </div>
          <h1 className="text-2xl font-bold gradient-text">Spektr</h1>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Мессенджер нового поколения
              </h2>
              <p className="text-xl text-muted-foreground">
                Быстро, безопасно и удобно. Общайтесь с друзьями, создавайте каналы и группы.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Lock" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Безопасность</h3>
                  <p className="text-sm text-muted-foreground">Сквозное шифрование всех сообщений</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Zap" size={20} className="text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Скорость</h3>
                  <p className="text-sm text-muted-foreground">Мгновенная доставка сообщений</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Sparkles" size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Современный дизайн</h3>
                  <p className="text-sm text-muted-foreground">10 тем оформления на выбор</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="animate-scale-in border-border/50 shadow-2xl">
            <CardHeader>
              <CardTitle>Добро пожаловать</CardTitle>
              <CardDescription>Войдите или создайте аккаунт</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Вход</TabsTrigger>
                  <TabsTrigger value="register">Регистрация</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">Пароль</Label>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
                        </button>
                      </div>
                    </div>

                    <Button type="button" variant="link" className="px-0 text-sm">
                      Забыли пароль?
                    </Button>

                    <Button type="submit" className="w-full gradient-primary">
                      Войти
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reg-email">Email</Label>
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reg-name">Имя</Label>
                      <Input
                        id="reg-name"
                        type="text"
                        placeholder="Ваше имя"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reg-username">Username</Label>
                      <Input
                        id="reg-username"
                        type="text"
                        placeholder="@username"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Пароль</Label>
                      <div className="relative">
                        <Input
                          id="reg-password"
                          type={showRegPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPassword(!showRegPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Icon name={showRegPassword ? 'EyeOff' : 'Eye'} size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Аватар</Label>
                      <div className="flex gap-2">
                        <Button type="button" variant="outline" size="sm" className="flex-1">
                          <Icon name="Upload" size={16} className="mr-2" />
                          Загрузить
                        </Button>
                        <Button type="button" variant="outline" size="sm" className="flex-1">
                          <Icon name="Image" size={16} className="mr-2" />
                          Выбрать
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full gradient-primary">
                      Создать аккаунт
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="p-4 text-center text-sm text-muted-foreground border-t border-border/50">
        <p>© 2024 Spektr. Современный мессенджер для всех.</p>
      </footer>
    </div>
  );
};

export default Landing;
