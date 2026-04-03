import { Navigate, createBrowserRouter } from "react-router-dom";
import { AdsListPage } from "./pages/ads-list-page";
import { AdViewPage } from "./pages/ad-view-page";
import { AdEditPage } from "./pages/ad-edit-page";
import { AppLayout } from "./app-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/ads" replace />,
      },
      {
        path: "ads",
        element: <AdsListPage />,
      },
      {
        path: "ads/:id",
        element: <AdViewPage />,
      },
      {
        path: "ads/:id/edit",
        element: <AdEditPage />,
      },
    ],
  },
]);
