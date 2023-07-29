import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import commonNetwork from "../../common/api/commonNetwork";
export const getOrderInformations = createAsyncThunk(
  "/orderInformations",
  async ({parameters}, { rejectWithValue }) => {
    try {
      const method = "/admin/GetCustomerOrdersByFilter";
      const test= await commonNetwork.get(method, parameters);
      const { data, errorMessage, isSuccess } = await commonNetwork.get(method, parameters);

      if (isSuccess) {
        return {data};
      } else {
        return rejectWithValue(data);
      }
    } catch (e) {
      return rejectWithValue(e.data.message);
    }
  }
);

export const orderInformationSlice = createSlice({
  name: "orderInformation",
  initialState: {
    orderInformation: [],
    totalPage: 1,
    currentPage: 1,
    limit: 10,
    totalRecords: 0,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    selectedorder : {}
  },
  reducers: {
    clearOrderState: (state) => {
      state.orderInformation = [];
      state.totalPage = 1;
      state.currentPage = 1;
      state.limit = 25;
      state.totalRecords = 0;
      state.selectedorder = {};
      state.isSuccess = true; 
      return state;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderInformations.fulfilled, (state, { payload }) => {
      state.orderInformation = JSON.parse(payload.data);
      state.currentPage = payload.currentPage || 0 ;
      state.totalPage = payload.data.length;
      state.limit = payload.limit || 0;
      state.totalRecords = payload.data.length;
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      return state;
    });
    builder.addCase(getOrderInformations.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
    });
    builder.addCase(getOrderInformations.pending, (state) => {
      state.isFetching = true;
    });
  },
});
export const { clearOrderState } = orderInformationSlice.actions;

export const orderInformationSelector = (state) => state.orderInformation;

export const orderInformationReducer = orderInformationSlice.reducer;
