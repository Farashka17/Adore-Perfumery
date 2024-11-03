import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const initialState={
    products:[],
    loading:false
  }

 export const getProducts = createAsyncThunk(
    'products',
    // Declare the type your function argument here:
    async () => {
      const response = await fetch(`https://lodalhost:3000/products`)
     
      return (await response.json()) 
    },
  )
  
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {  },
  extraReducers:(builder)=>{
    builder.addCase(getProducts.pending, (state,action)=>{
    state.loading =true
    })
    builder.addCase(getProducts.fulfilled, (state,action)=>{
        state.loading =false,
        state.products = action.payload
        })
  }
})

export const {  } = productSlice.actions

export default productSlice.reducer