"use client";
export default function QueueList({ queue, onCancel }) {
  return (
    <ul className="mt-4">
      {queue.map((q) => (
        <li key={q._id} className="border p-2 my-2 flex justify-between items-center">
          <span>
            {q.userId.name} - {q.status} - #{q.placeInQueue}
          </span>
          <button
            className="text-red-600"
            onClick={() => onCancel(q._id)}
          >
            Cancel
          </button>
        </li>
      ))}
    </ul>
  );
}
