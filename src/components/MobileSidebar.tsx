import { Menu, X, LogOut, PieChart, Map } from 'lucide-react';
import { useState } from 'react';

interface MobileSidebarProps {
  onLogout: () => void;
  onShowChart: () => void;
  onShowMap: () => void;
}

export default function MobileSidebar({ onLogout, onShowChart, onShowMap }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-2 rounded-md bg-gray-800 text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg z-50">
            <div className="flex flex-col p-4 space-y-4">
              <button
                onClick={() => {
                  onShowChart();
                  setIsOpen(false);
                }}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
              >
                <PieChart size={20} />
                <span>Show Chart</span>
              </button>
              <button
                onClick={() => {
                  onShowMap();
                  setIsOpen(false);
                }}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
              >
                <Map size={20} />
                <span>Show Map</span>
              </button>
              <button
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
