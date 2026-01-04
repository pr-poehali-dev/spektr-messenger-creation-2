export interface Theme {
  id: string;
  name: string;
  colors: {
    background: string;
    foreground: string;
    card: string;
    'card-foreground': string;
    primary: string;
    'primary-foreground': string;
    secondary: string;
    'secondary-foreground': string;
    accent: string;
    'accent-foreground': string;
    muted: string;
    'muted-foreground': string;
    border: string;
  };
}

export const themes: Theme[] = [
  {
    id: 'purple',
    name: 'Фиолетовый (Purple)',
    colors: {
      background: '222 47% 11%',
      foreground: '210 40% 98%',
      card: '224 71% 4%',
      'card-foreground': '210 40% 98%',
      primary: '263 70% 50%',
      'primary-foreground': '210 40% 98%',
      secondary: '326 78% 60%',
      'secondary-foreground': '210 40% 98%',
      accent: '199 89% 48%',
      'accent-foreground': '210 40% 98%',
      muted: '223 47% 11%',
      'muted-foreground': '215 20% 65%',
      border: '215 28% 17%',
    },
  },
  {
    id: 'blue',
    name: 'Синий (Blue)',
    colors: {
      background: '222 47% 11%',
      foreground: '210 40% 98%',
      card: '220 71% 4%',
      'card-foreground': '210 40% 98%',
      primary: '217 91% 60%',
      'primary-foreground': '222 47% 11%',
      secondary: '199 89% 48%',
      'secondary-foreground': '210 40% 98%',
      accent: '198 70% 50%',
      'accent-foreground': '210 40% 98%',
      muted: '220 47% 11%',
      'muted-foreground': '215 20% 65%',
      border: '215 28% 17%',
    },
  },
  {
    id: 'green',
    name: 'Зелёный (Green)',
    colors: {
      background: '222 47% 11%',
      foreground: '210 40% 98%',
      card: '140 71% 4%',
      'card-foreground': '210 40% 98%',
      primary: '142 71% 45%',
      'primary-foreground': '210 40% 98%',
      secondary: '160 60% 50%',
      'secondary-foreground': '210 40% 98%',
      accent: '173 80% 40%',
      'accent-foreground': '210 40% 98%',
      muted: '140 47% 11%',
      'muted-foreground': '215 20% 65%',
      border: '215 28% 17%',
    },
  },
  {
    id: 'orange',
    name: 'Оранжевый (Orange)',
    colors: {
      background: '222 47% 11%',
      foreground: '210 40% 98%',
      card: '24 71% 4%',
      'card-foreground': '210 40% 98%',
      primary: '25 95% 53%',
      'primary-foreground': '210 40% 98%',
      secondary: '43 96% 56%',
      'secondary-foreground': '222 47% 11%',
      accent: '33 100% 50%',
      'accent-foreground': '210 40% 98%',
      muted: '24 47% 11%',
      'muted-foreground': '215 20% 65%',
      border: '215 28% 17%',
    },
  },
  {
    id: 'pink',
    name: 'Розовый (Pink)',
    colors: {
      background: '222 47% 11%',
      foreground: '210 40% 98%',
      card: '330 71% 4%',
      'card-foreground': '210 40% 98%',
      primary: '330 81% 60%',
      'primary-foreground': '210 40% 98%',
      secondary: '340 82% 52%',
      'secondary-foreground': '210 40% 98%',
      accent: '350 89% 60%',
      'accent-foreground': '210 40% 98%',
      muted: '330 47% 11%',
      'muted-foreground': '215 20% 65%',
      border: '215 28% 17%',
    },
  },
  {
    id: 'red',
    name: 'Красный (Red)',
    colors: {
      background: '222 47% 11%',
      foreground: '210 40% 98%',
      card: '0 71% 4%',
      'card-foreground': '210 40% 98%',
      primary: '0 72% 51%',
      'primary-foreground': '210 40% 98%',
      secondary: '0 84% 60%',
      'secondary-foreground': '210 40% 98%',
      accent: '4 90% 58%',
      'accent-foreground': '210 40% 98%',
      muted: '0 47% 11%',
      'muted-foreground': '215 20% 65%',
      border: '215 28% 17%',
    },
  },
  {
    id: 'cyan',
    name: 'Голубой (Cyan)',
    colors: {
      background: '222 47% 11%',
      foreground: '210 40% 98%',
      card: '190 71% 4%',
      'card-foreground': '210 40% 98%',
      primary: '189 94% 43%',
      'primary-foreground': '210 40% 98%',
      secondary: '199 89% 48%',
      'secondary-foreground': '210 40% 98%',
      accent: '188 85% 45%',
      'accent-foreground': '210 40% 98%',
      muted: '190 47% 11%',
      'muted-foreground': '215 20% 65%',
      border: '215 28% 17%',
    },
  },
  {
    id: 'violet',
    name: 'Фиалковый (Violet)',
    colors: {
      background: '222 47% 11%',
      foreground: '210 40% 98%',
      card: '270 71% 4%',
      'card-foreground': '210 40% 98%',
      primary: '271 81% 56%',
      'primary-foreground': '210 40% 98%',
      secondary: '280 87% 65%',
      'secondary-foreground': '210 40% 98%',
      accent: '262 83% 58%',
      'accent-foreground': '210 40% 98%',
      muted: '270 47% 11%',
      'muted-foreground': '215 20% 65%',
      border: '215 28% 17%',
    },
  },
  {
    id: 'indigo',
    name: 'Индиго (Indigo)',
    colors: {
      background: '222 47% 11%',
      foreground: '210 40% 98%',
      card: '231 71% 4%',
      'card-foreground': '210 40% 98%',
      primary: '231 48% 48%',
      'primary-foreground': '210 40% 98%',
      secondary: '243 75% 59%',
      'secondary-foreground': '210 40% 98%',
      accent: '237 83% 58%',
      'accent-foreground': '210 40% 98%',
      muted: '231 47% 11%',
      'muted-foreground': '215 20% 65%',
      border: '215 28% 17%',
    },
  },
  {
    id: 'amber',
    name: 'Янтарный (Amber)',
    colors: {
      background: '222 47% 11%',
      foreground: '210 40% 98%',
      card: '38 71% 4%',
      'card-foreground': '210 40% 98%',
      primary: '38 92% 50%',
      'primary-foreground': '222 47% 11%',
      secondary: '45 93% 47%',
      'secondary-foreground': '222 47% 11%',
      accent: '32 95% 44%',
      'accent-foreground': '210 40% 98%',
      muted: '38 47% 11%',
      'muted-foreground': '215 20% 65%',
      border: '215 28% 17%',
    },
  },
];

export function applyTheme(themeId: string) {
  const theme = themes.find((t) => t.id === themeId);
  if (!theme) return;

  const root = document.documentElement;
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });

  localStorage.setItem('spektr-theme', themeId);
}

export function getStoredTheme(): string {
  return localStorage.getItem('spektr-theme') || 'purple';
}
