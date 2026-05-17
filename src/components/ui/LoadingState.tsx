export default function LoadingState({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex justify-center items-center w-full mt-12 h-64 border border-image-frame rounded-card">
      <span className="font-mono text-secondary uppercase tracking-[1.5px]">{message}</span>
    </div>
  );
}
