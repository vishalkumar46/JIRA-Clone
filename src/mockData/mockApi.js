export const columns = [
  { id: "task", label: "Task", minWidth: 40, isSorting: true },
  { id: "email", label: "Assigned To", minWidth: 100, isSorting: true },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    isSorting: true,
  },
  {
    id: "priority",
    label: "Priority",
    minWidth: 170,
    isSorting: true,
  },
  {
    id: "startDate",
    label: "Start Date",
    minWidth: 170,
  },
  {
    id: "endDate",
    label: "End Date",
    minWidth: 170,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "center",
  },
];

function createData(task, email, status, priority, startDate, endDate) {
  return { task, email, status, priority, startDate, endDate };
}
export const rows = [
  createData(1, "user1@gmail.com", "Open", "High", "09-20-2024", "09-23-2024"),
  createData(
    2,
    "user2@gmail.com",
    "In-progress",
    "Low",
    "09-25-2024",
    "09-28-2024"
  ),
];
