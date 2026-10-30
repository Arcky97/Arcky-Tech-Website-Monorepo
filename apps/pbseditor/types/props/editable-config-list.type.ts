import { DefinitionOptionKey } from "../definitions-options.type";

export type StringListProps = {
  label: DefinitionOptionKey;
  data: string[];
  fixedData: string[];
  setData: (data: string[]) => void;
  placeholder: string;
  doubleInput?: false;
};

export type PairListProps = {
  label: DefinitionOptionKey;
  data: [string, string?][];
  fixedData: [string, string?][];
  setData: (data: [string, string?][]) => void;
  placeholder: [string, string];
  doubleInput: true;
};

export type EditableConfigListProps = StringListProps | PairListProps;