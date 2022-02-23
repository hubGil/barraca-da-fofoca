import { useRef, useState } from "react";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { Menu } from "../../molecules/Menu";
import { BtnHamburg } from "../../atoms/BtnHamburg";
import { useRouter } from "next/router";

// import FocusLock from "react-focus-lock";

export function Header() {
  const [open, setOpen] = useState(false);

  const menuId = "main-menu";

  const { events }= useRouter()

  useEffect(() => {
    events.on("routeChangeComplete", () => {setOpen(false)})
  }, [events])

  return (
    <header className={styles.header_container}>
      <img src="/images/logo.png" alt="Logo barraca da fofoca" />
      <BtnHamburg open={open} setopen={setOpen} aria-controls={menuId} />
      <Menu open={open} aria-controls={menuId} />
    </header>
  );
}
