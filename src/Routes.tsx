import { Routes as RouterRoutes, Route } from "react-router-dom";
import AITools from "@/pages/AITools";
import Home from "@/pages/Home";
import Learn from "@/pages/Learn";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/ai-tools" element={<AITools />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;