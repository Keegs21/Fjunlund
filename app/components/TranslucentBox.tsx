import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

interface TranslucentBoxProps extends BoxProps {
  children: React.ReactNode;
}

const TranslucentBox: React.FC<TranslucentBoxProps> = ({ children, ...props }) => {
  return (
    <Box
      bg="rgba(58, 58, 58, 0.8)"
      padding="4"                  
      borderRadius="md"             
      boxShadow="lg"
      width={'fit-content'}
      {...props}
    >
      {children}
    </Box>
  );
};

export default TranslucentBox;
