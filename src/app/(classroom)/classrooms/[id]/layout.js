import Home from "@/components/layout/dashboard/home";

export default function DashLayout({ children, params }) {
  return (
    <main>
      <Home values={params}>{children}</Home>
    </main>
  );
}
