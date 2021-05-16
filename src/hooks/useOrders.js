import {useEffect, useState} from 'react';
import {useStorage} from '../contexts/storage/storageContext';

const useOrders = () => {
  const {orderId, fetchOrders} = useStorage();
  const [time, setTime] = useState(0);
  const [orderCompleted, setOrderCompleted] = useState(false);

  useEffect(() => {
    const getOrdersRef = () => {
      const orderRef = fetchOrders(orderId);
      orderRef.onSnapshot(function (doc) {
        setTime(doc.data().deliveryTime);
        setOrderCompleted(doc.data().completed);
      });
    };
    getOrdersRef();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    time,
    orderCompleted,
  };
};

export default useOrders;
