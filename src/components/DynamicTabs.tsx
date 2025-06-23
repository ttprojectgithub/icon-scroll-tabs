
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Info, Home, Settings, FileText, Users, Calendar, Mail, Phone, Globe, Database, Lock, Edit, Search, Clock, Archive, Download } from 'lucide-react';

interface TabData {
  id: number;
  name: string;
}

interface ListItem {
  id: number;
  text: string;
  icon: React.ComponentType<any>;
  color?: string;
}

const DynamicTabs = () => {
  // Generate 25 tabs
  const allTabs: TabData[] = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: i === 0 ? 'ריכוז מידע' : `טאב ${i + 1}`
  }));

  const [currentGroup, setCurrentGroup] = useState(0);
  const [selectedTab, setSelectedTab] = useState<number | null>(null);
  const [rememberedTab, setRememberedTab] = useState<number | null>(null);
  const tabsPerGroup = 18;
  const maxGroups = Math.ceil(allTabs.length / tabsPerGroup);

  // Sample list items with various icons
  const listItems: ListItem[] = [
    { id: 1, text: 'פרטי לקוח ראשי', icon: Users, color: 'blue' },
    { id: 2, text: 'מידע חשבון בנק', icon: Database, color: 'green' },
    { id: 3, text: 'היסטוריית עסקאות', icon: Clock, color: 'purple' },
    { id: 4, text: 'מסמכים משפטיים', icon: FileText, color: 'red' },
    { id: 5, text: 'פגישות מתוזמנות', icon: Calendar, color: 'orange' },
    { id: 6, text: 'התכתבות אימייל', icon: Mail, color: 'cyan' },
    { id: 7, text: 'פרטי קשר', icon: Phone, color: 'pink' },
    { id: 8, text: 'אתר אינטרנט', icon: Globe, color: 'indigo' },
    { id: 9, text: 'הגדרות אבטחה', icon: Lock, color: 'gray' },
    { id: 10, text: 'עריכת פרופיל', icon: Edit, color: 'yellow' },
    { id: 11, text: 'חיפוש מתקדם', icon: Search, color: 'teal' },
    { id: 12, text: 'ארכיון מסמכים', icon: Archive, color: 'brown' },
    { id: 13, text: 'הורדות קבצים', icon: Download, color: 'lime' },
    { id: 14, text: 'דוח סטטיסטיקות', icon: FileText, color: 'violet' },
    { id: 15, text: 'ניהול משתמשים', icon: Users, color: 'rose' }
  ];

  const getVisibleTabs = () => {
    const infoTab = allTabs[0]; // ריכוז מידע - always visible
    const startIndex = currentGroup * tabsPerGroup + 1;
    let regularTabs = allTabs.slice(startIndex, startIndex + tabsPerGroup - 1);
    
    // If we have a remembered tab and it's not in current view, insert it as second tab
    if (rememberedTab && rememberedTab !== 1) {
      const isRememberedInView = regularTabs.some(tab => tab.id === rememberedTab);
      if (!isRememberedInView) {
        const rememberedTabData = allTabs.find(tab => tab.id === rememberedTab);
        if (rememberedTabData) {
          regularTabs = [rememberedTabData, ...regularTabs.slice(0, tabsPerGroup - 2)];
        }
      }
    }
    
    return [infoTab, ...regularTabs];
  };

  const handleTabClick = (tabId: number) => {
    setSelectedTab(tabId);
    setRememberedTab(tabId);
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentGroup > 0) {
      setCurrentGroup(currentGroup - 1);
    } else if (direction === 'next' && currentGroup < maxGroups - 1) {
      setCurrentGroup(currentGroup + 1);
    }
  };

  const getColorClasses = (color?: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'bg-blue-50 border-blue-200 text-blue-700',
      green: 'bg-green-50 border-green-200 text-green-700',
      purple: 'bg-purple-50 border-purple-200 text-purple-700',
      red: 'bg-red-50 border-red-200 text-red-700',
      orange: 'bg-orange-50 border-orange-200 text-orange-700',
      cyan: 'bg-cyan-50 border-cyan-200 text-cyan-700',
      pink: 'bg-pink-50 border-pink-200 text-pink-700',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      gray: 'bg-gray-50 border-gray-200 text-gray-700',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
      teal: 'bg-teal-50 border-teal-200 text-teal-700',
      brown: 'bg-amber-50 border-amber-200 text-amber-700',
      lime: 'bg-lime-50 border-lime-200 text-lime-700',
      violet: 'bg-violet-50 border-violet-200 text-violet-700',
      rose: 'bg-rose-50 border-rose-200 text-rose-700'
    };
    return colorMap[color || 'gray'] || colorMap.gray;
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Tabs Container */}
      <div className="flex items-center border-b border-gray-200 bg-gray-50">
        {/* Left Arrow */}
        <button
          onClick={() => handleNavigation('prev')}
          disabled={currentGroup === 0}
          className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Tabs */}
        <div className="flex-1 flex overflow-hidden">
          {getVisibleTabs().map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`
                flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200
                ${selectedTab === tab.id
                  ? 'border-blue-500 text-blue-600 bg-white'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                }
                ${tab.id === 1 ? 'flex items-center gap-2' : ''}
              `}
            >
              {tab.id === 1 && <Info className="w-4 h-4" />}
              {tab.name}
            </button>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => handleNavigation('next')}
          disabled={currentGroup >= maxGroups - 1}
          className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {selectedTab ? (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              תוכן {allTabs.find(t => t.id === selectedTab)?.name}
            </h3>
            
            {/* Scrollable List */}
            <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
              <div className="space-y-1 p-4">
                {listItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.id}
                      className={`
                        flex items-center gap-3 p-3 rounded-lg border transition-all duration-200
                        hover:shadow-md cursor-pointer
                        ${getColorClasses(item.color)}
                      `}
                    >
                      <IconComponent className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Info className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">בחר טאב להצגת התוכן</p>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-600 flex justify-between items-center">
        <span>קבוצה {currentGroup + 1} מתוך {maxGroups}</span>
        {rememberedTab && (
          <span className="text-blue-600">
            טאב זכור: {allTabs.find(t => t.id === rememberedTab)?.name}
          </span>
        )}
      </div>
    </div>
  );
};

export default DynamicTabs;
