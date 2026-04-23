import { HomeIcon } from "@heroicons/react/24/outline";

export const vendingMachine = {
  name: "vending-machine",
  path: "",
  icon: <HomeIcon className="w-6 h-6"/>,
  text: "Arcky's Vending Machine",
  subItems: [
    {
      path: "features",
      text: "Feature Overview"
    },
    {
      path: "update-history",
      text: "Update History"
    },
    {
      path: "installation",
      text: "Installation"
    },
    {
      path: "setup",
      text: "Event Setup"
    },
    {
      path: "settings",
      text: "Settings",
      subItems: [
        {
          path: "badges-items",
          text: "Badge Items"
        },
        {
          path: "discounts",
          text: "Discounts"
        },
        {
          path: "text-colors",
          text: "Text Color"
        },
        {
          path: "speeches",
          text: "Speeches",
          subItems: [
            {
              path: "intro-text-vm",
              text: "IntroText"
            },
            {
              path: "choice-kick-text",
              text: "ChoiceKickText"
            },
            {
              path: "discount-text",
              text: "DiscountText"
            },
            {
              path: "item-amount-select",
              text: "ItemAmountSelect"
            },
            {
              path: "item-bonus-drop-text",
              text: "ItemBonusDropText"
            },
            {
              path: "item-drop-text",
              text: "ItemDropText"
            },
            {
              path: "item-select-text",
              text: "ItemSelectText"
            },
            {
              path: "item-stuck-text",
              text: "ItemStuckText"
            },
            {
              path: "kick-bonus-text",
              text: "KickBonusText"
            },
            {
              path: "kick-no-success-text",
              text: "KickNoSuccessText"
            },
            {
              path: "kick-success-text",
              text: "KickSuccessText"
            },
            {
              path: "no-kick-text",
              text: "NoKickText"
            },
            {
              path: "no-room-in-bag",
              text: "NoRoomInBag"
            },
            {
              path: "not-enough-money",
              text: "NotEnoughMoney"
            },
            {
              path: "overcharge-text",
              text: "OverchargeText"
            }
          ]
        }
      ]
    }
  ]
}