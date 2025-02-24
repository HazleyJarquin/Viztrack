export default function Authayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-softGray dark:bg-[#100c0c] px-6">
      <div className="w-full md:w-[30%] rounded-lg p-4 bg-white dark:bg-[#100c0c]">
        {children}
      </div>
    </div>
  );
}
