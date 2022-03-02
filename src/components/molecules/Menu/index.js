import { ActiveLink } from "../../atoms/ActiveLink";
import styles from "./styles.module.scss";
import { SignInButton } from "../../atoms/SignInButton";
import { useSession } from "next-auth/react";
export function Menu({ open, ...props }) {
  const tabIndex = open ? 0 : -1;

  const { data: session } = useSession();

  return (
    <nav
      aria-hidden={!open}
      {...props}
      className={`${styles.nav} ${open ? styles.nav_open : ""}`}
    >
      <ul>
        <li>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a tabIndex={tabIndex}>Home</a>
          </ActiveLink>
        </li>
        {session ? (
          <li>
            <ActiveLink href="/bofe" activeClassName={styles.active}>
              <a tabIndex={tabIndex}>Bofe</a>
            </ActiveLink>
          </li>
        ) : (
          ""
        )}
        <li>
          <ActiveLink href="/about" activeClassName={styles.active}>
            <a tabIndex={tabIndex}>About</a>
          </ActiveLink>
        </li>
        <li>
          {/* TODO: fix focus */}
          <SignInButton />
        </li>
      </ul>
    </nav>
  );
}
