interface IProps {
  label: string;
  isChecked: boolean;
  onChange: () => void;
}

export const Checkbox: React.FC<IProps> = ({ label, isChecked, onChange }) => {
  const id = String(Math.random());

  return (
    <div>
      <input id={id} type="checkbox" checked={isChecked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
