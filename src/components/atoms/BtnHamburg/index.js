import styles from "./styles.module.scss";
export function BtnHamburg({ open, setOpen, ...props }) {
  const isExpanded = open ? true : false;

  return (
    <button
      aria-label="Toggle menu"
      aria-expanded={isExpanded}
      open={open}
      onClick={() => setOpen(!open)}
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
