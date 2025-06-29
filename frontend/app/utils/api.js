
export const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const join_queue = async (queueId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/queue/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ queueId }),
    });

    if (!response.ok) {
      throw new Error(`Error joining queue: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("join_queue error:", error);
    throw error;
  }
}

export const leave_queue = async (queueId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/queue/leave`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ queueId }),
    });

    if (!response.ok) {
      throw new Error(`Error leaving queue: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("leave_queue error:", error);
    throw error;
  }
}

export const get_rooms = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/room/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      console.error(`Error fetching rooms: ${data.message}`);
    }

    return data;
  } catch (error) {
    console.error("get_rooms error:", error);
    throw error;
  }
};

export const get_room = async (roomId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/room/${roomId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("get_room error:", error);
    throw error;
  }
}

export const create_room = async (roomData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/room/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(roomData),
    });

    if (!response.ok) {
      throw new Error(`Error creating room: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("create_room error:", error);
    throw error;
  }
}