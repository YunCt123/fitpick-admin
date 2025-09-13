import React from 'react';
import { Form, Input, Select, InputNumber } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import type { Rule } from 'antd/lib/form';

interface FormFieldProps {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'select' | 'number' | 'textarea';
  placeholder?: string;
  required?: boolean;
  rules?: Rule[];
  options?: Array<{ value: any; label: string }>;
  min?: number;
  max?: number;
  allowClear?: boolean;
  size?: 'small' | 'middle' | 'large';
  style?: React.CSSProperties;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  rules = [],
  options = [],
  min,
  max,
  allowClear = false,
  size = 'large',
  style = {}
}) => {
  const requiredRule = required ? [{ required: true, message: `Please enter ${label.toLowerCase()}!` }] : [];
  const allRules = [...requiredRule, ...rules];

  const labelComponent = (
    <span style={{ color: '#000' }}>
      {label} {required && <span style={{ color: 'red' }}>*</span>}
    </span>
  );

  const renderInput = () => {
    switch (type) {
      case 'password':
        return (
          <Input.Password
            placeholder={placeholder}
            size={size}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            style={style}
          />
        );
      
      case 'email':
        return (
          <Input
            type="email"
            placeholder={placeholder}
            size={size}
            style={style}
          />
        );
      
      case 'select':
        return (
          <Select
            placeholder={placeholder}
            size={size}
            options={options}
            allowClear={allowClear}
            style={style}
          />
        );
      
      case 'number':
        return (
          <InputNumber
            placeholder={placeholder}
            size={size}
            style={{ width: '100%', ...style }}
            min={min}
            max={max}
          />
        );
      
      case 'textarea':
        return (
          <Input.TextArea
            placeholder={placeholder}
            rows={4}
            style={style}
          />
        );
      
      default:
        return (
          <Input
            placeholder={placeholder}
            size={size}
            style={style}
          />
        );
    }
  };

  return (
    <Form.Item
      label={labelComponent}
      name={name}
      rules={allRules}
    >
      {renderInput()}
    </Form.Item>
  );
};

export default FormField;