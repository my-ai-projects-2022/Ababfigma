import React, { useEffect, useRef, useState } from 'react';
import type { Baker } from './BakerCard';

interface MapViewProps {
  bakers: Baker[];
  onBakerClick: (id: string) => void;
}

// 成都市中心坐标
const CHENGDU_CENTER = [104.066, 30.572];

// 为每个主理人分配成都周边的坐标
const BAKER_LOCATIONS: Record<string, [number, number]> = {
  '1': [104.072, 30.575], // 春熙路附近
  '2': [104.088, 30.567], // 建设路附近
  '3': [104.055, 30.585], // 金牛区
  '4': [104.045, 30.560], // 青羊区
  '5': [104.080, 30.550], // 武侯区
  '6': [104.095, 30.590], // 成华区
};

export default function MapView({ bakers, onBakerClick }: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // 检查高德地图是否加载
  useEffect(() => {
    const checkAMapLoaded = () => {
      if ((window as any).AMap) {
        setIsMapLoaded(true);
        setMapError(null);
      } else {
        // 等待地图加载
        const timer = setTimeout(() => {
          if (!(window as any).AMap) {
            setMapError('高德地图加载超时，请检查网络连接或 API Key 是否正确');
          }
        }, 5000);

        return () => clearTimeout(timer);
      }
    };

    // 立即检查
    checkAMapLoaded();

    // 如果还没加载，监听 window 加载事件
    if (!(window as any).AMap) {
      window.addEventListener('load', checkAMapLoaded);
      return () => window.removeEventListener('load', checkAMapLoaded);
    }
  }, []);

  useEffect(() => {
    // 检查是否已加载高德地图
    if (!isMapLoaded || !(window as any).AMap) {
      return;
    }

    // 初始化地图
    if (mapContainerRef.current && !mapRef.current) {
      const AMap = (window as any).AMap;
      
      try {
        mapRef.current = new AMap.Map(mapContainerRef.current, {
          zoom: 13,
          center: CHENGDU_CENTER,
          viewMode: '2D',
          mapStyle: 'amap://styles/whitesmoke', // 浅色主题
        });

        // 添加缩放控件
        mapRef.current.addControl(new AMap.Scale());
        mapRef.current.addControl(new AMap.ToolBar({
          position: {
            top: '20px',
            right: '20px',
          },
        }));
      } catch (error) {
        console.error('地图初始化失败:', error);
        setMapError('地图初始化失败，请检查 API Key 配置');
      }
    }

    // 清除旧标记
    if (markersRef.current.length > 0) {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    }

    // 添加新标记
    if (mapRef.current && bakers.length > 0) {
      const AMap = (window as any).AMap;
      
      bakers.forEach((baker) => {
        const position = BAKER_LOCATIONS[baker.id] || CHENGDU_CENTER;
        
        // 创建自定义标记内容
        const markerContent = document.createElement('div');
        markerContent.className = 'custom-marker';
        markerContent.innerHTML = `
          <div class="marker-wrapper ${baker.isOpen ? 'open' : 'closed'}">
            <div class="marker-avatar-wrapper">
              <img src="${baker.avatar}" alt="${baker.name}" class="marker-avatar" />
              <div class="marker-status-dot ${baker.isOpen ? 'active' : ''}"></div>
            </div>
            <div class="marker-info">
              <div class="marker-name">${baker.name}</div>
              <div class="marker-distance">${baker.distance}km</div>
            </div>
          </div>
        `;

        const marker = new AMap.Marker({
          position: position,
          content: markerContent,
          offset: new AMap.Pixel(-40, -60),
        });

        // 点击标记事件
        marker.on('click', () => {
          onBakerClick(baker.id);
        });

        marker.setMap(mapRef.current);
        markersRef.current.push(marker);

        // 创建信息窗口
        const infoWindow = new AMap.InfoWindow({
          content: `
            <div class="info-window">
              <div class="info-header">
                <h3 class="info-name">${baker.name}</h3>
                <span class="info-status ${baker.isOpen ? 'open' : 'closed'}">
                  ${baker.isOpen ? '营业中' : '休息中'}
                </span>
              </div>
              <div class="info-breads">
                ${baker.breads.slice(0, 3).map(bread => 
                  `<span class="info-bread">${bread}</span>`
                ).join('')}
              </div>
              <div class="info-distance">距离 ${baker.distance}km</div>
            </div>
          `,
          offset: new AMap.Pixel(0, -60),
        });

        // 点击标记显示信息窗口
        marker.on('click', () => {
          infoWindow.open(mapRef.current, position);
        });
      });

      // 自适应显示所有标记
      if (markersRef.current.length > 0) {
        mapRef.current.setFitView(markersRef.current);
      }
    }

    return () => {
      // 组件卸载时清理标记
      if (markersRef.current.length > 0) {
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
      }
    };
  }, [bakers, onBakerClick, isMapLoaded]);

  return (
    <div className="map-view-container">
      {!isMapLoaded && !mapError && (
        <div className="map-loading">
          <div className="loading-spinner"></div>
          <p className="loading-text">地图加载中...</p>
        </div>
      )}
      
      {mapError && (
        <div className="map-error">
          <p className="error-icon">⚠️</p>
          <h3 className="error-title">地图加载失败</h3>
          <p className="error-text">{mapError}</p>
          <p className="error-hint">
            请检查：<br/>
            1. 网络连接是否正常<br/>
            2. API Key 是否有效<br/>
            3. 是否配置了安全密钥（securityJsCode）
          </p>
          <p className="error-hint">
            配置说明: <a href="https://lbs.amap.com/api/javascript-api-v2/guide/abc/prepare" target="_blank" rel="noopener noreferrer">高德地图开发指南</a>
          </p>
        </div>
      )}
      
      <div 
        ref={mapContainerRef} 
        className="map-container"
        style={{ display: isMapLoaded && !mapError ? 'block' : 'none' }}
      />
    </div>
  );
}