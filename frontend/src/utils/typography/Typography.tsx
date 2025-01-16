import { typographyStyles } from './styles';

export type ITypographyTypes = 'h1' | 'h2' | 'p1' | 'p2' | 'p3';

interface ITypography {
  classname?: string;
  type: ITypographyTypes;
  color?: string;
  children?: React.ReactNode;
}

export const Typography = ({ classname, type, color, children }: ITypography) => {
  const typeClass = typographyStyles[type];
  return <div className={`${typeClass} ${classname || ''} ${color ? color : ''}`}>{children}</div>;
};
