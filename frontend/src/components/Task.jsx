
// eslint-disable-next-line react/prop-types
function Task({ title, description, status }) {
    const bgColors = {
        "todo": "#4BB1BE",
        "doing":  "#B09398",
        "completed": "#A7C18F"
    }
  return (
    <div className="container h-1/5 mt-2">
      <div className="px-2 pb-2 pt-0.5 bg-white shadow-md h-full rounded-md">
        <div className="container h-2/6 overflow-clip">
          <div className="flex w-full h-full items-start">
            <div className="container h-full w-1/6">
              <div className="flex h-full items-center justify-start">
                <a className="flex me-1 w-full rounded-md items-center justify-center text-black text-lg font-bold" style={{backgroundColor: bgColors[status]}}>
                  {status}
                </a>
              </div>
            </div>
            <div className="container h-full w-5/6 text-lg font-bold overflow-hidden">
              <div className="flex h-full w-full items-center justify-start">
                <p className="text-slate-800 ms-1">
                  {title}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container h-4/6 overflow-hidden border-t-2 border-slate-300">
          <div className="flex w-full h-full items-center text-slate-600 font-semibold justify-start">
            <p className="w-full h-full">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;