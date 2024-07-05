import Timer from "./Timer";

const Navbar = () => {
  return <div className="top-0 sticky h-14 bg-white shadow-lg flex items-center justify-between px-5">
    <h2 className="text-xl">Question</h2>
    <Timer/>
  </div>;
};

export default Navbar;
