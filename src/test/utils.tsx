/* eslint-disable react/react-in-jsx-scope */
import { MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux'
import type { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../reducers/cartSlice'
import productsReducer from '../reducers/productsSlice'

export function createTestStore() {
  return configureStore({
    reducer: {
      cart: cartReducer,
      products: productsReducer,
    },
  })
}

export function renderWithProviders(
  ui: ReactNode,
  store = createTestStore()
) {
  return render(
    <Provider store={store}>
      <MantineProvider>
        {ui}
      </MantineProvider>
    </Provider>
  )
}