import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

export interface Car {
  name: string
  cost: number
  id?: string
}

export interface CarState {
  searchTerm: string
  data: Car[]
}

const initialState: CarState = {
  searchTerm: '',
  data: [],
}
const carsSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    changeSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload
    },
    addCar(state, action: PayloadAction<Car>) {
      state.data.push({
        name: action.payload.name,
        cost: action.payload.cost,
        id: nanoid(),
      })
    },
    removeCar(state, action: PayloadAction<string>) {
      //   const carToRemove = state.cars.filter(
      //     (item: any) => item.id === action.payload.id
      //   );
      //   const index = state.cars.indexOf(carToRemove[0]);
      //   state.cars.splice(index, 1);
      const updatedCars = state.data.filter(
        (item: Car) => item.id !== action.payload
      )
      state.data = updatedCars
    },
  },
})

export const { changeSearchTerm, addCar, removeCar } = carsSlice.actions
export const carsReducer = carsSlice.reducer
