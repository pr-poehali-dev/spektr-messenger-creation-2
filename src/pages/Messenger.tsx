import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface Chat {
  id: string;
  name: string;
  username: string;
  lastMessage: string;
  time: string;
  avatar: string;
  verified?: boolean;
  unread?: number;
}

interface Message {
  id: string;
  text: string;
  time: string;
  isMine: boolean;
}

const MOCK_CHATS: Chat[] = [
  {
    id: '1',
    name: 'Избранное',
    username: 'favorites',
    lastMessage: 'Ваши сохраненные сообщения',
    time: '12:30',
    avatar: '⭐',
  },
  {
    id: '2',
    name: 'Spektr',
    username: 'spektr',
    lastMessage: 'Добро пожаловать в Spektr!',
    time: '10:15',
    avatar: '⚡',
    verified: true,
    unread: 1,
  },
];

const Messenger = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(MOCK_CHATS[1]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Добро пожаловать в официальный чат Spektr! Здесь вы можете задать любые вопросы.',
      time: '10:15',
      isMine: false,
    },
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageInput,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      isMine: true,
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');
  };

  const filteredChats = MOCK_CHATS.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col md:flex-row bg-background">
      <aside className="w-full md:w-80 border-r border-border/50 flex flex-col">
        <div className="p-4 border-b border-border/50 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold gradient-text">Spektr</h1>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost">
                <Icon name="User" size={20} />
              </Button>
              <Button size="icon" variant="ghost">
                <Icon name="Settings" size={20} />
              </Button>
            </div>
          </div>

          <div className="relative">
            <Icon
              name="Search"
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Поиск чатов и пользователей..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={cn(
                  'w-full p-3 rounded-lg flex items-center gap-3 hover:bg-accent/50 transition-colors text-left',
                  selectedChat?.id === chat.id && 'bg-accent'
                )}
              >
                <Avatar className="w-12 h-12 gradient-primary flex items-center justify-center">
                  <AvatarFallback className="bg-transparent text-2xl">
                    {chat.avatar}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="font-semibold truncate">{chat.name}</span>
                    {chat.verified && (
                      <Icon name="BadgeCheck" size={16} className="text-primary flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-muted-foreground">{chat.time}</span>
                  {chat.unread && (
                    <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center text-xs font-semibold">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </aside>

      <main className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <header className="p-4 border-b border-border/50 flex items-center gap-3">
              <Avatar className="w-10 h-10 gradient-primary flex items-center justify-center">
                <AvatarFallback className="bg-transparent text-xl">
                  {selectedChat.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <h2 className="font-semibold">{selectedChat.name}</h2>
                  {selectedChat.verified && (
                    <Icon name="BadgeCheck" size={16} className="text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">@{selectedChat.username}</p>
              </div>
              <Button size="icon" variant="ghost">
                <Icon name="MoreVertical" size={20} />
              </Button>
            </header>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4 max-w-4xl mx-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex gap-2 animate-fade-in',
                      message.isMine && 'flex-row-reverse'
                    )}
                  >
                    <div
                      className={cn(
                        'max-w-[70%] rounded-2xl px-4 py-2',
                        message.isMine
                          ? 'gradient-primary text-white'
                          : 'bg-card border border-border'
                      )}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">{message.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-border/50">
              <div className="flex items-center gap-2 max-w-4xl mx-auto">
                <Button size="icon" variant="ghost">
                  <Icon name="Paperclip" size={20} />
                </Button>

                <Input
                  placeholder="Написать сообщение..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />

                <Button size="icon" variant="ghost">
                  <Icon name="Mic" size={20} />
                </Button>

                <Button
                  size="icon"
                  className="gradient-primary"
                  onClick={handleSendMessage}
                >
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full gradient-primary flex items-center justify-center">
                <Icon name="MessageCircle" size={40} />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Выберите чат</h2>
                <p className="text-muted-foreground">
                  Начните общение или создайте новый чат
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Messenger;
