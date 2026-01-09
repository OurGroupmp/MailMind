const API_BASE = "https://mailmind-ezlf.onrender.com/api";

export const fetchEmails = async () => {
  const res = await fetch(`${API_BASE}/emails`);
  if (!res.ok) throw new Error("Failed to fetch emails");
  return res.json();
};

export const fetchEmailById = async (id) => {
  const res = await fetch(`${API_BASE}/emails/${id}`);
  if (!res.ok) throw new Error("Failed to fetch email");
  return res.json();
};

export const updateEmailCategory = async (id, userCategory) => {
  const res = await fetch(`${API_BASE}/emails/${id}/category`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userCategory }),
  });
  if (!res.ok) throw new Error("Failed to update category");
  return res.json();
};

const BASE_URL = "https://mailmind-ezlf.onrender.com/api";

export async function fetchAnalytics() {
  const res = await fetch(`${BASE_URL}/analytics`);
  if (!res.ok) {
    throw new Error("Failed to fetch analytics");
  }
  return res.json();
}
