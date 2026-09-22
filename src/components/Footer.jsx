export default function Footer() {
  return (
    <footer className="mt-auto bg-slate-900 py-4 text-center text-white">
      <p>
        © {new Date().getFullYear()} Bodh. All rights reserved.
      </p>
    </footer>
  );
}