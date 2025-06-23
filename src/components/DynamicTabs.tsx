
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Info, Home, Settings, FileText, Users, Calendar, Mail, Phone, Globe, Database, Lock, Edit, Search, Clock, Archive, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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

interface TabFormData {
  [key: string]: string;
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
  const [formData, setFormData] = useState<TabFormData>({});
  const tabsPerGroup = 18;
  const maxGroups = Math.ceil(allTabs.length / tabsPerGroup);

  // Tab list items for the "ריכוז מידע" tab
  const tabListItems: ListItem[] = allTabs.map((tab, index) => ({
    id: tab.id,
    text: tab.name,
    icon: index === 0 ? Info : 
          index % 8 === 1 ? Users :
          index % 8 === 2 ? Database :
          index % 8 === 3 ? FileText :
          index % 8 === 4 ? Calendar :
          index % 8 === 5 ? Mail :
          index % 8 === 6 ? Settings :
          index % 8 === 7 ? Globe : Clock,
    color: index % 3 === 0 ? 'orange' : index % 3 === 1 ? 'gray' : 'white'
  }));

  // Sample list items with various icons for other tabs
  const listItems: ListItem[] = [
    { id: 1, text: 'פרטי לקוח ראשי', icon: Users, color: 'orange' },
    { id: 2, text: 'מידע חשבון בנק', icon: Database, color: 'gray' },
    { id: 3, text: 'היסטוריית עסקאות', icon: Clock, color: 'white' },
    { id: 4, text: 'מסמכים משפטיים', icon: FileText, color: 'orange' },
    { id: 5, text: 'פגישות מתוזמנות', icon: Calendar, color: 'gray' },
    { id: 6, text: 'התכתבות אימייל', icon: Mail, color: 'white' },
    { id: 7, text: 'פרטי קשר', icon: Phone, color: 'orange' },
    { id: 8, text: 'אתר אינטרנט', icon: Globe, color: 'gray' },
    { id: 9, text: 'הגדרות אבטחה', icon: Lock, color: 'white' },
    { id: 10, text: 'עריכת פרופיל', icon: Edit, color: 'orange' },
    { id: 11, text: 'חיפוש מתקדם', icon: Search, color: 'gray' },
    { id: 12, text: 'ארכיון מסמכים', icon: Archive, color: 'white' },
    { id: 13, text: 'הורדות קבצים', icon: Download, color: 'orange' },
    { id: 14, text: 'דוח סטטיסטיקות', icon: FileText, color: 'gray' },
    { id: 15, text: 'ניהול משתמשים', icon: Users, color: 'white' }
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

  const handleFormChange = (tabId: number, field: string, value: string) => {
    const key = `${tabId}-${field}`;
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getFormValue = (tabId: number, field: string) => {
    const key = `${tabId}-${field}`;
    return formData[key] || '';
  };

  const getColorClasses = (color?: string) => {
    const colorMap: { [key: string]: string } = {
      orange: 'bg-orange-50 border-orange-300 text-orange-800 hover:bg-orange-100',
      gray: 'bg-gray-50 border-gray-300 text-gray-800 hover:bg-gray-100',
      white: 'bg-white border-gray-300 text-gray-800 hover:bg-gray-50'
    };
    return colorMap[color || 'white'] || colorMap.white;
  };

  const renderForm = (tabId: number) => {
    return (
      <div className="space-y-6 p-4 bg-white rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">טופס {allTabs.find(t => t.id === tabId)?.name}</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`name-${tabId}`} className="text-right">שם מלא</Label>
            <Input
              id={`name-${tabId}`}
              placeholder="הכנס שם מלא"
              value={getFormValue(tabId, 'name')}
              onChange={(e) => handleFormChange(tabId, 'name', e.target.value)}
              className="text-right"
              dir="rtl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`email-${tabId}`} className="text-right">כתובת אימייל</Label>
            <Input
              id={`email-${tabId}`}
              type="email"
              placeholder="הכנס כתובת אימייל"
              value={getFormValue(tabId, 'email')}
              onChange={(e) => handleFormChange(tabId, 'email', e.target.value)}
              className="text-right"
              dir="rtl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`phone-${tabId}`} className="text-right">טלפון</Label>
            <Input
              id={`phone-${tabId}`}
              placeholder="הכנס מספר טלפון"
              value={getFormValue(tabId, 'phone')}
              onChange={(e) => handleFormChange(tabId, 'phone', e.target.value)}
              className="text-right"
              dir="rtl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`company-${tabId}`} className="text-right">חברה</Label>
            <Input
              id={`company-${tabId}`}
              placeholder="שם החברה"
              value={getFormValue(tabId, 'company')}
              onChange={(e) => handleFormChange(tabId, 'company', e.target.value)}
              className="text-right"
              dir="rtl"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`notes-${tabId}`} className="text-right">הערות</Label>
          <textarea
            id={`notes-${tabId}`}
            placeholder="הערות נוספות..."
            value={getFormValue(tabId, 'notes')}
            onChange={(e) => handleFormChange(tabId, 'notes', e.target.value)}
            className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md text-right resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            dir="rtl"
          />
        </div>
        
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
          שמור טופס
        </button>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg" dir="rtl">
      {/* Tabs Container */}
      <div className="flex items-center border-b border-gray-300 bg-gray-100">
        {/* Right Arrow */}
        <button
          onClick={() => handleNavigation('next')}
          disabled={currentGroup >= maxGroups - 1}
          className="p-2 text-gray-500 hover:text-orange-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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
                  ? 'border-orange-500 text-orange-600 bg-white'
                  : 'border-transparent text-gray-600 hover:text-orange-600 hover:border-orange-300'
                }
                ${tab.id === 1 ? 'flex items-center gap-2' : ''}
              `}
            >
              {tab.id === 1 && <Info className="w-4 h-4" />}
              {tab.name}
            </button>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={() => handleNavigation('prev')}
          disabled={currentGroup === 0}
          className="p-2 text-gray-500 hover:text-orange-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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
            
            {selectedTab === 1 ? (
              // Special content for "ריכוז מידע" - show tab list
              <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-lg">
                <div className="space-y-1 p-4">
                  {tabListItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={item.id}
                        className={`
                          flex items-center gap-3 p-3 rounded-lg border transition-all duration-200
                          hover:shadow-md cursor-pointer
                          ${getColorClasses(item.color)}
                        `}
                        onClick={() => handleTabClick(item.id)}
                      >
                        <IconComponent className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              // Form for other tabs
              renderForm(selectedTab)
            )}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Info className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg">בחר טאב להצגת התוכן</p>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="px-6 py-3 bg-gray-100 border-t border-gray-300 text-sm text-gray-600 flex justify-between items-center">
        <span>קבוצה {currentGroup + 1} מתוך {maxGroups}</span>
        {rememberedTab && (
          <span className="text-orange-600">
            טאב זכור: {allTabs.find(t => t.id === rememberedTab)?.name}
          </span>
        )}
      </div>
    </div>
  );
};

export default DynamicTabs;
