import { Button } from "@/components/ui/button"

const protocols = ['TCP', 'UDP', 'HTTP', 'DNS', 'ICMP']

interface FilterKeysProps {
  onFilterChange: (filter: string) => void
  activeFilter: string
}

export default function FilterKeys({ onFilterChange, activeFilter }: FilterKeysProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button 
        onClick={() => onFilterChange('')} 
        variant={activeFilter === '' ? 'default' : 'outline'}
        className={activeFilter === '' ? 'bg-blue-500 hover:bg-blue-600 text-white' : ''}
      >
        All
      </Button>
      {protocols.map(protocol => (
        <Button 
          key={protocol} 
          onClick={() => onFilterChange(protocol)} 
          variant={activeFilter === protocol ? 'default' : 'outline'}
          className={activeFilter === protocol ? 'bg-blue-500 hover:bg-blue-600 text-white' : ''}
        >
          {protocol}
        </Button>
      ))}
    </div>
  )
}

