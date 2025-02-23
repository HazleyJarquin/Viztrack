import {
  ChartNoAxesColumn,
  DollarSignIcon,
  HelpCircleIcon,
  MessageCircleMoreIcon,
  SettingsIcon,
  SquareChartGanttIcon,
  UserIcon,
  WalletMinimalIcon,
} from "lucide-react";

export const useSideBar = () => {
  const sideBarLinks = [
    {
      id: 1,
      name: "Menu",
      children: [
        {
          id: 1,
          name: "Dashboard",
          path: "/dashboard",
          icon: <ChartNoAxesColumn />,
        },
        {
          id: 2,
          name: "Ingresar Gasto o Ingreso",
          path: "/dashboard/add-expense",
          icon: <DollarSignIcon />,
        },
        {
          id: 3,
          name: "Manage Menu",
          path: "/dashboard/manage-menu",
          icon: <SquareChartGanttIcon />,
        },
        {
          id: 4,
          name: "Customer Review",
          path: "/dashboard/customer-review",
          icon: <MessageCircleMoreIcon />,
        },
      ],
    },

    {
      id: 2,
      name: "Others",
      children: [
        {
          id: 1,
          name: "Settings",
          path: "/dashboard/settings",
          icon: <SettingsIcon />,
        },
        {
          id: 2,
          name: "Payment",
          path: "/dashboard/payment",
          icon: <WalletMinimalIcon />,
        },
        {
          id: 3,
          name: "Accounts",
          path: "/dashboard/accounts",
          icon: <UserIcon />,
        },
        {
          id: 4,
          name: "Help",
          path: "/dashboard/help",
          icon: <HelpCircleIcon />,
        },
      ],
    },
  ];

  return {
    sideBarLinks,
  };
};
