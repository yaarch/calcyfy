import React from 'react';
import { useApp } from '../../context/AppContext';

interface AppLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  title?: string;
  activeClassName?: string;
  hrefLang?: string;
  hreflang?: string;
}

export const AppLink: React.FC<AppLinkProps> = ({
  href,
  children,
  className = '',
  onClick,
  activeClassName = '',
  hrefLang,
  hreflang,
  ...props
}) => {
  const { navigateTo } = useApp();
  const effectiveHrefLang = hrefLang ?? hreflang;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If custom onClick was provided, let it run
    if (onClick) {
      onClick(e);
    }

    // Allow default browser behavior for modifier keys or external links
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.altKey ||
      e.shiftKey ||
      props.target === '_blank' ||
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')
    ) {
      return;
    }

    // Prevent full page reload for internal links and navigate via AppContext SPA routing
    e.preventDefault();
    navigateTo(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      hrefLang={effectiveHrefLang}
      {...props}
    >
      {children}
    </a>
  );
};
