import { getSession, useSession } from "next-auth/react";

export default function Account() {
  const { data: session, status } = useSession({ required: true });

  if (status === "authenticated") {
    return <p>Signed in as {session.user.email}</p>;
  }

  return <a href="/api/auth/signin">Sign in</a>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination:
          "/api/auth/signin?error=SessionRequired&callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Faccount",
      },
    };
  }

  return {
    props: { session },
  };
}
