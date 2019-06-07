export default {
  async getData() {
    const res = await fetch('/api/drawings');
    const data = await res.json();
    return data;
  },

  async getDataById(id) {
    const res = await fetch(`/api/drawings/${id}`);
    const data = await res.json();
    return data;
  },

  async addDrawing(drawing) {
    const res = await fetch('/api/drawings', {
      method: 'POST',
      body: JSON.stringify(drawing),
      headers: { 'Content-Type': 'application/json' },
    });
    const id = res.text();
    return id;
  },
};
