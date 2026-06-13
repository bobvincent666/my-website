import {useEffect, useRef, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import {codexGuideNavItems, type CodexGuideNavItem} from '@site/src/data/codexGuideTopic';
import styles from './styles.module.css';

type CodexGuideTopicNavProps = {
  activeKey?: string;
};

function isActive(item: CodexGuideNavItem, activeKey?: string) {
  return item.key === activeKey;
}

export default function CodexGuideTopicNav({activeKey}: CodexGuideTopicNavProps): ReactNode {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenKey(null);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const renderItem = (item: CodexGuideNavItem) => {
    if (item.items?.length) {
      const expanded = openKey === item.key;

      return (
        <div key={item.key} className={styles.dropdown}>
          <button
            type="button"
            className={clsx(styles.topicNavItem, styles.dropdownTrigger, expanded && styles.dropdownTriggerOpen)}
            aria-expanded={expanded}
            onClick={() => setOpenKey(expanded ? null : item.key)}>
            <span>{item.label}</span>
            <span className={clsx(styles.dropdownCaret, expanded && styles.dropdownCaretOpen)} aria-hidden="true" />
          </button>
          {expanded ? (
            <div className={styles.dropdownPanel}>
              {item.items.map((subItem) => (
                <Link
                  key={subItem.to}
                  to={subItem.to}
                  className={styles.dropdownItem}
                  onClick={() => setOpenKey(null)}>
                  {subItem.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      );
    }

    if (item.to) {
      return (
        <Link
          key={item.key}
          to={item.to}
          className={clsx(styles.topicNavItem, isActive(item, activeKey) && styles.topicNavItemActive)}
          activeClassName={styles.topicNavItemActive}>
          {item.label}
        </Link>
      );
    }

    return (
      <Link
        key={item.key}
        to={item.href!}
        className={clsx(styles.topicNavItem, isActive(item, activeKey) && styles.topicNavItemActive)}>
        {item.label}
      </Link>
    );
  };

  return (
    <div className={styles.topicNavShell}>
      <div ref={navRef} className={clsx(styles.topicNav, 'container')}>
        {codexGuideNavItems.map(renderItem)}
      </div>
    </div>
  );
}
