import "../styling/index.css";
import Header from "../components/Header";
import SidebarV2 from "../components/SidebarV2";
import HomePageContent from "../components/HomePageContent";
export function HomePage() {
  return (
    <>
      <div className="container">
        <Header />
        <SidebarV2 />
        <HomePageContent />
      </div>
    </>
  );
}
