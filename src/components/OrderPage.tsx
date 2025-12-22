import React, { useState, useRef, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Loader2, Star, X } from 'lucide-react';
import BottomNav from './BottomNav';

// 订单状态类型
type OrderStatus = 'pending' | 'completed' | 'cancelled';
type NavItem = 'home' | 'orders' | 'profile';

// 面包项
interface BreadItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// 评价数据
interface BreadReview {
  breadId: string;
  rating: number;
  comment: string;
}

interface OrderReview {
  orderId: string;
  reviews: BreadReview[];
}

// 订单信息
interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  bakerId: string;
  bakerName: string;
  bakerAvatar: string;
  orderTime: string;
  pickupTime: string;
  estimatedTime?: string; // 预计完成时间（仅进行中状态）
  breads: BreadItem[];
  totalPrice: number;
}

// 主理人维度数据
interface BakerOrder {
  bakerId: string;
  bakerName: string;
  bakerAvatar: string;
  orders: Order[];
  totalOrders: number;
  totalAmount: number;
}

interface OrderPageProps {
  onBack: () => void;
  onBakerClick: (bakerId: string) => void;
  onNavChange: (item: NavItem) => void;
}

type ViewMode = 'order' | 'baker';

export default function OrderPage({ onBack, onBakerClick, onNavChange }: OrderPageProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('order');
  const [orders, setOrders] = useState<Order[]>(generateMockOrders(1));
  const [bakerOrders, setBakerOrders] = useState<BakerOrder[]>(generateMockBakerOrders(1));
  const [page, setPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // 评价相关状态
  const [reviewingOrderId, setReviewingOrderId] = useState<string | null>(null);
  const [orderReviews, setOrderReviews] = useState<OrderReview[]>([
    // 模拟第一个订单已有评价
    {
      orderId: 'order-1-0',
      reviews: [
        {
          breadId: 'bread-1-0-0',
          rating: 5,
          comment: '非常好吃！外皮酥脆，内部柔软，麦香味十足。师傅的手艺真的太棒了，每次都是这么稳定的高品质。我已经连续买了三周了，家人都很喜欢。特别是早餐配咖啡，简直完美。下次一定要多买几个，强烈推荐给大家！'
        }
      ]
    }
  ]);
  const [tempReviews, setTempReviews] = useState<BreadReview[]>([]);

  // 切换视图时重置
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    setPage(1);
    if (mode === 'order') {
      setOrders(generateMockOrders(1));
    } else {
      setBakerOrders(generateMockBakerOrders(1));
    }
  };

  // 获取状态显示信息
  const getStatusInfo = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return { text: '进行中', color: 'status-pending', icon: Clock };
      case 'completed':
        return { text: '已完成', color: 'status-completed', icon: CheckCircle };
      case 'cancelled':
        return { text: '已取消', color: 'status-cancelled', icon: XCircle };
    }
  };

  // 打开评价弹窗
  const handleOpenReview = (order: Order) => {
    setReviewingOrderId(order.id);
    // 初始化临时评价数据
    const existingReview = orderReviews.find(r => r.orderId === order.id);
    if (existingReview) {
      setTempReviews(existingReview.reviews);
    } else {
      setTempReviews(order.breads.map(bread => ({
        breadId: bread.id,
        rating: 0,
        comment: ''
      })));
    }
  };

  // 关闭评价弹窗
  const handleCloseReview = () => {
    setReviewingOrderId(null);
    setTempReviews([]);
  };

  // 更新评分
  const handleRatingChange = (breadId: string, rating: number) => {
    setTempReviews(prev => prev.map(review => 
      review.breadId === breadId ? { ...review, rating } : review
    ));
  };

  // 更新评价内容
  const handleCommentChange = (breadId: string, comment: string) => {
    if (comment.length <= 200) {
      setTempReviews(prev => prev.map(review => 
        review.breadId === breadId ? { ...review, comment } : review
      ));
    }
  };

  // 提交评价
  const handleSubmitReview = () => {
    if (!reviewingOrderId) return;
    
    setOrderReviews(prev => {
      const existing = prev.find(r => r.orderId === reviewingOrderId);
      if (existing) {
        return prev.map(r => 
          r.orderId === reviewingOrderId 
            ? { ...r, reviews: tempReviews }
            : r
        );
      } else {
        return [...prev, { orderId: reviewingOrderId, reviews: tempReviews }];
      }
    });
    
    handleCloseReview();
  };

  // 获取订单的评价
  const getOrderReview = (orderId: string) => {
    return orderReviews.find(r => r.orderId === orderId);
  };

  // 获取面包的评价
  const getBreadReview = (orderId: string, breadId: string) => {
    const orderReview = getOrderReview(orderId);
    return orderReview?.reviews.find(r => r.breadId === breadId);
  };

  const reviewingOrder = orders.find(o => o.id === reviewingOrderId);

  return (
    <div className="order-page">
      {/* 视图切换 */}
      <div className="order-view-toggle">
        <button
          className={`order-toggle-btn ${viewMode === 'order' ? 'active' : ''}`}
          onClick={() => handleViewModeChange('order')}
        >
          按订单
        </button>
        <button
          className={`order-toggle-btn ${viewMode === 'baker' ? 'active' : ''}`}
          onClick={() => handleViewModeChange('baker')}
        >
          按主理人
        </button>
      </div>

      {/* 订单列表 */}
      <div className="order-list-container" ref={scrollContainerRef}>
        {viewMode === 'order' ? (
          // 维度A：按订单维度
          <div className="order-list">
            {orders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;
              const hasReview = !!getOrderReview(order.id);
              
              return (
                <div key={order.id} className="order-card">
                  {/* 顶部：状态 + 主理人 */}
                  <div className="order-card-header">
                    <div className={`order-status ${statusInfo.color}`}>
                      <StatusIcon size={16} />
                      <span className="order-status-text">{statusInfo.text}</span>
                      {order.status === 'pending' && order.estimatedTime && (
                        <span className="order-estimated-time">预计 {order.estimatedTime}</span>
                      )}
                    </div>
                    <div
                      className="order-baker-info"
                      onClick={() => onBakerClick(order.bakerId)}
                    >
                      <img
                        src={order.bakerAvatar}
                        alt={order.bakerName}
                        className="order-baker-avatar"
                      />
                      <span className="order-baker-name">{order.bakerName}</span>
                    </div>
                  </div>

                  {/* 分割线 */}
                  <div className="order-divider" />

                  {/* 订单信息 */}
                  <div className="order-info-section">
                    <div className="order-info-row">
                      <span className="order-info-label">订单编号</span>
                      <span className="order-info-value">{order.orderNumber}</span>
                    </div>
                    <div className="order-info-row">
                      <span className="order-info-label">下单时间</span>
                      <span className="order-info-value">{order.orderTime}</span>
                    </div>
                  </div>

                  {/* 面包列表 */}
                  <div className="order-breads-list">
                    {order.breads.map((bread, index) => {
                      const breadReview = getBreadReview(order.id, bread.id);
                      return (
                        <div key={bread.id} className="order-bread-item-wrapper">
                          <div className="order-bread-item">
                            <div className="order-bread-image-wrapper">
                              <img
                                src={bread.image}
                                alt={bread.name}
                                className="order-bread-image"
                              />
                            </div>
                            <div className="order-bread-info">
                              <div className="order-bread-name">{bread.name}</div>
                              <div className="order-bread-price">¥{bread.price.toFixed(2)}</div>
                            </div>
                            <div className="order-bread-quantity">x{bread.quantity}</div>
                          </div>
                          {/* 显示评价 - 只在第一个面包且有评价时显示 */}
                          {index === 0 && breadReview && breadReview.comment && (
                            <div className="order-bread-review-display">
                              <div className="review-display-stars">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <Star
                                    key={star}
                                    size={14}
                                    className={star <= breadReview.rating ? 'star-filled' : 'star-empty'}
                                    fill={star <= breadReview.rating ? 'currentColor' : 'none'}
                                  />
                                ))}
                              </div>
                              <div className="review-display-comment">{breadReview.comment}</div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* 总价和评价按钮 */}
                  <div className="order-footer">
                    <div className="order-total">
                      <span className="order-total-label">订单总额</span>
                      <span className="order-total-price">¥{order.totalPrice.toFixed(2)}</span>
                    </div>
                    {order.status === 'completed' && (
                      <button 
                        className="order-review-btn"
                        onClick={() => handleOpenReview(order)}
                      >
                        {hasReview ? '修改评价' : '评价'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* 按订单底部加载中 */}
            <div className="order-loading-always">
              <Loader2 size={20} className="order-loading-icon-always" />
              <span className="order-loading-text-always">加载中</span>
            </div>
          </div>
        ) : (
          // 维度B：按主理人维度
          <div className="baker-order-list">
            {bakerOrders.map((bakerOrder) => (
              <div key={bakerOrder.bakerId} className="baker-order-card">
                {/* 主理人头部 */}
                <div
                  className="baker-order-header"
                  onClick={() => onBakerClick(bakerOrder.bakerId)}
                >
                  <img
                    src={bakerOrder.bakerAvatar}
                    alt={bakerOrder.bakerName}
                    className="baker-order-avatar"
                  />
                  <div className="baker-order-info">
                    <div className="baker-order-name">{bakerOrder.bakerName}</div>
                    <div className="baker-order-stats">
                      共<span className="baker-order-stats-num">{bakerOrder.totalOrders}</span>单 · 累计¥<span className="baker-order-stats-num">{bakerOrder.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* 分割线 */}
                <div className="baker-divider" />

                {/* 订单列表 */}
                <div className="baker-orders-container">
                  {bakerOrder.orders.map((order) => {
                    const statusInfo = getStatusInfo(order.status);
                    return (
                      <div key={order.id} className="baker-order-item">
                        {order.breads.map((bread) => (
                          <div key={bread.id} className="baker-bread-card">
                            {/* 面包信息块 */}
                            <div className="baker-bread-info-block">
                              <div className="baker-bread-image-wrapper">
                                <img
                                  src={bread.image}
                                  alt={bread.name}
                                  className="baker-bread-image"
                                />
                              </div>
                              <div className="baker-bread-details">
                                <div className="baker-bread-name">{bread.name}</div>
                                <div className="baker-bread-meta">
                                  <span className="baker-bread-price">¥{bread.price.toFixed(2)}</span>
                                  <span className="baker-bread-quantity">x{bread.quantity}</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* 订单信息块 */}
                            <div className="baker-bread-order-section">
                              <div className="baker-bread-order-info">
                                <span className="baker-bread-order-label">订单编号</span>
                                <span className="baker-bread-order-value">{order.orderNumber}</span>
                              </div>
                              <div className="baker-bread-order-info">
                                <span className="baker-bread-order-label">下单时间</span>
                                <span className="baker-bread-order-value">{order.orderTime}</span>
                              </div>
                              <div className="baker-bread-order-info">
                                <span className="baker-bread-order-label">订单状态</span>
                                <span className={`baker-bread-order-status ${statusInfo.color}`}>
                                  {statusInfo.text}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <BottomNav active="orders" onChange={onNavChange} />

      {/* 评价弹窗 */}
      {reviewingOrder && (
        <div className="review-modal-overlay" onClick={handleCloseReview}>
          <div className="review-modal" onClick={(e) => e.stopPropagation()}>
            <div className="review-modal-header">
              <h2 className="review-modal-title">评价订单</h2>
              <button className="review-modal-close" onClick={handleCloseReview}>
                <X size={24} />
              </button>
            </div>
            
            <div className="review-modal-content">
              {reviewingOrder.breads.map((bread) => {
                const review = tempReviews.find(r => r.breadId === bread.id);
                if (!review) return null;
                
                return (
                  <div key={bread.id} className="review-bread-section">
                    <div className="review-bread-header">
                      <div className="review-bread-image-wrapper">
                        <img
                          src={bread.image}
                          alt={bread.name}
                          className="review-bread-image"
                        />
                      </div>
                      <div className="review-bread-info">
                        <div className="review-bread-name">{bread.name}</div>
                        <div className="review-bread-price">¥{bread.price.toFixed(2)} x{bread.quantity}</div>
                      </div>
                    </div>
                    
                    <div className="review-rating-section">
                      <div className="review-rating-label">评分</div>
                      <div className="review-stars">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            className="review-star-btn"
                            onClick={() => handleRatingChange(bread.id, star)}
                          >
                            <Star
                              size={32}
                              className={star <= review.rating ? 'star-filled' : 'star-empty'}
                              fill={star <= review.rating ? 'currentColor' : 'none'}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="review-comment-section">
                      <div className="review-comment-label">
                        评价内容
                        <span className="review-comment-count">{review.comment.length}/200</span>
                      </div>
                      <textarea
                        className="review-comment-textarea"
                        placeholder="分享你的品尝体验吧..."
                        value={review.comment}
                        onChange={(e) => handleCommentChange(bread.id, e.target.value)}
                        maxLength={200}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="review-modal-footer">
              <button className="review-submit-btn" onClick={handleSubmitReview}>
                提交评价
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 生成模拟订单数据
function generateMockOrders(page: number): Order[] {
  const statuses: OrderStatus[] = ['pending', 'completed', 'cancelled'];
  const bakers = [
    { id: '1', name: '麦田工坊', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' },
    { id: '2', name: '小林面包屋', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
    { id: '3', name: '阿雅烘焙坊', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
  ];
  
  const breads = [
    { name: '经典法棍', image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400' },
    { name: '牛角可颂', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400' },
    { name: '全麦吐司', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
    { name: '软欧包', image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=400' },
  ];

  return Array.from({ length: 3 }, (_, i) => {
    const baker = bakers[i % bakers.length];
    const status = statuses[i % statuses.length];
    const orderBreadsCount = Math.floor(Math.random() * 3) + 1;
    const orderBreads = Array.from({ length: orderBreadsCount }, (_, j) => {
      const bread = breads[(i + j) % breads.length];
      const quantity = Math.floor(Math.random() * 3) + 1;
      const price = parseFloat((Math.random() * 20 + 10).toFixed(2));
      return {
        id: `bread-${page}-${i}-${j}`,
        name: bread.name,
        price,
        quantity,
        image: bread.image,
      };
    });

    const totalPrice = orderBreads.reduce((sum, b) => sum + b.price * b.quantity, 0);
    const date = new Date();
    date.setDate(date.getDate() - (page - 1) * 3 - i);

    return {
      id: `order-${page}-${i}`,
      orderNumber: `BW${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      status,
      bakerId: baker.id,
      bakerName: baker.name,
      bakerAvatar: baker.avatar,
      orderTime: `${date.getMonth() + 1}月${date.getDate()}日 ${String(Math.floor(Math.random() * 12) + 8).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      pickupTime: `${date.getMonth() + 1}月${date.getDate() + 1}日 09:00`,
      estimatedTime: status === 'pending' ? '明天 09:00' : undefined,
      breads: orderBreads,
      totalPrice,
    };
  });
}

// 生成模拟主理人订单数据
function generateMockBakerOrders(page: number): BakerOrder[] {
  const bakers = [
    { id: '1', name: '麦田工坊', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' },
    { id: '2', name: '小林面包屋', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
  ];

  return bakers.map((baker, i) => {
    const orders = generateMockOrders(page + i);
    const totalAmount = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    
    return {
      bakerId: baker.id,
      bakerName: baker.name,
      bakerAvatar: baker.avatar,
      orders,
      totalOrders: orders.length,
      totalAmount,
    };
  });
}