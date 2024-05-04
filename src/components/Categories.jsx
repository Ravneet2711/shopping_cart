import React, { useEffect,useState } from 'react';
import LoginForm from './LoginForm';
import {  Layout, Menu } from 'antd';
const { Header } = Layout;
import {ShoppingCartOutlined, ShoppingOutlined} from '@ant-design/icons';
import { initialCount } from '../redux/actions/catProductAction';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ModalLayout from './Modal';
import { useLocation } from 'react-router-dom';

const Categories = ({data, fetchProducts,  showLoginForm, handleLogOut}) => {
  const dispatch=useDispatch();
  const count = useSelector((state)=> state.count.totalQuantity);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation()

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(()=>{
    dispatch(initialCount(0))
  },[])
 
  const CategoryData = data.map((data)=> data[0].toUpperCase() + data.slice(1));
  const handleCategoryClick =(category)=> {
    fetchProducts(category);
  } 
 
  const items = CategoryData.map((data, index) => ({
    key: index + 1,
    label:  (
      <Link to={`/category/${data.toLowerCase()}`} key={index} className={location.pathname === `/category/${data.toLowerCase()}` ? 'active' : ''}> 
        {data}
      </Link>
    ),
    onClick: () => handleCategoryClick(data.toLowerCase()),
  }));

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      ><Link to="/products">
       <div className='logo'><ShoppingOutlined /></div>
      </Link>
         
        
          <Menu
                theme="dark"
                mode="horizontal"
                items={items}
                className='menu_items'
                style={{
                  flex: 1,
                  minWidth: 0,
                }}
              />
              <div className='cart_icon' onClick={showModal}> <span className='cart_count'>{count}</span><ShoppingCartOutlined  /></div>
            <Link to ="/login">
            <div style={{ color: "#fff", cursor: "pointer" }} onClick={handleLogOut}>Login</div>
            </Link>
        
        
      </Header>
      {showLoginForm && <LoginForm />}
      {isModalOpen && <ModalLayout showModal={showModal} isModalOpen={isModalOpen} handleModalCancel={handleCancel} handleOk={handleOk} />}
    </Layout>
  )
}

export default Categories