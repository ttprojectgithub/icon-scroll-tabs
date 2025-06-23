
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Info, Home, Settings, FileText, Users, Calendar, Mail, Phone, Globe, Database, Lock, Edit, Search, Clock, Archive, Download, List, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TabData {
  index: number;
  title: string;
  type?: string;
}

interface ListItem {
  index: number;
  title: string;
  type?: string;
  icon: React.ComponentType<any>;
  color?: string;
}

interface TabFormData {
  [key: string]: string;
}

const DynamicTabs = () => {
  // Updated tabs array according to Bank Mizrahi Tefahot requirements
  const tabs: TabData[] = [
    { index: 0, title: 'ריכוז מידע' },
    { index: 1, title: 'נתונים כלליים' },
    { index: 2, title: 'לווים' },
    { index: 3, title: 'זכאות' },
    { index: 4, title: 'תוכנית מימון' },
    { index: 5, title: 'הרכב הלוואה' },
    { index: 6, title: 'ביטחונות', type: '*' },
    { index: 7, title: 'התחייבויות' },
    { index: 8, title: 'סימולציות' },
    { index: 9, title: 'השערות' },
    { index: 10, title: 'המלצת מראיין' },
    { index: 11, title: 'ערבים' },
    { index: 12, title: 'צרופות וחתימות', type: '#' },
    { index: 13, title: 'מדדי החלטה' },
    { index: 14, title: 'צפי לסילוק מוקדם ראשון' },
    { index: 15, title: 'הדפסת טפסים וחתימות', type: '#' },
    { index: 16, title: 'נהנים' },
    { index: 17, title: 'מעקב הודעות ללווה' },
    { index: 18, title: 'הוראות תשלום' },
    { index: 19, title: 'ביטוח חיים דיפרנציאלי', type: '*' },
    { index: 20, title: 'אימות נתונים' },
    { index: 21, title: 'התניות' },
    { index: 22, title: 'הערות בתיק' },
    { index: 23, title: 'תדריך ללווה' },
    { index: 24, title: 'ביטוח אשראי', type: '+' },
    { index: 25, title: 'נלווה עם-יתרה' },
    { index: 26, title: 'ניוד משכנתה' },
    { index: 27, title: 'פרטים משלימים', type: '+' }
  ];

  const [currentGroup, setCurrentGroup] = useState(0);
  const [selectedTab, setSelectedTab] = useState<number | null>(null);
  const [rememberedTab, setRememberedTab] = useState<number | null>(null);
  const [formData, setFormData] = useState<TabFormData>({});
  const tabsPerGroup = 18;
  const maxGroups = Math.ceil((tabs.length - 1) / (tabsPerGroup - 1)); // -1 for the info tab

  // Function to get the appropriate icon based on type
  const getTypeIcon = (type?: string) => {
    switch (type) {
      case '*':
        return Lock;
      case '#':
        return Star;
      case '+':
        return Clock;
      default:
        return null;
    }
  };

  // Tab list items for the "ריכוז מידע" tab
  const tabListItems: ListItem[] = tabs.slice(1).map((tab, index) => ({
    index: tab.index,
    title: tab.title,
    type: tab.type,
    icon: List, // Default list icon for all items
    color: index % 3 === 0 ? 'orange' : index % 3 === 1 ? 'gray' : 'white'
  }));

  const getVisibleTabs = () => {
    const infoTab = tabs[0]; // ריכוז מידע - always visible
    const startIndex = currentGroup * (tabsPerGroup - 1) + 1;
    let regularTabs = tabs.slice(startIndex, startIndex + tabsPerGroup - 1);
    
    // If we have a remembered tab and it's not in current view, insert it as second tab
    if (rememberedTab && rememberedTab !== 0) {
      const isRememberedInView = regularTabs.some(tab => tab.index === rememberedTab);
      if (!isRememberedInView) {
        const rememberedTabData = tabs.find(tab => tab.index === rememberedTab);
        if (rememberedTabData) {
          regularTabs = [rememberedTabData, ...regularTabs.slice(0, tabsPerGroup - 2)];
        }
      }
    }
    
    return [infoTab, ...regularTabs];
  };

  const handleTabClick = (tabIndex: number) => {
    setSelectedTab(tabIndex);
    setRememberedTab(tabIndex);
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentGroup > 0) {
      setCurrentGroup(currentGroup - 1);
    } else if (direction === 'next' && currentGroup < maxGroups - 1) {
      setCurrentGroup(currentGroup + 1);
    }
  };

  const handleFormChange = (tabIndex: number, field: string, value: string) => {
    const key = `${tabIndex}-${field}`;
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getFormValue = (tabIndex: number, field: string) => {
    const key = `${tabIndex}-${field}`;
    return formData[key] || '';
  };

  const getColorClasses = (color?: string) => {
    const colorMap: { [key: string]: string } = {
      orange: 'bg-orange-50 border-orange-300 text-orange-800 hover:bg-orange-200 hover:border-orange-400 hover:shadow-md',
      gray: 'bg-gray-50 border-gray-300 text-gray-800 hover:bg-gray-200 hover:border-gray-400 hover:shadow-md',
      white: 'bg-white border-gray-300 text-gray-800 hover:bg-gray-100 hover:border-gray-400 hover:shadow-md'
    };
    return colorMap[color || 'white'] || colorMap.white;
  };

  const renderForm = (tabIndex: number) => {
    const currentTab = tabs.find(t => t.index === tabIndex);
    return (
      <div className="space-y-6 p-4 bg-white rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">טופס {currentTab?.title}</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`name-${tabIndex}`} className="text-right">שם מלא</Label>
            <Input
              id={`name-${tabIndex}`}
              placeholder="הכנס שם מלא"
              value={getFormValue(tabIndex, 'name')}
              onChange={(e) => handleFormChange(tabIndex, 'name', e.target.value)}
              className="text-right"
              dir="rtl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`email-${tabIndex}`} className="text-right">כתובת אימייל</Label>
            <Input
              id={`email-${tabIndex}`}
              type="email"
              placeholder="הכנס כתובת אימייל"
              value={getFormValue(tabIndex, 'email')}
              onChange={(e) => handleFormChange(tabIndex, 'email', e.target.value)}
              className="text-right"
              dir="rtl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`phone-${tabIndex}`} className="text-right">טלפון</Label>
            <Input
              id={`phone-${tabIndex}`}
              placeholder="הכנס מספר טלפון"
              value={getFormValue(tabIndex, 'phone')}
              onChange={(e) => handleFormChange(tabIndex, 'phone', e.target.value)}
              className="text-right"
              dir="rtl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`company-${tabIndex}`} className="text-right">חברה</Label>
            <Input
              id={`company-${tabIndex}`}
              placeholder="שם החברה"
              value={getFormValue(tabIndex, 'company')}
              onChange={(e) => handleFormChange(tabIndex, 'company', e.target.value)}
              className="text-right"
              dir="rtl"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`notes-${tabIndex}`} className="text-right">הערות</Label>
          <textarea
            id={`notes-${tabIndex}`}
            placeholder="הערות נוספות..."
            value={getFormValue(tabIndex, 'notes')}
            onChange={(e) => handleFormChange(tabIndex, 'notes', e.target.value)}
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
          {getVisibleTabs().map((tab) => {
            const TypeIcon = getTypeIcon(tab.type);
            return (
              <button
                key={tab.index}
                onClick={() => handleTabClick(tab.index)}
                className={`
                  flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 flex flex-col items-center gap-1
                  ${selectedTab === tab.index
                    ? 'border-orange-500 text-orange-600 bg-white'
                    : 'border-transparent text-gray-600 hover:text-orange-600 hover:border-orange-300'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  {tab.index === 0 && <Info className="w-5 h-5 text-orange-600" />}
                  {TypeIcon && <TypeIcon className="w-5 h-5 text-orange-600" />}
                </div>
                <span className="text-xs leading-tight">{tab.title}</span>
              </button>
            );
          })}
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
        {selectedTab !== null ? (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              תוכן {tabs.find(t => t.index === selectedTab)?.title}
            </h3>
            
            {selectedTab === 0 ? (
              // Special content for "ריכוז מידע" - show tab list
              <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-lg">
                <div className="space-y-1 p-4">
                  {tabListItems.map((item) => {
                    const IconComponent = item.icon;
                    const TypeIcon = getTypeIcon(item.type);
                    return (
                      <div
                        key={item.index}
                        className={`
                          flex items-center gap-3 p-2 rounded-lg border transition-all duration-200
                          cursor-pointer
                          ${getColorClasses(item.color)}
                        `}
                        onClick={() => handleTabClick(item.index)}
                      >
                        <IconComponent className="w-4 h-4 flex-shrink-0" />
                        <div className="w-4 flex justify-center">
                          {TypeIcon ? <TypeIcon className="w-4 h-4 flex-shrink-0 text-orange-600" /> : <span className="w-4"></span>}
                        </div>
                        <span className="font-medium text-sm">{item.title}</span>
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
        {rememberedTab !== null && (
          <span className="text-orange-600">
            טאב זכור: {tabs.find(t => t.index === rememberedTab)?.title}
          </span>
        )}
      </div>
    </div>
  );
};

export default DynamicTabs;
