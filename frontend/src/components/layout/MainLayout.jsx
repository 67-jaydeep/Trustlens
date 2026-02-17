import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

function MainLayout({ children }) {
  return (
    <div className="h-screen flex bg-neutral-50 overflow-hidden">

      <Sidebar />

      {/* SCROLL CONTAINER */}
      <main className="
        flex-1
        overflow-y-auto
        no-scrollbar
        relative
      ">
        {/* INTERNAL WRAPPER WITH SAFE BOTTOM SPACE */}
        <div className="min-h-full pb-[120px] md:pb-8">
          {children}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

export default MainLayout;
