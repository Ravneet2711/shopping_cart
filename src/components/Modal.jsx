import React from 'react';
import { Modal } from "antd";
import CartItem from './CartItem';

const ModalLayout= ({handleOk, isModalOpen ,  handleModalCancel}) => {

  return (
    <>
      <Modal title="Cart" open={isModalOpen} onOk={handleOk} onCancel={handleModalCancel}>
          <CartItem/>
        </Modal>
    </>
  )
}

export default ModalLayout