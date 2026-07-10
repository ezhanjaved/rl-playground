import GraphAIChat from "../components/GraphAIChat";
import Header from "../components/Header";
import SidebarV2 from "../components/SidebarV2";

export function GraphAIChatPage() {
  return (
    <div className="container">
      <Header />
      <SidebarV2 />
      <GraphAIChat />
    </div>
  );
}
