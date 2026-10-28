import { EditableConfigListProps } from "./props/editable-config-list.type";

export type DefinitionType =
  EditableConfigListProps & {
    filters: string[];
};