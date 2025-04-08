
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronDown, LogOut, Menu } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavbarProps {
  userRole: 'admin' | 'student';
}

const Navbar: React.FC<NavbarProps> = ({ userRole }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userEmail = localStorage.getItem('userEmail') || '';
  const initials = userEmail.substring(0, 2).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully"
    });
    
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Vote', href: '/vote' },
    ...(userRole === 'admin' ? [{ name: 'Analytics', href: '/analytics' }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <div className="hidden md:flex">
          <Link to="/dashboard" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl text-college-navy">
              Campus<span className="text-college-gold">Council</span>
            </span>
          </Link>
          <nav className="flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-medium transition-colors hover:text-college-gold"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[280px]">
            <div className="py-4">
              <div className="px-3 py-2">
                <h2 className="mb-2 text-lg font-semibold">
                  Campus<span className="text-college-gold">Council</span>
                </h2>
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-college-gold/10 hover:text-college-navy"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="md:hidden flex-1">
          <Link to="/dashboard" className="flex items-center">
            <span className="font-bold text-lg text-college-navy">
              Campus<span className="text-college-gold">Council</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-9 w-9 rounded-full"
              >
                <Avatar className="h-9 w-9">
                  <AvatarFallback className={cn(
                    "bg-college-navy text-white text-xs",
                    userRole === 'admin' && "bg-college-gold text-college-navy"
                  )}>
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">{userEmail}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {userRole}
                  </p>
                </div>
              </div>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
