import React, { useState, useRef, useEffect } from 'react';
import TopNav from './components/TopNav';
import ViewToggle from './components/ViewToggle';
import BakerCard from './components/BakerCard';
import MapView from './components/MapView';
import BottomNav from './components/BottomNav';
import BakerDetail from './components/BakerDetail';
import OrderPage from './components/OrderPage';
import ProfilePage from './components/ProfilePage';
import FavoritesPage from './components/FavoritesPage';
import AddressListPage from './components/AddressListPage';
import AddressEditPage from './components/AddressEditPage';
import FeedbackPage from './components/FeedbackPage';
import EditProfilePage from './components/EditProfilePage';
import BakerProfilePage from './components/BakerProfilePage';
import BakerOrdersPage from './components/BakerOrdersPage';
import BakerBreadsPage from './components/BakerBreadsPage';
import type { BakerDetailData } from './components/BakerDetail';
import type { Address } from './components/AddressListPage';
import type { Feedback } from './components/FeedbackPage';
import type { UserProfile } from './components/EditProfilePage';
import type { BakerFormData } from './components/BecomeBakerModal';
import { Loader2 } from 'lucide-react';

export interface Baker {
  id: string;
  name: string;
  avatar: string;
  distance: number;
  breads: string[];
  isOpen: boolean;
  purchased?: boolean; // 是否购买过
}

type ViewMode = 'list' | 'map';
type NavItem = 'home' | 'orders' | 'profile';

// 初始数据
const initialBakers: Baker[] = [
  {
    id: '1',
    name: '麦田工坊',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    distance: 1.2,
    breads: ['法棍', '可颂', '欧包'],
    isOpen: true,
    purchased: true,
  },
  {
    id: '2',
    name: '小林面包屋',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    distance: 2.5,
    breads: ['吐司', '贝果', '丹麦酥'],
    isOpen: false,
  },
  {
    id: '3',
    name: '阿雅烘焙坊',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    distance: 0.8,
    breads: ['司康', '软欧包', '牛角包'],
    isOpen: true,
    purchased: true,
  },
  {
    id: '4',
    name: '巴黎香颂',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    distance: 3.2,
    breads: ['羊角包', '法棍', '马卡龙'],
    isOpen: true,
  },
  {
    id: '5',
    name: '木村手作',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    distance: 1.8,
    breads: ['全麦面包', '坚果包', '黑麦面包'],
    isOpen: false,
  },
  {
    id: '6',
    name: '甜蜜时光',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200',
    distance: 4.5,
    breads: ['红豆包', '肉松面包', '菠萝包'],
    isOpen: true,
  },
];

// 模拟分页数据
const generateMockBakers = (page: number): Baker[] => {
  const names = ['云朵烘焙', '晨光面包', '谷物工房', '手作面包', '香榭丽舍', '暖心烘焙'];
  const breads = [
    ['软欧包', '全麦吐司', '坚果面包'],
    ['可颂', '牛角包', '丹麦酥'],
    ['法棍', '乡村面包', '酸面团'],
    ['贝果', '百吉饼', '肉桂卷'],
    ['红豆包', '奶黄包', '菠萝包'],
    ['司康', '马芬', '布朗尼'],
  ];
  
  return Array.from({ length: 6 }, (_, i) => ({
    id: `page${page}-${i + 1}`,
    name: `${names[i % names.length]} ${page}号店`,
    avatar: `https://images.unsplash.com/photo-${1438761681033 + page * 1000 + i}?w=200`,
    distance: parseFloat((Math.random() * 5 + 0.5).toFixed(1)),
    breads: breads[i % breads.length],
    isOpen: Math.random() > 0.3,
    purchased: Math.random() > 0.7,
  }));
};

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [activeNav, setActiveNav] = useState<NavItem>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [bakers, setBakers] = useState<Baker[]>(initialBakers);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedBakerId, setSelectedBakerId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 用户相关状态
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    nickname: '面包爱好者',
    gender: 'male' as 'male' | 'female',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
    phone: '13800138000',
  });

  // 主理人相关状态
  const [isBaker, setIsBaker] = useState(false);
  const [viewingBakerPage, setViewingBakerPage] = useState(false); // 是否在查看主理人页面
  const [bakerNav, setBakerNav] = useState<'orders' | 'breads' | 'profile'>('profile'); // 主理人页面导航
  const [bakerInfo, setBakerInfo] = useState<BakerFormData>({
    name: '我的面包工坊',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
    specialties: ['法棍', '可颂', '欧包', '软欧包'],
    address: '四川省成都市武侯区桐梓林',
    phone: '13800138000',
  });

  // 收藏列表
  const [favoriteBakerIds, setFavoriteBakerIds] = useState<string[]>(['1', '3']);

  // 地址列表
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: '张三',
      phone: '13800138000',
      gender: 'male',
      address: '四川省成都市武侯区桐梓林',
      doorNumber: '1栋2单元301室',
      tag: '家',
      isDefault: true,
    },
  ]);

  // 反馈列表
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: '1',
      content: '希望能增加更多面包种类选择',
      createdAt: '2024-01-15 10:30',
      reply: '感谢您的建议，我们会持续丰富面包品类',
      repliedAt: '2024-01-15 14:20',
    },
  ]);

  // 页面路由状态
  const [currentPage, setCurrentPage] = useState<string>('profile');
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  // 监听导航变化，重置子页面状态
  useEffect(() => {
    if (activeNav !== 'profile') {
      setCurrentPage('profile');
    }
  }, [activeNav]);

  // 监听滚动事件
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || viewMode !== 'list') return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // 当滚动到距离底部 150px 时触发加载
      if (scrollHeight - scrollTop - clientHeight < 150 && !loading && hasMore) {
        loadMore();
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, viewMode]);

  // 加载更多数据
  const loadMore = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // 模拟网络请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const nextPage = page + 1;
    const newBakers = generateMockBakers(nextPage);
    
    setBakers(prev => [...prev, ...newBakers]);
    setPage(nextPage);
    
    // 模拟最多加载 5 页
    if (nextPage >= 5) {
      setHasMore(false);
    }
    
    setLoading(false);
  };

  const filteredBakers = bakers.filter(
    (baker) =>
      baker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      baker.breads.some((bread) =>
        bread.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleBakerClick = (id: string) => {
    console.log('点击主理人:', id);
    setSelectedBakerId(id);
  };

  const handleBackFromDetail = () => {
    setSelectedBakerId(null);
  };

  const handleShare = () => {
    console.log('分享主理人');
    // TODO: 实现分享功能
  };

  // 用户登录
  const handleLogin = () => {
    // TODO: 跳转到登录页面
    alert('跳转到登录页');
  };

  // 用户退出登录
  const handleLogout = () => {
    setIsLoggedIn(false);
    setFavoriteBakerIds([]);
    setAddresses([]);
    setFeedbacks([]);
  };

  // 保存用户资料
  const handleSaveProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentPage('profile');
    alert('资料已保存');
  };

  // 提交反馈
  const handleSubmitFeedback = (content: string) => {
    const newFeedback: Feedback = {
      id: Date.now().toString(),
      content,
      createdAt: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setFeedbacks(prev => [newFeedback, ...prev]);
    alert('反馈已提交');
  };

  // 保存地址
  const handleSaveAddress = (addressData: Omit<Address, 'id'>) => {
    if (editingAddressId) {
      // 编辑现有地址
      setAddresses(prev =>
        prev.map(addr =>
          addr.id === editingAddressId
            ? { ...addressData, id: editingAddressId }
            : addressData.isDefault
            ? { ...addr, isDefault: false }
            : addr
        )
      );
    } else {
      // 新建地址
      const newAddress: Address = {
        ...addressData,
        id: Date.now().toString(),
      };
      setAddresses(prev => {
        if (newAddress.isDefault) {
          return [newAddress, ...prev.map(addr => ({ ...addr, isDefault: false }))];
        }
        return [newAddress, ...prev];
      });
    }
    setEditingAddressId(null);
    setCurrentPage('addressList');
    alert('地址已保存');
  };

  // 删除地址
  const handleDeleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  // 成为主理人
  const handleBecomeBaker = (data: BakerFormData) => {
    setBakerInfo(data);
    setIsBaker(true);
    alert('恭喜成为主理人！');
  };

  // 切换到主理人页面
  const handleSwitchToBaker = () => {
    setViewingBakerPage(true);
  };

  // 切换回用户页面
  const handleSwitchToUser = () => {
    setViewingBakerPage(false);
  };

  // 更新主理人信息
  const handleUpdateBakerInfo = (data: BakerFormData) => {
    setBakerInfo(data);
    alert('主理人信息已更新');
  };

  // 获取收藏的主理人列表
  const favoriteBakers = bakers.filter(baker => favoriteBakerIds.includes(baker.id));

  // 模拟获取主理人详情数据
  const getMockBakerDetail = (id: string): BakerDetailData | null => {
    const baker = bakers.find(b => b.id === id);
    if (!baker) return null;

    return {
      id: baker.id,
      name: baker.name,
      avatar: baker.avatar,
      isVerified: true,
      totalSold: Math.floor(Math.random() * 500) + 100,
      distance: baker.distance,
      location: '武侯区桐梓林',
      isOpen: baker.isOpen,
      hotBreads: [
        { name: '法棍', count: 128 },
        { name: '可颂', count: 95 },
        { name: '欧包', count: 67 },
      ],
      breads: [
        {
          id: '1',
          name: '经典法棍',
          image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400',
          price: 18.00,
          isHot: true,
          isPurchased: true,
          category: '咸面包',
          tags: ['健康', '长时间发酵'],
          description: '传统法式工艺，72小时低温发酵，外脆内软',
          soldCount: 128,
        },
        {
          id: '2',
          name: '牛角可颂',
          image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
          price: 12.00,
          isHot: true,
          isPurchased: false,
          category: '甜面包',
          tags: ['全麦'],
          description: '法国AOP认证黄油，层次分明',
          soldCount: 95,
        },
        {
          id: '3',
          name: '全麦软欧包',
          image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400',
          price: 22.00,
          isHot: false,
          isPurchased: true,
          category: '咸面包',
          tags: ['健康', '全麦', '易消化'],
          description: '100%全麦粉，添加坚果和果干，营养丰富',
          soldCount: 67,
        },
        {
          id: '4',
          name: '红豆吐司',
          image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
          price: 15.00,
          isHot: false,
          isPurchased: false,
          category: '甜面包',
          tags: ['健康'],
          description: '北海道红豆，香甜软糯',
          soldCount: 45,
        },
        {
          id: '5',
          name: '黑麦乡村面包',
          image: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=400',
          price: 20.00,
          isHot: false,
          isPurchased: false,
          category: '咸面包',
          tags: ['全麦', '长时间发酵'],
          description: '德式黑麦粉，天然酵种发酵48小时',
          soldCount: 38,
        },
        {
          id: '6',
          name: '抹茶红豆包',
          image: 'https://images.unsplash.com/photo-1612201142855-9de93c4fc04b?w=400',
          price: 14.00,
          isHot: false,
          isPurchased: false,
          category: '甜面包',
          tags: ['健康'],
          description: '宇治抹茶粉，搭配蜜红豆',
          soldCount: 52,
        },
      ],
    };
  };

  const selectedBakerDetail = selectedBakerId ? getMockBakerDetail(selectedBakerId) : null;

  // 如果选中了主理人，显示详情页
  if (selectedBakerDetail) {
    return (
      <BakerDetail
        baker={selectedBakerDetail}
        onBack={handleBackFromDetail}
        onShare={handleShare}
      />
    );
  }

  // 如果在订单页面，显示订单页
  if (activeNav === 'orders') {
    return (
      <OrderPage
        onBack={() => setActiveNav('home')}
        onBakerClick={handleBakerClick}
        onNavChange={setActiveNav}
      />
    );
  }

  // 如果在个人资料页面，显示个人资料页
  if (activeNav === 'profile') {
    // 如果正在查看主理人页面
    if (viewingBakerPage) {
      // 显示订单管理页面
      if (bakerNav === 'orders') {
        return (
          <BakerOrdersPage
            onNavChange={setBakerNav}
          />
        );
      }

      // 添加面包管理页面
      if (bakerNav === 'breads') {
        return <BakerBreadsPage onNavChange={setBakerNav} />;
      }

      // 显示主理人个人中心页面
      return (
        <BakerProfilePage
          onNavChange={setBakerNav}
          onSwitchToUser={handleSwitchToUser}
          onLogout={handleLogout}
          bakerInfo={bakerInfo}
          onUpdateBakerInfo={handleUpdateBakerInfo}
        />
      );
    }

    // 处理不同的子页面
    if (currentPage === 'favorites') {
      return (
        <FavoritesPage
          onBack={() => setCurrentPage('profile')}
          favoriteBakers={favoriteBakers}
          onBakerClick={handleBakerClick}
          isLoggedIn={isLoggedIn}
        />
      );
    }

    if (currentPage === 'addressList') {
      return (
        <AddressListPage
          onBack={() => setCurrentPage('profile')}
          addresses={addresses}
          onAddAddress={() => {
            setEditingAddressId(null);
            setCurrentPage('addressEdit');
          }}
          onEditAddress={(id) => {
            setEditingAddressId(id);
            setCurrentPage('addressEdit');
          }}
          onDeleteAddress={handleDeleteAddress}
          isLoggedIn={isLoggedIn}
        />
      );
    }

    if (currentPage === 'addressEdit') {
      const editingAddress = editingAddressId
        ? addresses.find(addr => addr.id === editingAddressId)
        : undefined;
      return (
        <AddressEditPage
          onBack={() => setCurrentPage('addressList')}
          onSave={handleSaveAddress}
          address={editingAddress}
        />
      );
    }

    if (currentPage === 'feedback') {
      return (
        <FeedbackPage
          onBack={() => setCurrentPage('profile')}
          feedbacks={feedbacks}
          onSubmitFeedback={handleSubmitFeedback}
          isLoggedIn={isLoggedIn}
        />
      );
    }

    if (currentPage === 'editProfile') {
      return (
        <EditProfilePage
          onBack={() => setCurrentPage('profile')}
          profile={userProfile}
          onSave={handleSaveProfile}
        />
      );
    }

    return (
      <ProfilePage
        onNavChange={setActiveNav}
        onOrdersClick={() => setActiveNav('orders')}
        onFavoritesClick={() => setCurrentPage('favorites')}
        onLikesClick={() => {}} // TODO: 实现我的喜欢功能
        onAddressClick={() => setCurrentPage('addressList')}
        onFeedbackClick={() => setCurrentPage('feedback')}
        onEditProfileClick={() => setCurrentPage('editProfile')}
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onBecomeBaker={handleBecomeBaker}
        onSwitchToBaker={handleSwitchToBaker}
        userNickname={userProfile.nickname}
        userAvatar={userProfile.avatar}
        userGender={userProfile.gender}
      />
    );
  }

  return (
    <div className="app">
      <TopNav city="成都" onSearch={setSearchQuery} />
      
      <main className="main-content" ref={scrollContainerRef}>
        <ViewToggle mode={viewMode} onChange={setViewMode} />
        
        {viewMode === 'list' ? (
          <div className="list-view">
            {filteredBakers.map((baker) => (
              <BakerCard
                key={baker.id}
                baker={baker}
                onClick={handleBakerClick}
              />
            ))}
            
            {/* 加载状态 */}
            {loading && (
              <div className="loading-more">
                <Loader2 className="loading-icon" size={20} />
                <span className="loading-text">加载中...</span>
              </div>
            )}
            
            {/* 没有更多数据 */}
            {!hasMore && filteredBakers.length > 0 && (
              <div className="no-more">
                <span className="no-more-text">没有更多了</span>
              </div>
            )}
            
            {filteredBakers.length === 0 && (
              <div className="empty-state">
                <p className="empty-text">暂无符合条件的主理人</p>
              </div>
            )}
          </div>
        ) : (
          <MapView 
            bakers={filteredBakers} 
            onBakerClick={handleBakerClick}
          />
        )}
      </main>
      
      <BottomNav active={activeNav} onChange={setActiveNav} />
    </div>
  );
}