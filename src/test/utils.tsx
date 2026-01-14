/* eslint-disable react/react-in-jsx-scope */
import { MantineProvider } from '@mantine/core'
import type { ReactNode } from 'react'
import { render } from '@testing-library/react'

export function renderWithMantine(ui: ReactNode) {
  return render(
    <MantineProvider>
      {ui}
    </MantineProvider>
  )
}