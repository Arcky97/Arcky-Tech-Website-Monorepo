import { HomeIcon } from "@heroicons/react/24/outline";

export const pokeMarket = {
  name: "poke-market",
  path: "",
  icon: <HomeIcon className="w-6 h-6"/>,
  text: "Arcky's Poké Market",
  subItems: [
    {
      path: "features",
      text: "Features Overview"
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
      text: "Event Setup",
      noPage: true,
      subItems: [
        {
          path: "mart-event",
          text: "Mart Event Setup"
        },
        {
          path: "shelf-event",
          text: "Shelf Event Setup"
        },
        {
          path: "species-event",
          text: "Species Event Setup"
        },
        {
          path: "pbs-prizes",
          text: "BP and Coin Prizes"
        }
      ]
    },
    {
      path: "settings",
      text: "Settings",
      subItems: [
        {
          path: "item-categories",
          text: "Item Categories",
          subItems: [
            {
              path: "default",
              text: "Default Item Categories"
            },
            {
              path: "custom",
              text: "Custom Item Categories"
            }
          ]
        },
        {
          path: "badges-items",
          text: "Badges for Items"
        },
        {
          path: "discounts",
          text: "Discounts"
        },
        {
          path: "bonus-items",
          text: "Bonus Items"
        },
        {
          path: "item-limits",
          text: "Item Limits"
        },
        {
          path: "bw-pokemart-screen",
          text: "BW Poké Market Screen"
        },
        {
          path: "item-purchase-counter",
          text: "Item Purchase Counter"
        },  
        {
          path: "stock-items",
          text: "Stock Items",
          noPage: true,
          subItems: [
            {
              path: "items",
              text: "Items"
            },
            {
              path: "species",
              text: "Species"
            }
          ]
        },
        {
          path: "speeches",
          text: "Speeches",
          noPage: true,
          subItems: [
            {
              path: "seller-classes",
              text: "Seller Classes",
              subItems: [
                {
                  path: "intro-text",
                  text: "IntroText",
                },
                {
                  path: "menu-text",
                  text: "MenuText",
                },
                {
                  path: "category-text",
                  text: "CategoryText"
                },
                {
                  path: "buy-item-amount",
                  text: "BuyItemAmount"
                },
                {
                  path: "buy-item",
                  text: "BuyItem"
                },
                {
                  path: "buy-out-of-stock",
                  text: "BuyOutOfStock"
                },
                {
                  path: "buy-thanks",
                  text: "BuyThanks"
                },
                {
                  path: "buy-bonus-mult",
                  text: "BuyBonusMult"
                },
                {
                  path: "not-enough-money",
                  text: "NotEnoughMoney"
                },
                {
                  path: "no-room-in-bag",
                  text: "NoRoomInBag"
                },
                {
                  path: "sell-item-amount",
                  text: "SellItemAmount"
                },
                {
                  path: "sell-item",
                  text: "SellItem"
                },
                {
                  path: "cant-sell-item",
                  text: "CantSellItem"
                },
                {
                  path: "menu-return-text",
                  text: "MenuReturnText"
                },
                {
                  path: "bill-check-out",
                  text: "BillCheckOut"
                },
                {
                  path: "purchase-count",
                  text: "PurchaseCount"
                },
                {
                  path: "everything-out-of-stock",
                  text: "EverythingOutOfStock"
                },
                {
                  path: "outro-text",
                  text: "OutroText",
                }
              ]
            },
            {
              path: "shelf-classes",
              text: "Shelf Classes",
              subItems: [
                {
                  path: "intro-shelf",
                  text: "IntroShelf"
                },
                {
                  path: "shelf-item-amount",
                  text: "ShelfItemAmount"
                },
                {
                  path: "shelf-item-amount-change",
                  text: "ShelfItemAmountChange"
                },
                {
                  path: "shelf-out-of-stock",
                  text: "ShelfOutOfStock"
                },
                {
                  path: "not-enough-money",
                  text: "NotEnoughMoney"
                },
                {
                  path: "not-enough-money-item",
                  text: "NotEnoughMoneyItem" 
                },
                {
                  path: "not-enough-money-amount",
                  text: "NotEnoughMoneyAmount"
                }
              ]
            },
            {
              path: "species-classes",
              text: "Species Classes",
              subItems: [
                {
                  path: "intro-species",
                  text: "IntroSpecies"
                },
                {
                  path: "species-out-of-stock",
                  text: "SpeciesOutOfStock"
                },
                {
                  path: "buy-species",
                  text: "BuySpecies"
                },
                {
                  path: "not-enough-money",
                  text: "NotEnoughMoney"
                },
                {
                  path: "no-room-in-storage",
                  text: "NoRoomInStorage"
                },
                {
                  path: "species-thanks",
                  text: "SpeciesThanks"
                },
                {
                  path: "everything-out-of-stock",
                  text: "EverythingOutOfStock"
                },
                {
                  path: "outro-species",
                  text: "OutroSpecies"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}