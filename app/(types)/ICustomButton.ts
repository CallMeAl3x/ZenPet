export interface ICustomButton {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
  image?: string;
  style?: any;
}
