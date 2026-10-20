"use client";
import { usePBSConfig } from "@/providers/PBSConfigProvider";
import { t } from "i18next";
import { useT } from "next-i18next/client";
import { ColorButton, LabelAndTooltip } from "ui";
import InputSingleSelect from "ui/src/components/InputSingleSelect";

export default function Abilites() {
  const { openConfigModal } = usePBSConfig();
  const { t: tAbilities } = useT('abilities');
  const { t: tCommon } = useT('common');
  const { t: tButtons } = useT('buttons');

/*
  const handleChange = (value: any) => {

  }
*/
  return (
    <div className="px-3">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h1 className="head1">{tCommon('header', { name: tAbilities('header.plural')})}</h1>
        </div>
        <div className="space-x-4">
          <ColorButton
            text={tButtons('wiki')}
            color="green-700"
            extraClass="min-w-22"
          />
          <ColorButton
            text={tButtons('settings')}
            color="green-700"
            extraClass="min-w-22"
            action={openConfigModal}
          />
        </div>

      </div>
      <div>
        <LabelAndTooltip
          label={[tCommon('file.label', { name: tAbilities('header.name')})]}
          infoData={[tCommon('file.info', { plural: tAbilities('header.plural')})]}
        />
        <InputSingleSelect
          width="w-64"
          initValue={"abilities.txt"}
          handleChange={() => ""}
          options={[{ value: "abilities.txt", label: "abilities.txt"}]}
          placeholder={tCommon('file.placeholder')}
          isDisabled={false}
        />
      </div>
    </div>
  )
}