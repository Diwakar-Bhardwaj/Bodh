export default function LotusIcon({ size = 24, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M32 10C26 18 24 26 24 34C24 42 28 50 32 54C36 50 40 42 40 34C40 26 38 18 32 10Z" />
      <path d="M20 20C12 28 10 38 18 46C24 40 24 30 20 20Z" />
      <path d="M44 20C40 30 40 40 46 46C54 38 52 28 44 20Z" />
      <path d="M10 34C16 34 22 38 24 44C16 46 10 42 10 34Z" />
      <path d="M54 34C48 34 42 38 40 44C48 46 54 42 54 34Z" />
    </svg>
  );
}