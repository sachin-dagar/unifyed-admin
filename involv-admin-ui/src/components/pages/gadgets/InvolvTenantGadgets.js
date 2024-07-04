import { PlusIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

import InvolvTenantBreadcrumbs from "../../route/InvolvTenantBreadcrumbs";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import InvolvButton from "../../shared/InvolvButton";
import LayoutTransition from "../../shared/LayoutTransition";

const gadgets = [
  {
    number: "WU88191111",
    href: "#",
    invoiceHref: "#",
    createdDate: "Jul 6, 2021",
    createdDatetime: "2021-07-06",
    deliveredDate: "July 12, 2021",
    deliveredDatetime: "2021-07-12",
    total: "$160.00",
    products: [
      {
        id: 1,
        name: "Micro Backpack",
        description:
          "Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.",
        href: "#",
        price: "$70.00",
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg",
        imageAlt:
          "Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
      },
      // More products...
    ],
  },
  // More orders...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function InvolvTenantGadgets() {
  const [showmarketplace, setshowmarketplace] = useState(false);

  return (
    <LayoutTransition>
      <div className="flex justify-between">
        <div>
          <div className="font-medium text-grayInvolv-900 text-base 2xl:text-lg">
            Gadgets
          </div>
          <InvolvTenantBreadcrumbs />
        </div>
        <NavLink to="/gadget">
          <InvolvButton classes="items-center flex py-2 justify-end text-xs 2xl:text-sm">
            <PlusIcon className="h-4 w-4 mr-1" /> Add Gadget
          </InvolvButton>
        </NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </LayoutTransition>
  );
}

export default InvolvTenantGadgets;
