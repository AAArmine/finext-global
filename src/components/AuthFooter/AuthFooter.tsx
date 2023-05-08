import React from 'react';
import { Typography } from 'antd';

const AuthFooter = () => {
  const { Text } = Typography;
  return (
    <>
      <Text className="px-6 pt-1 text-secondary text-xs font-bold mt-12 block">
        {`Don't hesitate to contact us for any further assistance`}
      </Text>
      <Text
        className="text-green text-xs font-bold cursor-pointer"
        onClick={() => (window.location.href = 'mailto:support@finext.com')}
      >
        support@finext.com
      </Text>
    </>
  );
};

export default AuthFooter;
