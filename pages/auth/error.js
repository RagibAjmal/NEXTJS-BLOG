import { useRouter } from "next/router";

export default function Error() {
  const { error } = useRouter().query;
  return (
    <div>
      <h1>Error</h1>
      {error}
    </div>
  );
}
