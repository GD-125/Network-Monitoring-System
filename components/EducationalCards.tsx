import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const educationalContent = [
  {
    title: "IP (Internet Protocol)",
    description: "The fundamental protocol for routing and addressing packets of data across networks."
  },
  {
    title: "TCP (Transmission Control Protocol)",
    description: "Provides reliable, ordered, and error-checked delivery of data between applications."
  },
  {
    title: "UDP (User Datagram Protocol)",
    description: "A connectionless protocol for sending messages without requiring prior communication setup."
  },
  {
    title: "HTTP (Hypertext Transfer Protocol)",
    description: "An application-layer protocol for transmitting hypermedia documents, such as HTML."
  },
  {
    title: "DNS (Domain Name System)",
    description: "A hierarchical naming system for computers, services, or resources connected to the Internet."
  },
  {
    title: "Network Security",
    description: "Practices and policies adopted to prevent and monitor unauthorized access, misuse, modification, or denial of computer network and network-accessible resources."
  }
]

export default function EducationalCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-8">
      {educationalContent.map((content, index) => (
        <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-pink-600">{content.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{content.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

