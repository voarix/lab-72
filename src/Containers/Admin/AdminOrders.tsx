import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectOrders, selectFetchLoading, selectDeleteLoading } from "../../store/orders/ordersSlice.ts";
import { deleteOrder, fetchOrders } from "../../store/orders/ordersThunks.ts";
import Spinner from "../../UI/Spinner/Spinner.tsx";
import AdminOrderItem from "../../components/Admin/AdminOrderItem.tsx";
import { selectDishes } from "../../store/dishes/dishesSlice.ts";

const AdminOrders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const fetchLoading = useAppSelector(selectFetchLoading);
  const deleteLoading = useAppSelector(selectDeleteLoading);
  const dishes = useAppSelector(selectDishes);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const onDeleteOrder = async (orderId: string) => {
    await dispatch(deleteOrder(orderId));
    dispatch(fetchOrders());
  };

  const ordersContent = Object.keys(orders).map((orderId) => (
    <AdminOrderItem
      key={orderId}
      orderId={orderId}
      order={orders[orderId]}
      onComplete={onDeleteOrder}
      deletingLoading={deleteLoading}
      dishes={dishes}
    />
  ));

  if (fetchLoading) {
    return <Spinner/>;
  }

  if (Object.keys(orders).length === 0) {
    return (
      <p>No orders yet</p>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className='mb-5'>Orders</h2>
      {ordersContent}
    </div>
  );
};

export default AdminOrders;