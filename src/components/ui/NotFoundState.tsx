export default function NotFoundState({ title = "NO RESULT FOUND", message }: { title?: string; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-12 p-16 border border-purple rounded-card bg-slate shadow-2xl">
      <h2 className="text-[40px] sm:text-[60px] font-black font-display text-hazard-white uppercase tracking-wider mb-4 leading-none text-center">
        {title}
      </h2>
      <p className="font-mono text-secondary uppercase tracking-[1.5px] text-center bg-absolute-black px-4 py-2 border border-purple">
        {message}
      </p>
    </div>
  );
}
