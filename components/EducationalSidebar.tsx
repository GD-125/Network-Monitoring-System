export default function EducationalSidebar() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Networking Concepts</h2>
      <ul className="space-y-2">
        <li>
          <strong>IP (Internet Protocol):</strong> The fundamental protocol for routing and addressing packets of data so that they can travel across networks and arrive at the correct destination.
        </li>
        <li>
          <strong>TCP (Transmission Control Protocol):</strong> Provides reliable, ordered, and error-checked delivery of a stream of bytes between applications running on hosts communicating over an IP network.
        </li>
        <li>
          <strong>UDP (User Datagram Protocol):</strong> A connectionless protocol that allows for sending messages (datagrams) to other hosts on an IP network without requiring prior communications to set up special transmission channels or data paths.
        </li>
        <li>
          <strong>HTTP (Hypertext Transfer Protocol):</strong> An application-layer protocol for transmitting hypermedia documents, such as HTML. It was designed for communication between web browsers and web servers.
        </li>
        <li>
          <strong>DNS (Domain Name System):</strong> A hierarchical and decentralized naming system for computers, services, or other resources connected to the Internet or a private network.
        </li>
      </ul>
    </div>
  )
}

