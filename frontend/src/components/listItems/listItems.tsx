import { Sorting } from 'components/sorting/sorting'
import { Printer } from './printer'

export const ListItems = () => {
  return (
    <section className='listContainer w-full h-full flex flex-col'>
      <Sorting />
      <Printer />
    </section>
  )
}
