import React from 'react';
import { useIntl } from 'react-intl';
import { Box, Stack, TextInput } from '@strapi/design-system';
const UrlImage = ({
  description,
  disabled,
  error,
  intlLabel,
  name,
  onChange,
  placeholder,
  required,
  value
}) => {
  const { formatMessage } = useIntl();
return (
    <Stack spacing={1}>
      <TextInput 
        disabled={disabled}
        error={error}
        hint={description ? formatMessage(description) : ''}
        label={intlLabel ? formatMessage(intlLabel) : ''}
        name={name}
        onChange={(event) => {onChange({target: {name, value: event.target.value, type: 'string' }})}}
        placeholder={placeholder ? formatMessage(placeholder) : ''}
        required={required}
        value={value || ''}
        />
      <Box padding={1}>
        {value && 
          <img src={`${value}`} style={{maxWidth: '100%'}} />
        }
      </Box>
    </Stack>
  );
};
export default UrlImage;