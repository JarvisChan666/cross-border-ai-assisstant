import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '仪表盘 - 跨境电商AI优化助手',
  description: '查看您的跨境电商AI优化助手使用情况和统计数据。',
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">欢迎使用跨境电商AI优化助手</h1>
        <p className="text-gray-600 mt-2">管理您的产品信息，提升跨境电商业绩</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <i className="fas fa-magic text-blue-600"></i>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">AI优化</h3>
              <p className="text-gray-600">本月已使用: 0次</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <i className="fas fa-image text-purple-600"></i>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">图片编辑</h3>
              <p className="text-gray-600">本月已使用: 0次</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <i className="fas fa-chart-line text-green-600"></i>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">价格分析</h3>
              <p className="text-gray-600">本月已使用: 0次</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">选择平台</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                <i className="fab fa-tiktok text-white text-xl"></i>
              </div>
              <h3 className="ml-3 text-lg font-semibold">TikTok Shop</h3>
            </div>
            <p className="text-gray-600 text-sm">针对TikTok Shop平台优化产品信息，提高曝光和转化</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <i className="fab fa-amazon text-white text-xl"></i>
              </div>
              <h3 className="ml-3 text-lg font-semibold">Amazon</h3>
            </div>
            <p className="text-gray-600 text-sm">针对Amazon平台优化产品信息，提高搜索排名和点击率</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                <i className="fab fa-ebay text-white text-xl"></i>
              </div>
              <h3 className="ml-3 text-lg font-semibold">eBay</h3>
            </div>
            <p className="text-gray-600 text-sm">针对eBay平台优化产品信息，提高曝光和销量</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <i className="fas fa-shopping-bag text-white text-xl"></i>
              </div>
              <h3 className="ml-3 text-lg font-semibold">Shopee</h3>
            </div>
            <p className="text-gray-600 text-sm">针对Shopee平台优化产品信息，提高搜索排名和转化率</p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">开始使用</h2>
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-rocket text-blue-600 text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">立即开始优化您的产品</h3>
            <p className="text-gray-600 mb-6">
              从上方选择您的目标平台，输入产品信息，让AI助手为您优化产品标题、描述和价格，提高产品在各大电商平台的竞争力。
            </p>
            <button className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
              <i className="fas fa-bolt mr-2"></i> 开始第一次优化
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 