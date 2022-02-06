import { useRef, useState } from "react";
import styles from "./styles.module.scss";

import { Menu } from "../../molecules/Menu";
import { BtnHamburg } from "../../atoms/BtnHamburg";
import { useSession, signIn, signOut } from "next-auth/react";
// import FocusLock from "react-focus-lock";

export function Header() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const menuId = "main-menu";

  if (session) {
    return (
      <header className={styles.header_container}>
        <img src="/images/logo.png" alt="Logo barraca da fofoca" />
        <BtnHamburg open={open} setOpen={setOpen} aria-controls={menuId} />
        <Menu open={open} setOpen={setOpen} aria-controls={menuId} />
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}> Sign out</button>
      </header>
    );
  } else {
    return (
      <header className={styles.header_container}>
        <img src="/images/logo.png" alt="Logo barraca da fofoca" />
        <BtnHamburg open={open} setOpen={setOpen} aria-controls={menuId} />
        <Menu open={open} setOpen={setOpen} aria-controls={menuId} />
        Not signed in <br />
        <button onClick={() => signIn()}> Sign in</button>
      </header>
    );
  }
}
