import { Text } from "../../../Text/Text";
import { AnaliticIcon } from "../AnaliticIcon/AnaliticIcon";
import { GeneratorIcon } from "../GeneratorIcon/GeneratorIcon";
import { HeaderButton } from "../HeaderButton/HeaderButton";
import { HistoryIcon } from "../HistoryIcon/HistoryIcon";
import styles from "./NavPanel.module.css";
import { Link } from "react-router";

export const NavPanel = () => {
  return (
    <nav className={styles.nav__container}>
      <ul>
        <li>
          <Link to={`/`}>
            <HeaderButton leftIcon={<AnaliticIcon width={25} height={25} />}>
              <Text fontWeight={400} fontSize="20px" tag="div" color="primary">
                CSV Аналитик
              </Text>
            </HeaderButton>
          </Link>
        </li>
        <li>
          <Link to={`/generator`}>
            <HeaderButton leftIcon={<GeneratorIcon width={25} height={25} />}>
              <Text fontWeight={400} fontSize="20px" tag="div" color="primary">
                CSV Генератор
              </Text>
            </HeaderButton>
          </Link>
        </li>
        <li>
          <Link to={`/history`}>
            <HeaderButton leftIcon={<HistoryIcon width={25} height={25} />}>
              <Text fontWeight={400} fontSize="20px" tag="div" color="primary">
                История
              </Text>
            </HeaderButton>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
