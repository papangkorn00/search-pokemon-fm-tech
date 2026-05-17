export default function ErrorState({ message = "Error Loading Data" }: { message?: string }) {
  return (
    <div className="flex justify-center items-center w-full mt-12 h-64 border border-purple rounded-card">
      <span className="font-mono text-purple uppercase tracking-[1.5px]">{message}</span>
    </div>
  );
}
