import { Phone } from 'lucide-react';
import { Link } from 'react-router';
import { getTelUrl } from '../utils/validation';

export function CallAction({ className, onClick }: { className: string; onClick?: () => void }) {
  const telUrl = getTelUrl();
  const content = <><Phone className="size-4 shrink-0" aria-hidden="true" />Call Us</>;

  return telUrl ? (
    <a href={telUrl} onClick={onClick} className={className}>{content}</a>
  ) : (
    <Link to="/contact#contact-enquiry" onClick={onClick} className={className}>{content}</Link>
  );
}
