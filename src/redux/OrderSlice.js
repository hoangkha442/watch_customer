// redux/OrderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserServices } from '../services/UserService';

// Existing thunks
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserServices.getOrder();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOrderShipped = createAsyncThunk(
  'orders/fetchOrderShipped',
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserServices.getOrder();
      return response.data.filter(order => order.status === 'shipped');
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOrderCanceled = createAsyncThunk(
  'orders/fetchOrderCanceled',
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserServices.getOrder();
      return response.data.filter(order => order.status === 'Cancel');
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOrderPending = createAsyncThunk(
  'orders/fetchOrderPending',
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserServices.getOrder();
      return response.data.filter(order => order.status === 'pending');
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// New thunk for updating order status
export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      await UserServices.putStatusOrder(orderId, { status });
      return { orderId, status };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    deliveredOrders: [],
    shippedOrders: [],
    canceledOrders: [],
    pendingOrders: [], 
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const orders = action.payload;
        state.deliveredOrders = orders.filter(order => order.status === 'delivered');
        state.shippedOrders = orders.filter(order => order.status === 'shipped');
        state.canceledOrders = orders.filter(order => order.status === 'canceled');
        state.pendingOrders = orders.filter(order => order.status === 'pending');
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.error : null;
      })
      .addCase(fetchOrderShipped.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderShipped.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shippedOrders = action.payload;
      })
      .addCase(fetchOrderShipped.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.error : null;
      })
      .addCase(fetchOrderCanceled.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderCanceled.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.canceledOrders = action.payload;
      })
      .addCase(fetchOrderCanceled.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.error : null;
      })
      .addCase(fetchOrderPending.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderPending.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pendingOrders = action.payload;
      })
      .addCase(fetchOrderPending.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.error : null;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { orderId, status } = action.payload;
        // Update the order in the appropriate list
        const updateOrderList = (orders) =>
          orders.map(order => (order.order_id === orderId ? { ...order, status } : order));
        state.deliveredOrders = updateOrderList(state.deliveredOrders);
        state.shippedOrders = updateOrderList(state.shippedOrders);
        state.canceledOrders = updateOrderList(state.canceledOrders);
        state.pendingOrders = updateOrderList(state.pendingOrders);
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.error : null;
      });
  },
});

export default orderSlice.reducer;
