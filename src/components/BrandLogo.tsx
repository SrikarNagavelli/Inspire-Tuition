import { useState } from 'react';
import { Link } from 'react-router';
import { businessConfig } from '../config/businessConfig';

interface BrandLogoProps {
  placement: 'header' | 'footer';
  onClick?: () => void;
}

export function BrandLogo({ placement, onClick }: BrandLogoProps) {
  const [imageError, setImageError] = useState(false);
  const { brand } = businessConfig;

  return (
    <Link
      to="/"
      aria-label={`${brand.name} home`}
      onClick={onClick}
      className={`brand-logo brand-logo--${placement}`}
    >
      {imageError ? (
        <span className="font-display text-sm font-bold leading-tight text-[#102A43]">{brand.shortName}</span>
      ) : (
        <span className="brand-logo-mark">
          <img
            src={brand.logoUrl}
            alt={brand.logoAlt}
            width={1046}
            height={375}
            loading={placement === 'footer' ? 'lazy' : undefined}
            onError={() => setImageError(true)}
          />
        </span>
      )}
    </Link>
  );
}
