export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="admin-layout min-h-screen bg-background text-foreground selection:bg-[#00F5FF] selection:text-black">
      {children}
    </div>
  );
}
