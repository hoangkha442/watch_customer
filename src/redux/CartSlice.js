import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserServices } from '../services/UserService';

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (product, { getState, rejectWithValue }) => {
    const state = getState();
    if (!state.user.userInfo) {
      return rejectWithValue('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.');
    }
    await UserServices.addToCart(product);
    return product;
  }
);

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    if (!state.user.userInfo) {
      return rejectWithValue('Bạn cần đăng nhập để xem giỏ hàng.');
    }
    try {
      const response = await UserServices.getCartByUserId();
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default cartSlice.reducer;
