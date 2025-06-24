export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="p-8">{children}</main>;
}
