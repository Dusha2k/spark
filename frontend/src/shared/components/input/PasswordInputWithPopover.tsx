import { useState } from 'react';
import {
  PasswordInput,
  Progress,
  Text,
  Popover,
  Box,
  PasswordInputProps,
} from '@mantine/core';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      color={meets ? 'teal' : 'red'}
      sx={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      {meets ? (
        <AiOutlineCheck size="0.9rem" />
      ) : (
        <AiOutlineClose size="0.9rem" />
      )}{' '}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Пароль должен содержать цифру' },
  { re: /[a-z]/, label: 'Пароль должен содержать букву нижнего регистра' },
  { re: /[A-Z]/, label: 'Пароль должен содержать букву верхнего регистра' },
  {
    re: /[$&+,:;=?@#|'<>.^*()%!-]/,
    label: 'Пароль должен содержать спец символ($%+- и т.п)',
  },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

interface Props extends Omit<PasswordInputProps, 'value'> {
  value: string;
}

export const PasswordInputWithPopover = (props: Props) => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(props?.value)}
    />
  ));

  const strength = getStrength(props?.value);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  return (
    <Popover
      opened={popoverOpened}
      position="bottom"
      width="target"
      transitionProps={{ transition: 'pop' }}
    >
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          <PasswordInput {...props} />
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Progress color={color} value={strength} size={5} mb="xs" />
        <PasswordRequirement
          label="Пароль должен содержать минимум 6 символов"
          meets={props?.value?.length > 5}
        />
        {checks}
      </Popover.Dropdown>
    </Popover>
  );
};
