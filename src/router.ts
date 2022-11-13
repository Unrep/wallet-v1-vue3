import { createRouter, createWebHistory } from "vue-router";
import Index from "@/views/Index.vue";
import AccountIndex from "@/views/account/Index.vue";
import AccountTransfer from "@/views/account/Transfer.vue";
import { PaperAirplaneIcon, UserIcon } from "@heroicons/vue/outline";
import useWallet from "./store/wallet";

const defaultRoutes = [
  {
    path: "/",
    name: "home",
    component: Index,
    meta: {
      title: "zkSync Wallet",
      description: "zkSync v1 Wallet",
    },
  },
];

export const accountRoutes = [
  {
    path: "/account",
    name: "account",
    component: AccountIndex,
    meta: {
      label: "Account",
      title: "Account - zkSync v1 Wallet",
      description: "Overview of your zkSync account",
      icon: UserIcon,
      requireLogin: true,
    },
  },
  {
    path: "/account/transfer",
    name: "account-transfer",
    component: AccountTransfer,
    meta: {
      label: "Transfer",
      title: "Transfer - zkSync v1 Wallet",
      description: "Transfer funds inside zkSync network",
      icon: PaperAirplaneIcon,
      requireLogin: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...defaultRoutes, ...accountRoutes],
});

function replaceMeta(type: "name" | "property", key: string, value: unknown, fallbackValue: string) {
  document.querySelector(`meta[${type}="${key}"]`)?.setAttribute("content", (value ?? fallbackValue) as string);
}

router.beforeEach((to, from, next) => {
  const { address } = useWallet();

  console.log("to", to);

  if (!address && to.meta.requireLogin === true) {
    next({ name: "home" });
    return;
  }

  document.title = `${to.meta.title} | zkSync Wallet`;
  replaceMeta("name", "description", to.meta.description, defaultRoutes[0].meta.description);
  replaceMeta("property", "og:url", to.path, to.path);
  replaceMeta("property", "og:title", to.meta.title, defaultRoutes[0].meta.title);
  replaceMeta("property", "og:image:alt", to.meta.title, defaultRoutes[0].meta.title);
  replaceMeta("property", "og:description", to.meta.description, defaultRoutes[0].meta.description);
  replaceMeta("name", "twitter:image:alt", to.meta.title, defaultRoutes[0].meta.title);
  replaceMeta("name", "twitter:title", to.meta.title, defaultRoutes[0].meta.title);
  replaceMeta("name", "twitter:description", to.meta.description, defaultRoutes[0].meta.description);

  next();
});

export default router;
