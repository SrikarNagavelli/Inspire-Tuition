export function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <img
      src="/assets/whatsapp.svg"
      alt=""
      width={18}
      height={18}
      className={`size-[18px] shrink-0 object-contain ${className}`}
    />
  );
}
