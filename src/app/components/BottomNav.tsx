import { Home, Truck, AlertTriangle, Recycle, User } from 'lucide-react';

type Page = 'dashboard' | 'pickups' | 'reports' | 'kiosks' | 'profile';

interface BottomNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard' as Page, icon: Home, label: 'Home' },
    { id: 'pickups' as Page, icon: Truck, label: 'Pickups' },
    { id: 'reports' as Page, icon: AlertTriangle, label: 'Reports' },
    { id: 'kiosks' as Page, icon: Recycle, label: 'Kiosks' },
    { id: 'profile' as Page, icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#C8E6C9] shadow-2xl z-50 safe-area-inset-bottom">
      <nav className="flex items-center justify-around px-2 py-3 max-w-2xl mx-auto">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                isActive 
                  ? 'bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] text-white scale-110' 
                  : 'text-[#558B2F] hover:bg-[#E8F5E9]'
              }`}
            >
              <item.icon className={`w-6 h-6 ${isActive ? 'animate-pulse-eco' : ''}`} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
