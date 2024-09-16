export interface IDateTimeField {
  value: string;
  handleChangeText: (text: string) => void;
  checkAdult?: boolean;
  title?: string;
  placeholder?: string;
  otherStyles?: string;
  error?: string;
}
