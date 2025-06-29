import Link from "next/link";

export default function RoomCard({ room }) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="font-bold text-lg">{room.name}</h2>
      <p className="text-gray-600 text-sm">{room.description}</p>
      <Link
        href={`/rooms/${room._id}`}
        className="text-blue-600 underline mt-2 inline-block"
      >
        View Queue
      </Link>
    </div>
  );
}
