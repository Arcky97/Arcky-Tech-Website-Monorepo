import { Callout } from "./Callout"
import { InlineCode } from "ui/src/components/InlineCode"
import { TextColor } from "ui"

export function DocsPokeMarketSpeeches ({speech}: {speech: string}) {
  return (
    <>
      <br/>
      <p className="text-white text-base font-normal text-left">Just like with <InlineCode>IntroText</InlineCode>, you can define multiple entries, and the script will randomly choose one each time.</p>
      <Callout type="attention">
        Unlike <InlineCode>IntroText</InlineCode>, <InlineCode>{speech}</InlineCode> <strong><TextColor color="red-600">does not support</TextColor></strong> Time and Day variations — this is intentionally kept simpler.
      </Callout>
    </>
  )
}

export function DocsVendingSpeeches ({speech}: { speech: string }) {
  return (
    <>
      <br/>
      <p className="text-white text-base font-normal text-left">Just like <InlineCode>IntroText</InlineCode> and any other <strong className="text-blue-300">Vending Class Speeches</strong>, <InlineCode>{speech}</InlineCode> allows you to define multiple entries, and the script will randomly choose one each time.</p>
      <br/>
    </>
  )
}

export function DocsShelfSpeeches ({speech}: {speech: string}) {
  return (
    <>
      <br/>
      <p className="text-white text-base font-normal text-left">Just like <InlineCode>IntroText</InlineCode> and any other <strong className="text-blue-300">Seller Class Speeches</strong>, <InlineCode>{speech}</InlineCode> allows you to define multiple entries, and the script will randomly choose one each time.</p>
      <br/>
    </>
  )
}


export function DocsSpeciesSpeeches ({speech}: {speech: string}) {
  return (
    <>
      <br/>
      <p className="text-white text-base font-normal text-left">Just like <InlineCode>IntroText</InlineCode> and any other <strong className="text-blue-300">Seller and Shelf Class Speeches</strong>, <InlineCode>{speech}</InlineCode> allows you to define mutliple entries, and the script will randomly choose one each time.</p>
      <br/>
    </>
  )
}