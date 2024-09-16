export interface ITextField {
  value: string;
  handleChangeText: (text: string) => void;
  title?: string;
  placeholder?: string;
  otherStyles?: string;
  error?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}
