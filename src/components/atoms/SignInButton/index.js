import { FiX } from "react-icons/fi";
import { useSession, signIn, signOut } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import styles from "./index.module.scss";

export function SignInButton() {
  const { data: session } = useSession();

  return session ? (
    <button
      className={styles.buttonContainer}
      onClick={() => signOut("github")}
    >
      <FaGithub color="#fff" size={24} />
      {session.user.name}
      <FiX color="#fff" size={24} className={styles.closeIcon}></FiX>
    </button>
  ) : (
    <button
      type="button"
      className={styles.buttonContainer}
      onClick={() => signIn("github")}
    >
      {" "}
      <FaGithub color="#fff" size={24} />
      Signin
    </button>
  );
}
