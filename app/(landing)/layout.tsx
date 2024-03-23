const LandingLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  // bg-[#111827]
  return (
    <main className="h-full  overflow-auto custom-bg">
      <div className="mx-auto max-w-screen-xl h-full w-full">
        {children}
      </div>
    </main>
   );
}
 
export default LandingLayout;