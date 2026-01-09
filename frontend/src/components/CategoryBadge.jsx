export default function CategoryBadge({ category }) {
  const styles = {
    Work: "bg-emerald-400/20 text-emerald-300 border-emerald-400/30",
    Personal: "bg-blue-400/20 text-blue-300 border-blue-400/30",
    Promotions: "bg-yellow-400/20 text-yellow-300 border-yellow-400/30",
    Spam: "bg-red-400/20 text-red-300 border-red-400/30",
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-medium border rounded-full ${
        styles[category]
      }`}
    >
      {category}
    </span>
  );
}
