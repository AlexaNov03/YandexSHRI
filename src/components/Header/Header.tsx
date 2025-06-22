import { Logo } from "./components/Logo/Logo";
import { NavPanel } from "./components/NavPanel/NavPanel";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header__container}>
      <Logo />
      <NavPanel />
    </header>
  );
};
