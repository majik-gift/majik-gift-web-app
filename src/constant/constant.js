import {
  AddCircle,
  Block,
  Cached,
  Cancel,
  CheckCircle,
  CompareArrows,
  EditNote,
  LocalShipping,
  MarkEmailRead,
  PendingActions,
  ThumbUp,
} from "@mui/icons-material";

export let status = {
  fulfilled: { label: "Fulfilled", color: "#607D8B", icon: EditNote }, // Darker Blue Grey
  draft: { label: "Draft", color: "#607D8B", icon: EditNote }, // Darker Blue Grey
  pending_approval: {
    label: "Pending",
    color: "#F4A460",
    icon: PendingActions,
  },
  approved: { label: "Approved", color: "#4CAF50", icon: CheckCircle },
  completed: { label: "Completed", color: "#2E7D32", icon: CheckCircle },
  rejected: { label: "Rejected", color: "#E57373", icon: Cancel },
  canceled: { label: "Canceled", color: "#F4A460", icon: Cancel },
  cancelled: { label: "Canceled", color: "#F4A460", icon: Cancel },
  in_active: { label: "In Active", color: "#757575", icon: Block }, // Darker Grey
  inactive: { label: "In Active", color: "#757575", icon: Block },
  active: { label: "Active", color: "#4CAF50", icon: CheckCircle },
  in_transaction: {
    label: "In Transaction",
    color: "#1976D2",
    icon: CompareArrows,
  },
  in_progress: { label: "In Progress", color: "#7B1FA2", icon: Cached },
  delivered: { label: "Delivered", color: "#0097A7", icon: LocalShipping },
  received: { label: "Received", color: "#388E3C", icon: MarkEmailRead },
  created: { label: "Created", color: "#388E3C", icon: AddCircle },
  accepted: { label: "Accepted", color: "#4CAF50", icon: ThumbUp },
  pending: { label: "Pending", color: "#F4A460" }, // SandyBrown - darker shade that works better with white text
  inprogress: { label: "Inprogress", color: "#F4A460" }, // SandyBrown - darker shade that works better with white text
  success: { label: "Success", color: "#4CAF50" },
  failed: { label: "Failed", color: "#E57373" },
  REVERSED: { label: "Reversed", color: "#E57373" },
  paid: { label: "Paid", color: "#4CAF50" },
  total_count: { label: "Total", color: "#1976D2" }, // Darker Sky blue
  incomplete_expired: { label: "Incomplete", color: "#E57373" },
};
