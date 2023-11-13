function Loading() {
  return (
    <div className="h-screen bg-slate-300">
      <div className="flex h-4/6 items-start justify-center">
        <div className="h-full w-3/4 md:w-1/2 lg:w-1/3 rounded-lg bg-slate-50 shadow-md mt-32">
            <div className="flex h-full items-center justify-center">
                <div className="text-2xl">Loading........</div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
