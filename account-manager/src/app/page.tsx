import HomePage from "@/pages/home";
import { auth, login } from "@/utils/auth/actions";


export default async function Home() {
  const user = await auth();

  if (!user) {
    await login();
  }

  return (
    <HomePage/>
  );
}
