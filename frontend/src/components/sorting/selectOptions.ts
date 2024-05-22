import { StylesConfig } from 'react-select'

type sortingOptions = {
  value: string
  label: string
}

export const sortingOptions: sortingOptions[] = [
  { value: 'nameAsc', label: 'Name ascendant ↑' },
  { value: 'nameDesc', label: 'Name descendant ↓' },
  { value: 'ageAsc', label: 'Age ascendant ↑' },
  { value: 'ageDesc', label: 'Age descendant ↓' }
]

export const SortingStyles: StylesConfig<sortingOptions> = {
  option: (styles) => {
    return {
      ...styles,
      borderRadius: '5px',
      backgroundColor: '#0000',
      color: 'var(--color-white)',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'var(--color-white)',
        color: 'var(--color-black)'
      }
    }
  }
}
