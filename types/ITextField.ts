export interface ITextField {
  value: string;
  handleChangeText: (text: string) => void;
  title?: string;
  placeholder?: string;
  otherStyles?: string;
  error?: string;
}
