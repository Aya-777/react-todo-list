const BASE_URL = import.meta.env.VITE_MOCKAPI_BASE_URL;

export const api = {
  todos: {
    async getAll(params = {}) {
      const searchParams = new URLSearchParams(params).toString();
      
      return fetch(`${BASE_URL}/todos?${searchParams}`, {
        method: "GET",
        headers: { "content-type": "application/json" },
      })
        .then((res) => {
          if(res.ok) return res.json();
          if(res.status === 404) return [];
        })
      },

    async create(data) {
      return fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newTodo)
    })
      .then((res) => !!res.ok && res.json())
    },

    async update(id, data) {
      return fetch(`${BASE_URL}/todos/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => !!res.ok && res.json())
    },

    async delete(id) {
      return fetch(`${BASE_URL}/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => !!res.ok && res.json())
    },
  },
}