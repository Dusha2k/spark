import { Textarea, TextareaProps } from '@chakra-ui/react';
import ResizeTextarea from 'react-textarea-autosize';
import { forwardRef } from 'react';

export const AutoResizeTextarea = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(function AutoResizeTextarea(props, ref) {
  return (
    <Textarea
      minH="unset"
      overflow="hidden"
      w="100%"
      resize="none"
      transition="height none"
      ref={ref}
      minRows={1}
      as={ResizeTextarea}
      {...props}
    />
  );
});
