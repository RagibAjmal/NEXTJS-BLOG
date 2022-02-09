import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <Link href="/primereact">
        <a>
          <h1>Prime react</h1>
        </a>
      </Link>

      <main></main>
    </div>
  );
}
