import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserServices } from '../services/UserService';

// Existing thunks
export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await UserServices.getOrder();
            return response.data.filter(order => order.status === 'delivered');
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

// New thunk for pending orders
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

// Slice
const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        deliveredOrders: [],
        shippedOrders: [],
        canceledOrders: [],
        pendingOrders: [], // Add pending orders
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Existing cases
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.deliveredOrders = action.payload;
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
            // New case for pending orders
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
            });
    },
});

export default orderSlice.reducer;
