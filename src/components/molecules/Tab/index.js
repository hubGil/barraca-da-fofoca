import { useState, cloneElement } from "react";
import styles from "./index.module.scss";

const Tabs = ({ ...props }) => {

  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (tabIndex) => {
    if (tabIndex !== activeIndex) {
      setActiveIndex(tabIndex);
    }
  }

  const cloneTabElement = (tab, index = 0) => {
    return (
      cloneElement(tab, {
        onClick: () => handleTabClick(index),
        tabIndex: index,
        isActive: index === activeIndex,
      })
    );
  }

  const renderActiveTabContent = () => {
    const { children } = props;

    if (children[activeIndex]) {
      return children[activeIndex].props.children;
    }
    
    return children.props?.children;
  }

  const renderChildrenTabs = () => {
    const { children } = props;
    if (!Array.isArray(children)) {
      return cloneTabElement(children);
    }

    return children.map(cloneTabElement);
  }

  const { className } = props;

  return (
    <section className={{...styles[className]}, styles.tabs}>
      <ul className={styles.tabs__list}>
        {renderChildrenTabs()}
      </ul>
      <div className={styles.tabs__content}>
        {renderActiveTabContent()}
      </div>
    </section>
  );
};

const Tab = ({ ...props }) => {

  const { className, label, isActive, onClick, tabIndex } = props;

  const tabClass = `tabs__tab ${className}`;
  const linkClass = isActive ? 'tabs__tab-link--active' : 'tabs__tab-link';

  return (
    <li key={tabIndex} className={styles[tabClass]}>
      <a className={styles[linkClass]} onClick={onClick}>{label}</a>
    </li>
  );
};

export { Tabs, Tab };