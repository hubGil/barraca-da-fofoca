import { useRef, useState } from "react";
import styles from "./styles.module.scss";

import { Menu } from "../../molecules/Menu";
import { BtnHamburg } from "../../atoms/BtnHamburg";

import FocusLock from "react-focus-lock";
export function Header() {
  const [open, setOpen] = useState(false);

  const menuId = "main-menu";
  return (
    <header className={styles.header_container}>
      <img src="../images/logo.png" alt="Logo barraca da fofoca" />

      <BtnHamburg open={open} setOpen={setOpen} aria-controls={menuId} />

      <Menu open={open} setOpen={setOpen} aria-controls={menuId} />
    </header>
  );
}
