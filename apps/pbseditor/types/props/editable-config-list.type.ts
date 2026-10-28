export type StringListProps = {
  label: string;
  data: string[];
  fixedData: string[];
  setData: (data: string[]) => void;
  placeholder: string;
  doubleInput?: false;
};

export type PairListProps = {
  label: string;
  data: [string, string?][];
  fixedData: [string, string?][];
  setData: (data: [string, string?][]) => void;
  placeholder: [string, string];
  doubleInput: true;
};

export type EditableConfigListProps = StringListProps | PairListProps;