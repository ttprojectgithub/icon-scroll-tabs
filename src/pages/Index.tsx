
import DynamicTabs from "@/components/DynamicTabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            מערכת ניהול טאבים דינמית
          </h1>
          <p className="text-gray-600">
            מערכת עם 25 טאבים, ניווט חכם ורשימה נגללת
          </p>
        </div>
        
        <DynamicTabs />
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>💡 בחר טאב לצפייה בתוכן • השתמש בחצים לניווט בין קבוצות • הטאב הנבחר נשמר בעת מעבר</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
