import Pagination from './components/Pagination'

export default function Home() {
  return (
    <div>
      <Pagination currentPage={1} pageSize={4} itemsCount={23} />
    </div>
  )
}
