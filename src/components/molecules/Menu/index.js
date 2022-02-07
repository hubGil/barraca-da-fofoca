import { ActiveLink } from "../../atoms/ActiveLink";
import styles from "./styles.module.scss";
import { SignInButton } from "../../atoms/SignInButton";
export function Menu({ open, ...props }) {
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  return (
    <nav
      open={open}
      aria-hidden={!isHidden}
      {...props}
      className={`${styles.nav} ${open ? styles.nav_open : ""}`}
    >
      <ul>
        <li>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a tabIndex={tabIndex}>Home</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/famous" activeClassName={styles.active}>
            <a tabIndex={tabIndex}>Famous</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/bofe" activeClassName={styles.active}>
            <a tabIndex={tabIndex}>Bofe</a>
          </ActiveLink>
        </li>
        <li>
          <SignInButton />
        </li>
      </ul>
    </nav>
  );
}
