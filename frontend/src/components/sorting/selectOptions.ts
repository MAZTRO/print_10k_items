import { CSSProperties } from 'react'
import StylesConfig from 'react-select'
import { sortingOptionsType } from 'src/utils/types'

export const sortingOptions: sortingOptionsType[] = [
  { value: 'nameAsc', label: 'Name ascendant ↑' },
  { value: 'nameDesc', label: 'Name descendant ↓' },
  { value: 'ageAsc', label: 'Age ascendant ↑' },
  { value: 'ageDesc', label: 'Age descendant ↓' }
]

export const SortingStyles: StylesConfig<sortingOptionsType> = {
  option: (styles: CSSProperties) => {
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
