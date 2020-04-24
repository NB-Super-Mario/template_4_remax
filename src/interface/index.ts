export interface TodoProps {
  type: string;
  id: number;
  text: string;
  [otherProps: string]: any;
}
