export default function Button({ children, variant = "primary" }) {
  const base =
    "px-5 py-2 rounded-lg font-semibold transition duration-200";

  const styles = {
    primary: "bg-primary text-white hover:bg-blue-700",
    secondary: "bg-secondary text-black hover:bg-yellow-500",
    outline:
      "border border-primary text-primary hover:bg-primary hover:text-white",
  };

  return <button className={`${base} ${styles[variant]}`}>{children}</button>;
}
