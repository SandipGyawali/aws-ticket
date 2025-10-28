import React from "react";

export const withSubject = (p: any, subject: string) => {
  return React.cloneElement(p, { ...p.props, subject });
};
