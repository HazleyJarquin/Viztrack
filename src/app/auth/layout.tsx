export default function Authayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-softGray px-6">
      <div className="w-full md:w-[30%] rounded-lg p-4 bg-white">
        {children}
      </div>
    </div>
  );
}
