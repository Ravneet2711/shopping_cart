import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { BASE_URL } from '../constants/constant';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm(); 
  const [loading, setLoading] = useState(false); 

  const onFinish = () => {
    setLoading(true);
    axios.post(`${BASE_URL}/auth/login`, {
                username: "mor_2314",
                password: "83r5^_"    
              })
      .then(response => {
        if (response.data) {
          const token = response.data.token;
          localStorage.setItem('jsonwebtoken', token);
          console.log(token);
          form.resetFields(); 
          navigate('/');
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form} 
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      className='form'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <h1 style={{ textAlign: 'center', paddingBottom: "20px" }}>Login Form</h1>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm;
