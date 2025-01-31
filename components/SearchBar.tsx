import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

interface SearchBarProps {
  onSearch: (search: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        type="text"
        placeholder="Search packets..."
        className="pl-8"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}

