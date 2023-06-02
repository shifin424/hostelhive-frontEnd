import React, { useState, useEffect } from 'react';
import { RxDashboard } from 'react-icons/rx';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { TbMessages } from 'react-icons/tb';
import { BsEnvelopePaper } from 'react-icons/bs';
import { ImNewspaper } from 'react-icons/im';
import { MdOutlineReportProblem } from 'react-icons/md';
import { Layout, Menu, theme } from 'antd';

const { Sider } = Layout;

function GlobalSideBar() {
  const getItem = (label, key, icon, children) => {
    return {
      key,
      icon,
      children,
      label,
    };
  };

  const items = [
    getItem('Dashboard', '1', <RxDashboard />),
    getItem('Hostels', '2', <HiOutlineOfficeBuilding />),
    getItem('Student Request', '3', <TbMessages />),
    getItem('Vacating Letters', '4', <BsEnvelopePaper />),
    getItem('Leave Letters', '5', <ImNewspaper />),
    getItem('Complaints', '6', <MdOutlineReportProblem />),
  ];

  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!isMobile && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={value => setCollapsed(value)}
          style={{ backgroundColor: '#002D7A' }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
            style={{ backgroundColor: '#002D7A' }}
          >
            {items.map(item => (
              <Menu.Item key={item.key} icon={item.icon} style={{ color: 'white' }}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
      )}
      <Layout></Layout>
    </Layout>
  );
}

export default GlobalSideBar;
