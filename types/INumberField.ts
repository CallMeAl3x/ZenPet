export interface INumberField {
  title?: string;
  placeholder: string;
  value: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  error?: string;
}
