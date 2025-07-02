import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Link href="/register">Cadastro</Link>
      <Link href="/login">Login</Link>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
