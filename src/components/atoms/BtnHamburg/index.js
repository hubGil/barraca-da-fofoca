import styles from "./styles.module.scss";
export function BtnHamburg({ open, setopen, ...props }) {
  const isExpanded = open ? true : false;

  return (
    <button
      aria-label="Toggle menu"
      aria-expanded={isExpanded}
      onClick={() => setopen(!open)}
      {...props}
      className={`${styles.buttonContainer} ${
        open ? "" : styles.buttonContainer_open
      } `}
    >
      <span />
      <span />
      <span />
    </button>
  );
}
